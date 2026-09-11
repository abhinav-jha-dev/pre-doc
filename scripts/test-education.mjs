import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),cache={};
function load(name){if(cache[name])return cache[name];const file=new URL('../app/atlas/'+name+'.ts',import.meta.url);const source=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;const mod={exports:{}};vm.runInNewContext(source,{exports:mod.exports,module:mod,require:n=>n.startsWith('./')?load(n.slice(2)):require(n),fetch,Uint8Array,btoa,Date,console});return cache[name]=mod.exports;}
const ed=load('education'),model=load('model'),data=load('data');
let obliques=0;
for(const filename of ['atlas.json','atlas-female.json']){
 const catalog=JSON.parse(fs.readFileSync('public/models/'+filename));
 for(const mesh of model.referenceParts(catalog.parts,true)){
 const part=model.describeMesh(mesh,filename.includes('female')?'female':'male');
 const info=ed.education(part,mesh);
 assert(info.careSections.length>0);
 for(const section of info.careSections)assert(section.title&&section.body&&section.source.startsWith('https://'));
 if(/external.*oblique|oblique.*external/i.test(mesh.name)&&part.system==='muscular'&&!/aponeurosis|tendon|fascia/i.test(mesh.name)){
 obliques++;assert(!info.what.includes('not yet'));assert.equal(info.scope,null);
 if(/right/i.test(mesh.name))assert(info.why.includes('torso to the left'));
 if(/left/i.test(mesh.name))assert(info.why.includes('torso to the right'));
 assert(info.careSections.some(s=>s.title.includes('core')));
 }
 }
}
assert(obliques>0);
const liver=ed.education(data.parts.find(p=>p.id==='liver'));
assert.equal(liver.careSections.length,4);
assert(liver.careSections.some(s=>s.title.includes('tonics')));
assert(!liver.careSections.some(s=>s.title.includes('curl')));
console.log('All mesh care sections resolve; bilateral external-oblique explanations and liver-specific care passed.',{obliques});
