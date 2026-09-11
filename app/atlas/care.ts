export type CareSection={title:string;body:string;steps?:string[];source:string};
const strength='https://www.nhs.uk/live-well/exercise/strength-exercises/';
const abs='https://www.nhs.uk/live-well/exercise/strength-and-resistance/body-blast-abs/';
const exercise:Record<string,[string,string[],string]>={
 biceps:['Try a light biceps curl',['Sit upright with your arms by your sides and a light weight in each hand.','Bend your elbows slowly to lift the weights, then lower with control. Keep your upper arms still.'],strength],
 pectoral:['Try a wall press-up',['Stand facing a wall and place your palms on it at chest height.','Bend your elbows to bring your chest toward the wall, then gently push away. Keep your body straight.'],strength],
 quadriceps:['Try sitting to standing',['Sit near the front of a sturdy chair with your feet flat on the floor.','Lean forward slightly and stand up slowly; sit down with control. Use support if you need it.'],strength],
 calf:['Try a supported heel raise',['Hold the back of a sturdy chair and stand tall.','Slowly rise onto your toes, then lower your heels with control.'],strength],
 abdominal:['Explore a guided core workout',['Core exercises train the belly muscles together; they do not isolate one small piece.','The linked NHS video demonstrates a short abdominal workout for people in good health with reasonable fitness. Choose movements you can control without pain.'],abs]
};
export function careSections(id:string,system:string,care:string,source:string):CareSection[]{
 if(id==='liver')return [
 {title:'Food and everyday movement',body:'A balanced eating pattern, regular activity and a healthy weight can help reduce fatty-liver risk. Avoid crash diets; discuss weight changes with a clinician if you already have liver disease.',source:'https://www.niddk.nih.gov/health-information/liver-disease/nafld-nash/eating-diet-nutrition'},
 {title:'Alcohol and existing liver disease',body:'If you have fatty liver, minimize alcohol. People with cirrhosis should avoid alcohol completely. Your clinician can explain what is appropriate for your diagnosis.',source:'https://www.niddk.nih.gov/health-information/liver-disease/cirrhosis/eating-diet-nutrition'},
 {title:'Liver tonics, detoxes and supplements',body:'“Liver tonic” is a marketing label, not proof of benefit. Detox products do not have convincing supporting evidence, and some can be unsafe. Check any supplement with a pharmacist or clinician before taking it.',source:'https://www.nccih.nih.gov/health/detoxes-and-cleanses-what-you-need-to-know'},
 {title:'What about milk thistle?',body:'Research on milk thistle for liver disease is conflicting or too limited to establish a benefit. It can cause side effects and interact with medicines. Do not replace prescribed treatment with it.',source:'https://www.nccih.nih.gov/health/milk-thistle'}];
 if(system==='muscular'){
 const item=exercise[id];
 return [item?{title:item[0],body:'For general strength and fitness, not treatment of a new injury.',steps:item[1],source:item[2]}:{title:'Choose exercise for this muscle',body:'Exercise choice depends on which movement this muscle supports. Use the NHS strength guide for general fitness; ask a physiotherapist for a suitable exercise if this area is painful or weak.',source:strength},
 {title:'Build up comfortably',body:'Begin with a light effort and a few controlled repetitions. Increase gradually as the movement becomes comfortable. Allow recovery between challenging sessions rather than training a sore muscle hard again.',source:'https://www.nhs.uk/live-well/exercise/how-to-improve-strength-flexibility/'},
 {title:'If you are exercising with pain',body:'Stop if an exercise causes pain or makes you feel unwell. New injury, recent surgery, pregnancy or a medical condition may change which exercises suit you; seek individual advice before starting an unfamiliar routine.',source:abs}];
 }
 return [{title:'Everyday care',body:care,source}];
}
