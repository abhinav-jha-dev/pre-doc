import {createHash,timingSafeEqual} from 'node:crypto';
import {z} from 'zod';
import {groundedFacts,intakePrompt,extractionFormat,nextQuestion} from '../../app/atlas/intake';
const requestSchema=z.object({messages:z.array(z.object({role:z.enum(['user','assistant']),content:z.string().min(1).max(4000)}).strict()).min(1).max(60)}).strict();
type Event={headers?:Record<string,string|undefined>;body?:string;isBase64Encoded?:boolean;requestContext?:{http?:{method?:string}}};
const hash=(value:string)=>createHash('sha256').update(value).digest();
let calls=0,windowStart=Date.now();
export async function handler(event:Event){
 const headers=Object.fromEntries(Object.entries(event.headers||{}).map(([k,v])=>[k.toLowerCase(),v]));
 const origin=headers.origin||'';const allowed=(process.env.ALLOWED_ORIGINS||'https://abhinav-jha-dev.github.io,http://localhost:5173').split(',').map(x=>x.trim());
 const cors=allowed.includes(origin)?{'Access-Control-Allow-Origin':origin,'Access-Control-Allow-Headers':'authorization,content-type','Access-Control-Allow-Methods':'POST,OPTIONS','Vary':'Origin'}:{};
 const reply=(statusCode:number,data:unknown)=>({statusCode,headers:{...cors,'Content-Type':'application/json','Cache-Control':'no-store'},body:JSON.stringify(data)});
 if(!allowed.includes(origin))return reply(403,{error:'This origin is not allowed.'});
 if(event.requestContext?.http?.method==='OPTIONS')return reply(200,{});
 if(event.requestContext?.http?.method!=='POST')return reply(405,{error:'Use POST.'});
 const token=process.env.PREDOC_ACCESS_TOKEN,key=process.env.GROQ_API_KEY;
 if(!token||token.length<32||!key)return reply(503,{error:'The hosted assistant has not been configured.'});
 if(!timingSafeEqual(hash(headers.authorization||''),hash('Bearer '+token)))return reply(401,{error:'Enter a valid PreDoc access code.'});
 if(Date.now()-windowStart>60000){windowStart=Date.now();calls=0;}
 if(calls>=20)return reply(429,{error:'Too many requests. Please wait a minute.'});
 const body=event.isBase64Encoded?Buffer.from(event.body||'','base64').toString('utf8'):event.body||'';
 if(Buffer.byteLength(body)>40000)return reply(413,{error:'This conversation is too long.'});
 let messages;try{messages=requestSchema.parse(JSON.parse(body)).messages;}catch{return reply(400,{error:'Invalid conversation.'});}
 calls++;
 try{
 const response=await fetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',headers:{Authorization:'Bearer '+key,'Content-Type':'application/json'},signal:AbortSignal.timeout(25000),body:JSON.stringify({model:process.env.GROQ_MODEL||'openai/gpt-oss-20b',temperature:0,max_completion_tokens:2400,stream:false,response_format:{type:'json_schema',json_schema:{name:'patient_reported_symptoms',strict:true,schema:extractionFormat}},messages:[{role:'system',content:intakePrompt},...messages]})});
 if(response.status===429)return reply(429,{error:'The AI free-tier limit was reached. Try again later.'});
 if(!response.ok)return reply(502,{error:'The AI provider could not complete this request.'});
 const data=z.object({choices:z.array(z.object({message:z.object({content:z.string()})})).min(1)}).parse(await response.json());const facts=groundedFacts(JSON.parse(data.choices[0].message.content),messages);
 return reply(200,{facts,reply:nextQuestion(facts,messages)});
 }catch{return reply(502,{error:'The assistant timed out or returned an invalid response. Your notes are unchanged.'});}
}
