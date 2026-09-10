import fs from 'node:fs';
import zlib from 'node:zlib';
let total=0;
for(const file of ['atlas.json','atlas-female.json']){
 const atlas=JSON.parse(fs.readFileSync('public/models/'+file,'utf8'));
 const chunks=atlas.chunks.map(c=>{const b=zlib.gunzipSync(fs.readFileSync('public'+c.gzip));if(b.length!==c.bytes)throw Error('Size mismatch: '+c.gzip);return b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength);});
 const ids=new Set();let triangles=0;
 for(const p of atlas.parts){if(ids.has(p.id))throw Error('Duplicate '+p.id);ids.add(p.id);const b=chunks[p.chunk];const positions=new Float32Array(b,p.positions,p.vertexCount*3),normals=new Int16Array(b,p.normals,p.vertexCount*3),indices=new Uint32Array(b,p.indices,p.indexCount);for(const n of positions)if(!Number.isFinite(n))throw Error('Invalid geometry: '+p.id);for(const i of indices)if(i>=p.vertexCount)throw Error('Invalid index: '+p.id);if(normals.length!==positions.length)throw Error('Normals missing');triangles+=indices.length/3;}
 if(triangles!==atlas.triangles)throw Error('Triangle count mismatch');
 console.log(`${file}: ${ids.size} meshes, ${triangles.toLocaleString()} triangles; all buffers, indices and coordinates valid.`);total+=ids.size;
}
console.log(`Validated ${total} anatomical meshes.`);
