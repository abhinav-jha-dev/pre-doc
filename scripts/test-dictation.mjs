import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const mod={exports:{}},timers=[];
vm.runInNewContext(ts.transpileModule(fs.readFileSync('app/atlas/dictation.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{exports:mod.exports,module:mod,setTimeout:f=>{timers.push(f);return f;},clearTimeout:f=>{const i=timers.indexOf(f);if(i>=0)timers.splice(i,1);}});
const instances=[];class Fake {constructor(){instances.push(this);}start(){}stop(){this.onend?.();}abort(){this.aborted=true;this.onend?.();}}
const final=[],interim=[],errors=[];const callbacks={onFinal:t=>final.push(t),onInterim:t=>interim.push(t),onListening:()=>{},onError:t=>errors.push(t)};
const result=(text,isFinal)=>Object.assign([{transcript:text}],{isFinal});
const c=mod.exports.startDictation(Fake,callbacks);const r=instances.at(-1);assert.equal(r.continuous,true);assert.equal(r.interimResults,true);
r.onresult({resultIndex:0,results:[result('My lower',false)]});assert.equal(final.length,0);
r.onresult({resultIndex:0,results:[result('My lower back hurts.',true)]});
r.onresult({resultIndex:1,results:[result('My lower back hurts.',true),result('Since yesterday.',true)]});
r.onresult({resultIndex:0,results:[result('My lower back hurts.',true),result('Since yesterday.',true)]});assert.deepEqual(final,['My lower back hurts.','Since yesterday.']);
r.onend();assert.equal(timers.length,1);timers.shift()();assert.equal(instances.length,2);c.stop();assert.equal(timers.length,0);
const d=mod.exports.startDictation(Fake,callbacks);instances.at(-1).onerror({error:'not-allowed'});instances.at(-1).onend();assert.equal(timers.length,0);assert.match(errors.at(-1),/permission/);d.dispose();
const e=mod.exports.startDictation(Fake,callbacks);instances.at(-1).onend();e.dispose();assert.equal(timers.length,0);
const f=mod.exports.startDictation(Fake,callbacks);for(let i=0;i<3;i++){instances.at(-1).onend();if(timers.length)timers.shift()();}assert.equal(timers.length,0);assert.match(errors.at(-1),/silence/);f.dispose();
console.log('Continuous phrases, interim text, duplicate prevention, pause recovery, manual stop, permission denial and cleanup passed.');
