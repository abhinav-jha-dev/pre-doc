import type {ChatLine,IntakeFacts} from './intake';
export const lumbarClarification='Did you mean the lumbar area of your lower back when you said “number part”?';
export const detailQuestions={
 severity:'How intense is the pain from 0 to 10, where 10 is the worst pain imaginable?',
 onset:'When did the pain start, and is it constant or does it come and go?',
 quality:'How does it feel—for example aching, sharp or burning?',
 side:'Is it on the left, right, in the middle, or on both sides?',
 triggers:'What makes it worse or better, such as movement, sitting or rest?',
 radiation:'Does it stay in that area or spread anywhere else?',
 other:'Are there any other symptoms along with the pain? You can also say “proceed” to review the location.'
};
export function isClarificationAnswer(messages:ChatLine[],text:string){return messages.at(-1)?.role==='assistant'&&messages.at(-1)?.content===lumbarClarification&&/^(yes|yeah|yep|correct|right|that[’']?s right|yes please)[.! ]*$/i.test(text.trim());}
export function needsLumbarClarification(messages:ChatLine[]){const last=messages.at(-1);return last?.role==='user'&&/\bnumber\s+(?:part|area|region)\b/i.test(last.content)&&/lower back|lumbar|back/i.test(messages.filter(m=>m.role==='user').map(m=>m.content).join(' '))&&!/\b(?:not number|meant lumbar|said lumbar)\b/i.test(last.content);}
export function contextualAnswers(messages:ChatLine[]){return messages.flatMap((message,index)=>{
 if(message.role!=='user'||index===0)return [];
 const previous=messages[index-1];if(previous.role!=='assistant')return [];
 const field=Object.entries(detailQuestions).find(([,question])=>question===previous.content)?.[0];return field?[{field,text:message.content}]:[];
});}
export function followUp(facts:IntakeFacts,messages:ChatLine[]=[]){
 if(needsLumbarClarification(messages))return lumbarClarification;
 if(!facts.region.value)return 'Where do you feel it? Choose one area to mark first.';
 const asked=new Set(messages.filter(m=>m.role==='assistant').map(m=>m.content));
 for(const [key,question] of Object.entries(detailQuestions))if(!facts[key as keyof typeof detailQuestions].value&&!asked.has(question))return question;
 return 'We have the details you shared. Shall we confirm the highlighted area and create your summary?';
}
