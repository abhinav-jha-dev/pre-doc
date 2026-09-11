'use client';
import {useState} from 'react';
import {PatientDetails,patientFields} from './intake';
import VoiceControls from './VoiceControls';
export const patientIntakeGroups=[
 {title:'About you',intro:'Share your name, date of birth, contact information and an emergency contact.',fields:['name','birthDate','contact','emergencyContacts']},
 {title:'Medical history',intro:'Share current and past diagnoses, long-term conditions and any previous operations.',fields:['conditions','pastDiagnoses','procedures','allergies']},
 {title:'Current medicines',intro:'List your prescribed medicines, including each name, dose and how often you take it. You can leave out anything you do not want to share.',fields:['medications']}
] as const;
const hints:Partial<Record<keyof PatientDetails,string>>={name:'Your full name',birthDate:'For example, 14 March 1985',contact:'Phone number and/or email',emergencyContacts:'Name, relationship and phone number; add more than one if needed',conditions:'Current diagnoses and chronic conditions',pastDiagnoses:'Past diagnoses, with approximate dates if known',procedures:'Operations and approximate dates, if known',allergies:'Known allergies and reactions, if you wish to share',medications:'One medicine per line: name, dose, frequency. Include only details you know.'};
type Props={step:number;patient:PatientDetails;active:boolean;onChange:(patient:PatientDetails)=>void;onNext:()=>void;onBack:()=>void};
export default function PatientIntake({step,patient,active,onChange,onNext,onBack}:Props){
 const group=patientIntakeGroups[step];const [focused,setFocused]=useState<keyof PatientDetails>(group.fields[0]);
 return <section className="patient-onboarding"><span className="eyebrow">BEFORE YOUR SYMPTOMS · {step+1} OF 3</span><h3>{group.title}</h3><p>{group.intro}</p><small>Optional · enter what you know or skip. Saved on this device and included in your downloaded summary.</small>
 <VoiceControls active={active} text={`${group.intro} All fields are optional. Select a field to dictate into it, or choose Skip.`} disabled={false} onSpeechActivity={()=>{}} onDictate={text=>onChange({...patient,[focused]:[patient[focused],text].filter(Boolean).join(' ')})}/>
 <form onSubmit={e=>{e.preventDefault();onNext();}}>{group.fields.map(key=><label key={key} htmlFor={'patient-'+key}>{patientFields[key]}<textarea id={'patient-'+key} value={patient[key]||''} maxLength={2000} rows={key==='medications'||key==='emergencyContacts'?3:2} onFocus={()=>setFocused(key)} onChange={e=>onChange({...patient,[key]:e.target.value})} placeholder={hints[key]}/></label>)}
 <small className="dictation-target">Dictation adds to: {patientFields[focused]}</small><div className="patient-intake-actions">{step>0&&<button type="button" className="text-button" onClick={onBack}>Back</button>}<button type="button" className="text-button" onClick={onNext}>Skip remaining fields</button><button type="submit" className="primary-button">{step===2?'Continue to symptoms':'Continue'}</button></div></form></section>;
}
