// Estructuras contrastadas con los enunciados de evaluación de 2021, 2022,
// 2023 y 2025, y las recuperaciones de enero de 2022, enero de 2023,
// enero de 2024 y diciembre de 2025. No se copian ejercicios al elegir modelo.
const firstAssessmentTopics=['polynomial','bicuadratic','rational','radical','exponential','logarithmic','linear3','nonlinear','linearProblem','inequality','rationalInequality','inequalitySystem1','inequalitySystem2','inequalityProblem','trigProblem','trigEquation','points','lines','angleDistance'];
const assessmentCalculationAlternatives=['polynomial','bicuadratic','rational','radical','exponential','logarithmic','nonlinear','inequality','rationalInequality','inequalitySystem1','inequalitySystem2'];
const assessmentSlot=(type,points,role='',alternatives=[])=>({type,points,role,alternatives});
const firstAssessmentModels={
 exam1:[
  {id:'eval-2021',reference:'Evaluación · 29-12-2021',slots:[assessmentSlot('linear3',1),assessmentSlot('logarithmic',1,'',assessmentCalculationAlternatives),assessmentSlot('trigEquation',1),assessmentSlot('linearProblem',1.5),assessmentSlot('trigProblem',1.5),assessmentSlot('points',1.5,'triangle'),assessmentSlot('lines',2.5)]},
  {id:'eval-2022',reference:'Evaluación · 29-11-2022',slots:[assessmentSlot('linear3',1),assessmentSlot('nonlinear',1,'',assessmentCalculationAlternatives),assessmentSlot('exponential',1,'',assessmentCalculationAlternatives),assessmentSlot('trigEquation',1),assessmentSlot('trigProblem',1.5),assessmentSlot('linearProblem',1.5),assessmentSlot('points',1,'points'),assessmentSlot('lines',2)]},
  {id:'eval-2023',reference:'Evaluación · 05-12-2023',slots:[assessmentSlot('linearProblem',1.75),assessmentSlot('lines',1.5,'construction'),assessmentSlot('linear3',1),assessmentSlot('exponential',.75,'',assessmentCalculationAlternatives),assessmentSlot('logarithmic',.75,'',assessmentCalculationAlternatives),assessmentSlot('inequalitySystem2',.75,'',['inequality','rationalInequality','inequalitySystem1']),assessmentSlot('trigProblem',1.5),assessmentSlot('lines',2,'position',['inequalityProblem'])]},
  {id:'eval-2025',reference:'Evaluación · 25-11-2025',slots:[assessmentSlot('points',3.25,'points'),assessmentSlot('linear3',1),assessmentSlot('exponential',.75,'',assessmentCalculationAlternatives),assessmentSlot('trigEquation',.75),assessmentSlot('linearProblem',1.5),assessmentSlot('trigProblem',1.5),assessmentSlot('points',1.25,'unit')]}
 ],
 recovery1:[
  {id:'recu-2022',reference:'Recuperación · 12-01-2022',slots:[assessmentSlot('logarithmic',.75,'',assessmentCalculationAlternatives),assessmentSlot('trigEquation',.75),assessmentSlot('linear3',1),assessmentSlot('points',1.5,'triangle'),assessmentSlot('angleDistance',1.5,'metric-distance'),assessmentSlot('trigProblem',1.5),assessmentSlot('angleDistance',1.5,'metric-angle'),assessmentSlot('linearProblem',1.5)]},
  {id:'recu-2023',reference:'Recuperación · 12-01-2023',slots:[assessmentSlot('logarithmic',.75,'',assessmentCalculationAlternatives),assessmentSlot('trigEquation',.75),assessmentSlot('exponential',.75,'',assessmentCalculationAlternatives),assessmentSlot('linear3',1),assessmentSlot('points',2,'triangle'),assessmentSlot('trigProblem',1.5),assessmentSlot('angleDistance',1.5,'metric-distance'),assessmentSlot('linearProblem',1.75)]},
  {id:'recu-2024',reference:'Recuperación · 11-01-2024',slots:[assessmentSlot('trigProblem',2),assessmentSlot('linear3',1),assessmentSlot('exponential',.75,'',assessmentCalculationAlternatives),assessmentSlot('logarithmic',.75,'',assessmentCalculationAlternatives),assessmentSlot('angleDistance',2,'metric-distance'),assessmentSlot('points',2,'triangle'),assessmentSlot('linearProblem',1.5)]},
  {id:'recu-2025',reference:'Recuperación · 17-12-2025',slots:[assessmentSlot('trigProblem',1.5),assessmentSlot('linear3',1),assessmentSlot('logarithmic',.75,'',assessmentCalculationAlternatives),assessmentSlot('rational',.75,'',assessmentCalculationAlternatives),assessmentSlot('points',2,'triangle'),assessmentSlot('linearProblem',1.5),assessmentSlot('lines',.75,'position'),assessmentSlot('angleDistance',1.75)]}
 ]
};
function isFirstAssessment(format=activeFormat){return format==='exam1';}
function firstAssessmentDefault(type,format=activeFormat){return type!=='angleDistance';}
function assessmentHasRole(q,role){
 if(!role)return true;
 if(q.examRoles?.includes(role))return true;
 if(role==='metric-angle')return /ANGLE|MIXED/.test(q.id);
 if(role==='metric-distance')return /DIST|PARALLEL|MIXED/.test(q.id);
 const triangle=new Set(['EX25-POINTS','AG-V-32','AG-V-53','AG-V-54b']);
 const points=new Set(['EX25-POINTS','AG-V-5a','AG-V-5b','AG-V-5c','AG-V-6']);
 if(role==='triangle')return triangle.has(q.id);
 if(role==='points')return points.has(q.id)||q.practiceGroup==='complementary';
 if(role==='unit')return q.originalTopic==='unitVector'||/AG-V-(29|34|38|40|41|42|46|47|48|49|50)/.test(q.id);
 if(role==='construction')return /EX22-LINES|AG-R-(36|38|39|41|8|11|27)/.test(q.id);
 if(role==='position')return /EX22-LINES|AG-R-(29|30|31|32|33|34|35)/.test(q.id);
 return true;
}
function assessmentCandidates(type,role=''){
 const remaining=unseenQuestions(type),matching=remaining.filter(q=>assessmentHasRole(q,role));
 return matching.length?matching:remaining;
}
function assessmentChooseType(slot,selected,usedTypes){
 const eligible=[...new Set([slot.type,...slot.alternatives])].filter(t=>selected.has(t)&&available(t));
 if(!eligible.length)return null;
 const notRepeated=eligible.filter(t=>!usedTypes.has(t));
 const options=notRepeated.length?notRepeated:eligible;
 if(options.includes(slot.type)&&(slot.alternatives.length===0||Math.random()<.75))return slot.type;
 const weights=options.map(t=>1/Math.sqrt(1+(sessionHistory.coverage[t]||0)));
 let draw=Math.random()*weights.reduce((a,b)=>a+b,0);
 for(let i=0;i<options.length;i++){draw-=weights[i];if(draw<=0)return options[i];}
 return options.at(-1);
}
function assessmentPick(type,role){
 const remaining=assessmentCandidates(type,role);
 if(!remaining.length)return null;
 // Los originales primero; después los similares y complementarios del banco.
 const original=remaining.filter(q=>q.practiceGroup==='exam-original');
 const pool=original.length?original:remaining;
 return rememberQuestion(pool[Math.floor(Math.random()*pool.length)]);
}
function chooseAssessmentModel(selected){
 const modelFamily=selected.has('angleDistance')?'recovery1':'exam1';
 const models=firstAssessmentModels[modelFamily],last=currentMemory().lastAssessmentModel;
 const scored=models.map(model=>({model,coverage:model.slots.reduce((sum,s)=>sum+([s.type,...s.alternatives].some(t=>selected.has(t)&&available(t))?s.points:0),0)}));
 const max=Math.max(...scored.map(v=>v.coverage));
 let candidates=scored.filter(v=>v.coverage>=max-.75).map(v=>v.model);
 if(candidates.length>1)candidates=candidates.filter(m=>m.id!==last);
 return choice(candidates);
}
function makeFirstAssessmentPlan(draw=false){
 const state=currentMemory(),selected=new Set(enabledTopics());
 if(!selected.size){if(draw)state.assessmentMinutes=0;return [];}
 const recovery=selected.has('angleDistance');
 const preview=state.previewAssessmentModel;
 const compatiblePreview=preview&&preview.id.startsWith(recovery?'recu-':'eval-');
 const model=draw||!compatiblePreview?chooseAssessmentModel(selected):preview;
 state.previewAssessmentModel=model;
 const blocks=[],usedTypes=new Set();let retainedPoints=0,missing=0;
 for(const slot of model.slots){
  const type=assessmentChooseType(slot,selected,usedTypes);
  if(!type)continue;
  usedTypes.add(type);
  const q=draw?assessmentPick(type,type===slot.type?slot.role:''):null;
  if(draw&&!q){missing++;continue;}
  retainedPoints+=slot.points;
  blocks.push({title:'Resuelve los siguientes ejercicios.',types:[type],points:slot.points,fullCount:1,...(draw?{questions:[{...q,type,examWeight:slot.points}]}:{})});
 }
 // Marcar una casilla individual fuerza su práctica si no entra en ese modelo.
 for(const type of selected){
  const optionalMetric=type==='angleDistance'&&activeFormat==='exam1';
  if(usedTypes.has(type)||(!state.forced?.[type]&&!optionalMetric))continue;
  const q=draw?assessmentPick(type,''):null;
  if(draw&&!q){missing++;continue;}
  retainedPoints+=1;blocks.push({title:'Práctica seleccionada.',types:[type],points:1,fullCount:1,...(draw?{questions:[{...q,type,examWeight:1}]}:{})});
 }
 if(!blocks.length&&selected.size){
  for(const type of selected){
   const q=draw?assessmentPick(type,''):null;if(draw&&!q)continue;
   retainedPoints+=1;blocks.push({title:'Resuelve los siguientes ejercicios.',types:[type],points:1,fullCount:1,...(draw?{questions:[{...q,type,examWeight:1}]}:{})});
  }
 }
 if(draw){
  state.lastAssessmentModel=model.id;state.assessmentReference=model.reference;
  state.assessmentMinutes=blocks.length?Math.max(5,Math.round(75*retainedPoints/10)):0;
  state.assessmentPartial=retainedPoints<9.99||missing>0;
  return groupFirstEvaluation(blocks);
 }
 return blocks;
}
