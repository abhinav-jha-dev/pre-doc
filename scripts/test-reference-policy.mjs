import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
function evaluate(file,dependencies={}){const source=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;const exports={};vm.runInNewContext(source,{exports,require:name=>dependencies[name],fetch:async url=>({ok:true,json:async()=>JSON.parse(fs.readFileSync('public'+url,'utf8'))})});return exports;}
const data=evaluate('app/atlas/data.ts');const model=evaluate('app/atlas/model.ts',{'./data':data});
const female=await model.loadAtlas('female'),male=await model.loadAtlas('male');
assert.equal(female.parts.length,1212);
const native=model.referenceParts(female.parts,false);
assert.equal(native.length,956);
assert.equal(female.parts.filter(p=>p.system==='borrowed').length,180);
assert.equal(female.parts.filter(p=>p.system==='donor-muscle').length,76);
assert.equal(model.referenceParts(female.parts,true).length,1212);
assert.equal(new Set(female.parts.map(p=>p.id)).size,1212);
assert.ok(native.every(p=>!model.isAdapted(p)));
// Reuse never replaces native pelvic or reproductive structures.
for(const p of native.filter(p=>p.system==='reproductive'||/ilium|ischium|pubis|sacrum/i.test(p.name))){assert.ok(female.parts.includes(p));assert.equal(model.isAdapted(p),false);}
for(const p of female.parts.filter(model.isAdapted)){assert.match(model.provenance(p),/Adapted reference/);assert.match(model.describeMesh(p,'female').description,/not been clinically validated/);assert.ok(p.bounds.flat().every(Number.isFinite));}
assert.equal(male.parts.length,2234);
assert.ok(female.parts.every(p=>p.system!=='pregnancy'));
assert.ok(female.parts.some(p=>p.name==='Skin'));
assert.ok(female.parts.some(p=>model.category(p)==='uterus'));
assert.ok(female.parts.some(p=>model.category(p)==='ovaries'));
assert.equal(model.surfaceOpacity('Skin',['integumentary'],100),1);
assert.equal(model.surfaceOpacity('Skin',['integumentary','digestive'],100),.5);
assert.equal(model.surfaceOpacity('Mammary lobes (left)',['integumentary'],100),1);
assert.equal(model.surfaceOpacity('Skin',['integumentary'],50),.5);
for(const atlas of [female,male]){const counts=Object.fromEntries(data.systems.map(([id])=>[id,atlas.parts.filter(p=>model.meshSystem(p)===id).length]));assert.equal(Object.values(counts).reduce((sum,n)=>sum+n,0),atlas.parts.length);console.log(atlas===female?'Female modeled elements:':'Male modeled elements:',counts);}
console.log('Reference filtering, reproductive coverage, surface rendering and category totals passed.');
