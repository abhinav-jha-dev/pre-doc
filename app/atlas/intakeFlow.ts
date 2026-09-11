import {IntakeSession,fieldNames} from './intake';
export function isProceed(text:string){const t=text.trim().toLowerCase().replace(/[.!?,]/g,' ').replace(/\s+/g,' ').trim();if(/\b(don't|do not|not yet|wait|stop)\b/.test(t))return false;return /^(?:(?:yes|please|okay|ok|i confirm|i confirm that) )*(?:proceed(?: with (?:it|the summary))?|continue|go ahead|that['’]?s (?:all|everything)|nothing (?:else|more)(?: to add)?|i (?:want|would like) (?:you |it )?to proceed|create (?:my |the )?summary|yes|that['’]?s (?:correct|right))$/.test(t);}

export function nextStep(stage:IntakeSession['stage'],region:string|null,confirmed:boolean,text:string){if(!isProceed(text))return 'extract';if(!region)return 'ask-location';if(stage==='describe')return 'confirm';if(stage==='confirm')return 'summary';return 'summary';}
export function reportedFacts(session:IntakeSession){return fieldNames.filter(k=>session.facts[k].value!==null&&!!session.facts[k].evidence);}
