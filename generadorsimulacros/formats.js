// Modelos contrastados con los exámenes aportados por Maite (2021–2026).
// Las casillas opcionales se pueden marcar para añadir contenido al simulacro.
const T = String.raw;
const M = tex => '<span class="tex">\\(' + tex + '\\)</span>';
const D = tex => '<div class="math-step">\\[' + tex + '\\]</div>';
const esc = str => String(str).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const signed = (n,v='') => n===0?'':(n>0?'+':'-')+Math.abs(n)+v;
const coord = (x,y) => T`(${x},${y})`;
const banks = {};
const add = (type,q,steps,result,minutes=7) => {
  (banks[type] ||= []).push({id:type+'-'+banks[type].length,q,steps,result,minutes});
};
function shuffledIndices(indices){
 const out=indices.slice();for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;
}
function linear3Deck(){return shuffledIndices(banks.linear3.map((_,i)=>i));}

for(const key of Object.keys(banks)){const seen=new Set();banks[key]=banks[key].filter(q=>{if(seen.has(q.q))return false;seen.add(q.q);return true;});}
// Bancos para los formatos de segunda y tercera evaluación.
// Variantes de las familias presentes en los exámenes de referencia.
for(let k=1;k<=12;k++) {
 const a=k+1;
 add('functions',`Representa ${M(T`f(x)=(x-${a})^2-${k}`)} e indica dominio, recorrido, vértice, cortes con los ejes y monotonía.`,[T`D_f=\mathbb R,\quad V=(${a},-${k})`,T`f(x)=0\Rightarrow x=${a}\pm\sqrt{${k}},\quad f(0)=${a*a-k}`,T`f'(x)=2(x-${a})`,T`f'(x)<0\ (x<${a}),\quad f'(x)>0\ (x>${a})`],T`R_f=[-${k},+\infty),\quad\text{mínimo: }f(${a})=-${k}`,12);
 add('absoluteFunction',`Escribe ${M(T`f(x)=|x-${a}|+|x+${k}|`)} como una función a trozos y represéntala.`,[T`x<-${k}:\quad f(x)=-x+${a}-x-${k}=-2x+1`,T`-${k}\le x<${a}:\quad f(x)=-x+${a}+x+${k}=${a+k}`,T`x\ge${a}:\quad f(x)=x-${a}+x+${k}=2x-1`],T`f(x)=\begin{cases}-2x+1&x<-${k}\\${a+k}&-${k}\le x<${a}\\2x-1&x\ge${a}\end{cases}`,9);
 const optX=20+k,max=100*optX*optX-500;
 add('quadraticProfit',`Una empresa vende cada unidad a ${M((200*optX+30)+'\\,\\text{euros}')}. El coste de fabricar ${M('x')} unidades es ${M(T`C(x)=100x^2+30x+500`)} euros. Obtén el beneficio y determina cuántas unidades debe fabricar para que sea máximo.`,[T`B(x)=(${200*optX+30})x-(100x^2+30x+500)`,T`B(x)=-100x^2+${200*optX}x-500`,T`x_V=-\frac{${200*optX}}{2(-100)}=${optX}`,T`B(x)=-100(x-${optX})^2+${max}`],T`x=${optX}\text{ unidades},\qquad B_{\max}=${max}\text{ euros}`,12);
 add('continuity',`Estudia la continuidad de ${M(T`f(x)=\begin{cases}x+${k}&x<0\\${k+1}&x=0\\x^2+${k}&x>0\end{cases}`)} y clasifica las discontinuidades.`,[T`\lim_{x\to0^-}f(x)=${k},\quad\lim_{x\to0^+}f(x)=${k}`,T`\lim_{x\to0}f(x)=${k}\ne f(0)=${k+1}`,T`\text{En }(-\infty,0)\text{ y }(0,+\infty)\text{ es polinómica.}`],T`\text{Discontinuidad evitable en }x=0;\ \text{continua en }\mathbb R\setminus\{0\}`,9);
 add('continuity',`Estudia la continuidad de ${M(T`f(x)=\begin{cases}x+${k}&x<0\x^2+${k+2}&x\ge0\end{cases}`)} y clasifica las discontinuidades.`,[T`\lim_{x\to0^-}f(x)=${k}`,T`\lim_{x\to0^+}f(x)=${k+2}=f(0)`,T`\lim_{x\to0^-}f(x)\ne\lim_{x\to0^+}f(x)`],T`\text{Discontinuidad de salto finito en }x=0;\ \text{continua en }\mathbb R\setminus\{0\}`,9);
 add('continuity',`Estudia la continuidad de ${M(T`f(x)=\begin{cases}\frac{${k}}{x}&x<0\x+${k}&x\ge0\end{cases}`)} y clasifica las discontinuidades.`,[T`\lim_{x\to0^-}f(x)=-\infty`,T`\lim_{x\to0^+}f(x)=${k}=f(0)`],T`\text{Discontinuidad infinita en }x=0;\ \text{continua en }\mathbb R\setminus\{0\}`,9);
 add('continuityParam',`Calcula ${M('a')} y ${M('b')} para que ${M(T`f(x)=\begin{cases}x+${k}&x<0\\ax+b&0\le x<1\\x^2+${k+2}&x\ge1\end{cases}`)} sea continua en ${M(T`\mathbb R`)}.`,[T`x=0:\quad ${k}=b`,T`x=1:\quad a+b=1+${k+2}=${k+3}`,T`a+${k}=${k+3}`],T`a=3,\quad b=${k}`,10);
 add('limits',`Calcula ${M(T`\lim_{x\to+\infty}\left(\sqrt{9x^4+${k}x^2}-3x^2\right)`)}.`,[T`\lim_{x\to+\infty}\frac{${k}x^2}{\sqrt{9x^4+${k}x^2}+3x^2}`,T`=\lim_{x\to+\infty}\frac{${k}}{\sqrt{9+${k}/x^2}+3}`],T`\frac{${k}}6`,7);
 add('limits',`Calcula ${M(T`\lim_{x\to${a}}\frac{x^2-${a*a}}{x^2${signed(1-a,'x')}-${a}}`)}.`,[T`\frac{x^2-${a*a}}{x^2${signed(1-a,'x')}-${a}}=\frac{(x-${a})(x+${a})}{(x-${a})(x+1)}`,T`\lim_{x\to${a}}\frac{x+${a}}{x+1}=\frac{${2*a}}{${a+1}}`],T`\frac{${2*a}}{${a+1}}`,6);
 add('limits',`Calcula ${M(T`\lim_{x\to${a}}\frac{x^2-${a*a}}{(x-${a})^2}`)} y los dos límites laterales.`,[T`\frac{x^2-${a*a}}{(x-${a})^2}=\frac{x+${a}}{x-${a}}`,T`\lim_{x\to${a}^-}\frac{x+${a}}{x-${a}}=-\infty`,T`\lim_{x\to${a}^+}\frac{x+${a}}{x-${a}}=+\infty`],T`\text{El límite bilateral no existe.}`,6);
 add('asymptotes',`Calcula las asíntotas de ${M(T`f(x)=\frac{x^2+${k}}{x-${a}}`)} y sitúa la gráfica respecto a ellas.`,[T`f(x)=x+${a}+\frac{${a*a+k}}{x-${a}}`,T`\lim_{x\to${a}^-}f(x)=-\infty,\quad\lim_{x\to${a}^+}f(x)=+\infty`,T`f(x)-(x+${a})=\frac{${a*a+k}}{x-${a}}`,T`x<${a}\Rightarrow f(x)<x+${a};\quad x>${a}\Rightarrow f(x)>x+${a}`],T`\text{AV: }x=${a};\quad\text{AO: }y=x+${a};\quad\text{sin AH}`,9);
 const bb=k+2;
 add('asymptotes',`Calcula las asíntotas de ${M(T`f(x)=\frac{${k}x}{x^2-${bb*bb}}`)} y sitúa la gráfica respecto a ellas.`,[T`x^2-${bb*bb}=(x-${bb})(x+${bb}),\quad x=\pm${bb}\text{ anulan el denominador}`,T`\lim_{x\to\pm\infty}f(x)=0`,T`\lim_{x\to-${bb}^-}f(x)=-\infty,\quad\lim_{x\to-${bb}^+}f(x)=+\infty`,T`\lim_{x\to${bb}^-}f(x)=-\infty,\quad\lim_{x\to${bb}^+}f(x)=+\infty`,T`f<0:\ (-\infty,-${bb})\cup(0,${bb});\quad f>0:\ (-${bb},0)\cup(${bb},+\infty)`],T`\text{AV: }x=\pm${bb};\quad\text{AH: }y=0;\quad\text{sin AO}`,9);
 add('asymptoteParam',`La recta ${M(T`y=${k}x-${a}`)} es asíntota oblicua de ${M(T`f(x)=\frac{${2*k}x^2+1}{ax+b}`)}. Halla ${M('a')} y ${M('b')}.`,[T`\lim_{x\to\infty}\frac{f(x)}x=\frac{${2*k}}a=${k}\Rightarrow a=2`,T`\lim_{x\to\infty}(f(x)-${k}x)=-\frac{${k}b}2=-${a}`,T`b=\frac{${2*a}}{${k}}`],T`a=2,\quad b=\frac{${2*a}}{${k}}`,8);
 add('derivatives',`Deriva ${M(T`f(x)=\arctan(\sin(${k}x))`)}.`,[T`u=\sin(${k}x),\quad u'=${k}\cos(${k}x)`,T`(\arctan u)'=\frac{u'}{1+u^2}`],T`f'(x)=\frac{${k}\cos(${k}x)}{1+\sin^2(${k}x)}`,4);
 add('derivatives',`Deriva ${M(T`f(x)=\ln\left(\frac{x^{${k+1}}\sin x}{\cos x}\right)`)}.`,[T`u=\frac{x^{${k+1}}\sin x}{\cos x},\qquad f'=\frac{u'}u`,T`\frac{u'}u=\frac{${k+1}}x+\frac{\cos x}{\sin x}+\frac{\sin x}{\cos x}`],T`f'(x)=\frac{${k+1}}x+\cot x+\tan x\quad\text{en el dominio de }f`,5);
 add('derivatives',`Deriva ${M(T`f(x)=${k+2}^{\sin x}(x^2+2)^{${k%3+2}}`)}.`,[T`u=${k+2}^{\sin x},\quad u'=${k+2}^{\sin x}\ln(${k+2})\cos x`,T`v=(x^2+2)^{${k%3+2}},\quad v'=${2*(k%3+2)}x(x^2+2)^{${k%3+1}}`,T`f'=u'v+uv'`],T`f'=${k+2}^{\sin x}(x^2+2)^{${k%3+1}}\left[(x^2+2)\ln(${k+2})\cos x+${2*(k%3+2)}x\right]`,5);
 add('derivatives',`Deriva ${M(T`f(x)=${k}(2x+3\tan x)^5-x`)}.`,[T`u=2x+3\tan x,\quad u'=2+\frac3{\cos^2x}`,T`f'=${5*k}u^4u'-1`],T`f'(x)=${5*k}(2x+3\tan x)^4\left(2+\frac3{\cos^2x}\right)-1`,4);
 add('derivatives',`Deriva ${M(T`f(x)=\left(${k+2}^{x}+x^3\right)^{3/7}`)}.`,[T`u=${k+2}^{x}+x^3,\quad u'=${k+2}^{x}\ln(${k+2})+3x^2`,T`(u^{3/7})'=\frac37u^{-4/7}u'`],T`f'(x)=\frac{3\left(${k+2}^{x}\ln(${k+2})+3x^2\right)}{7\left(${k+2}^{x}+x^3\right)^{4/7}}\quad\text{si }${k+2}^x+x^3\ne0`,5);
 const p=k%4+1;
 add('study',`Estudia y representa ${M(T`f(x)=x^3-3\cdot${p*p}x`)}: dominio, cortes, monotonía, extremos, curvatura e inflexión.`,[T`D_f=\mathbb R,\quad f(x)=x(x^2-${3*p*p})`,T`f(x)=0\Rightarrow x=0,\ \pm${p}\sqrt3`,T`f'(x)=3(x^2-${p*p}),\quad f''(x)=6x`,T`f'>0:\ (-\infty,-${p})\cup(${p},+\infty);\quad f'<0:\ (-${p},${p})`,T`f(-${p})=${2*p**3},\quad f(${p})=-${2*p**3}`,T`f''<0\ (x<0),\quad f''>0\ (x>0),\quad I=(0,0)`],T`\text{Máximo relativo }(-${p},${2*p**3});\quad\text{mínimo relativo }(${p},-${2*p**3})`,15);
 add('optimization',`Un terreno rectangular junto a un río debe tener ${M(2*a*a+'\\,\\mathrm{m}^2')} de área. El lado que da al río no necesita valla. ¿Qué dimensiones minimizan la longitud de valla?`,[T`xy=${2*a*a},\quad y=\frac{${2*a*a}}x,\quad x>0`,T`L(x)=2x+\frac{${2*a*a}}x`,T`L'(x)=2-\frac{${2*a*a}}{x^2}=0\Rightarrow x=${a}`,T`L''(x)=\frac{${4*a*a}}{x^3}>0,\qquad y=${2*a}`],T`x=${a}\,\mathrm m,\quad y=${2*a}\,\mathrm m,\quad L_{\min}=${4*a}\,\mathrm m`,12);
 add('derivability',`Calcula ${M('a')} y ${M('b')} para que ${M(T`f(x)=\begin{cases}x^3&x\le${k}\\-x^2+ax+b&x>${k}\end{cases}`)} sea derivable en todos los números reales.`,[T`\text{Continuidad: }${k**3}=-${k*k}+${k}a+b`,T`f'_-=3x^2,\quad f'_+=-2x+a`,T`3\cdot${k*k}=-${2*k}+a\Rightarrow a=${3*k*k+2*k}`,T`b=${k**3+k*k}-${k}\cdot${3*k*k+2*k}=${-2*k**3-k*k}`],T`a=${3*k*k+2*k},\quad b=${-2*k**3-k*k}`,10);
 add('highLimit',`Calcula ${M(T`\lim_{x\to1}\frac{1-\cos(${k}(x-1))}{(\ln x)^2}`)}.`,[T`1-\cos(${k}(x-1))\sim\frac{${k*k}(x-1)^2}2`,T`\ln x\sim x-1\quad(x\to1)`,T`\lim_{x\to1}\frac{${k*k}(x-1)^2}{2(x-1)^2}`],T`\frac{${k*k}}2`,8);
 add('integrals',`Calcula ${M(T`\int\sin(${k}x^2+2x)(${k}x+1)\,dx`)}.`,[T`u=${k}x^2+2x,\quad du=2(${k}x+1)\,dx`,T`\frac12\int\sin u\,du=-\frac12\cos u+C`],T`-\frac12\cos(${k}x^2+2x)+C`,5);
 add('integrals',`Calcula ${M(T`\int\frac{${k}}{x^2+1}\,dx`)}.`,[T`\int\frac{du}{1+u^2}=\arctan u+C`],T`${k}\arctan x+C`,3);
 add('integrals',`Calcula ${M(T`\int\frac{(\ln x)^{${k%3+1}}}{x}\,dx`)}.`,[T`u=\ln x,\quad du=\frac{dx}x`,T`\int u^{${k%3+1}}\,du=\frac{u^{${k%3+2}}}{${k%3+2}}+C`],T`\frac{(\ln x)^{${k%3+2}}}{${k%3+2}}+C,\quad x>0`,4);
 add('integrals',`Calcula ${M(T`\int\tan(${k}x+1)\,dx`)}.`,[T`u=${k}x+1,\quad du=${k}\,dx`,T`\frac1{${k}}\int\frac{\sin u}{\cos u}\,du=-\frac1{${k}}\ln|\cos u|+C`],T`-\frac1{${k}}\ln|\cos(${k}x+1)|+C`,4);
 add('integrals',`Calcula ${M(T`\int\frac{${k}x}{\sqrt{1-${k*k}x^4}}\,dx`)}.`,[T`u=${k}x^2,\quad du=${2*k}x\,dx`,T`\frac12\int\frac{du}{\sqrt{1-u^2}}=\frac12\arcsin u+C`],T`\frac12\arcsin(${k}x^2)+C`,5);
 add('integrals',`Calcula ${M(T`\int\left(\frac{${k}}x+${a}x^2+e^x\right)\,dx`)}.`,[T`${k}\int\frac{dx}x+${a}\int x^2\,dx+\int e^x\,dx`],T`${k}\ln|x|+\frac{${a}}3x^3+e^x+C`,4);
 add('area',`Calcula el área limitada por ${M(T`f(x)=x(x-${a})`)}, el eje ${M('OX')} y las rectas ${M('x=0')} y ${M('x='+a)}.`,[T`f(x)\le0\quad(0\le x\le${a})`,T`A=-\int_0^{${a}}(x^2-${a}x)\,dx`,T`A=-\left[\frac{x^3}3-\frac{${a}x^2}2\right]_0^{${a}}`],T`A=\frac{${a**3}}6\text{ unidades cuadradas}`,8);
}
for(const key of Object.keys(banks)){const seen=new Set();banks[key]=banks[key].filter(q=>{if(seen.has(q.q))return false;seen.add(q.q);return true;});}

// Catálogo de la primera evaluación: solo ejercicios contrastados con una fuente.
const firstEvaluationTopics=['polynomial','bicuadratic','rational','radical','exponential','logarithmic','linear3','nonlinear','linearProblem','linearProblem2','nonlinearProblem','classification','absolute','intervals','trigTriangle','trigHeight','trigEquation','points','unitVector','lines','inequality','inequalitySystem1','inequalitySystem2','rationalInequality','inequalityProblem'];
for(const topic of firstEvaluationTopics)banks[topic]=[];
for(const original of FIRST_EVALUATION_CATALOG){
 const item={...original,q:(original.q?esc(original.q)+' ':'')+(original.latex?M(original.latex):'')};
 (banks[item.topic] ||= []).push(item);
}
// El formato original comparte exactamente el mismo catálogo, sin copias divergentes.
const legacyTopics={algebra:'polynomial',degree:'bicuadratic',rational:'rational',radical:'radical',exp:'exponential',log:'logarithmic',systems:'nonlinear',intervals:'intervals',abs:'absolute',problem:'nonlinearProblem'};
for(const [legacy,topic] of Object.entries(legacyTopics))pool[legacy]=banks[topic].map(q=>({...q,s:q.steps.map(M).join('<br>')+'<br>'+M(q.result)}));
sections=sections.filter(section=>pool[section.id]?.length);
selected=Object.fromEntries(sections.map(section=>[section.id,true]));
// Un historial por pestaña, compartido entre formatos y conservado al recargar.
const historyStorageKey='bach-question-history-v3';
let sessionHistory={used:[],coverage:{}};
try{const saved=JSON.parse(sessionStorage.getItem(historyStorageKey)||'null');if(saved&&Array.isArray(saved.used))sessionHistory={used:saved.used,coverage:saved.coverage||{}};}catch(e){}
const usedQuestions=new Set(sessionHistory.used);
function questionKey(q){return (q.q+'|'+(q.latex||'')).normalize('NFKC').replace(/\s+/g,'').replace(/&(?:amp|lt|gt);/g,s=>({'&amp;':'&','&lt;':'<','&gt;':'>'})[s]);}
function unseenQuestions(type){return (banks[type]||[]).filter(q=>!usedQuestions.has(q.id)&&!usedQuestions.has(questionKey(q)));}
function rememberQuestion(q){
 usedQuestions.add(q.id);usedQuestions.add(questionKey(q));
 sessionHistory.used=[...usedQuestions];sessionHistory.coverage[q.topic||q.type]=(sessionHistory.coverage[q.topic||q.type]||0)+1;
 try{sessionStorage.setItem(historyStorageKey,JSON.stringify(sessionHistory));}catch(e){}
 return q;
}
function pickOriginalProblem(type,questions){return pickBank(type);}
function sourceCaption(q){
 if(!q.source)return '';
 return '<p class="source-caption">Fuente: '+esc(q.source.document)+' · pág. '+q.source.page+' · ejercicio '+esc(q.source.exercise)+'</p>';
}

const topicInfo={
  inequality:['Inecuaciones','inequalities'],inequalitySystem1:['Sistemas de inecuaciones con una incógnita','inequalities'],inequalitySystem2:['Sistemas de inecuaciones con dos incógnitas','inequalities'],rationalInequality:['Inecuaciones con fracciones algebraicas','inequalities'],inequalityProblem:['Problemas de inecuaciones','inequalities'],
  polynomial:['Ecuaciones polinómicas','algebra'],bicuadratic:['Bicuadradas','algebra'],rational:['Ecuaciones racionales','algebra'],radical:['Ecuaciones con radicales','algebra'],exponential:['Ecuaciones exponenciales','algebra'],logarithmic:['Ecuaciones logarítmicas','algebra'],linear3:['Sistemas de tres ecuaciones y tres incógnitas','systems'],nonlinear:['Sistemas no lineales','systems'],linearProblem:['Problemas de tres incógnitas','systems'],linearProblem2:['Problemas de dos incógnitas','systems'],nonlinearProblem:['Problemas de sistemas no lineales','systems'],classification:['Clasificación de sistemas','systems'],absolute:['Valor absoluto','algebra'],intervals:['Intervalos','algebra'],trigTriangle:['Triángulos: senos y cosenos','trigonometry'],trigHeight:['Alturas y distancias','trigonometry'],trigEquation:['Ecuaciones trigonométricas','trigonometry'],points:['Puntos y vectores','geometry'],unitVector:['Vectores unitarios perpendiculares','geometry'],lines:['Rectas, ángulos y distancias','geometry'],functions:['Funciones y representación','functions'],absoluteFunction:['Valor absoluto: función a trozos','functions'],quadraticProfit:['Beneficio máximo: función cuadrática','functions'],continuityParam:['Continuidad con parámetros','analysis'],asymptoteParam:['Asíntota oblicua con parámetros','analysis'],highLimit:['Límites trigonométricos y logarítmicos','analysis'],continuity:['Continuidad y parámetros','analysis'],limits:['Límites','analysis'],asymptotes:['Asíntotas y posición de la gráfica','analysis'],derivatives:['Derivadas compuestas','derivatives'],study:['Estudio completo de funciones','derivatives'],optimization:['Problemas de optimización','derivatives'],integrals:['Primitivas e integrales','integrals'],area:['Áreas de recintos','integrals'],derivability:['Derivabilidad y parámetros','derivatives']
};
const stages={algebra:['Álgebra e intervalos',true],systems:['Sistemas de ecuaciones',true],inequalities:['Inecuaciones y sistemas de inecuaciones',true],trigonometry:['Trigonometría',false],geometry:['Vectores y rectas',false],functions:['Funciones',false],analysis:['Límites, continuidad y asíntotas',false],derivatives:['Derivadas y aplicaciones',false],integrals:['Integrales',false]};
let taught={};
try{taught=JSON.parse(localStorage.getItem('bach-taught-v1')||'{}')}catch(e){}
for(const [id,value] of Object.entries(stages)) if(typeof taught[id]!=='boolean')taught[id]=value[1];
const currentClassTopics=['linear3','linearProblem','inequality','rationalInequality','inequalitySystem1','inequalitySystem2','inequalityProblem'];
const formats=[
 {id:'follow1',label:'Seguimiento · 1.ª evaluación',legacy:true,description:'Se conserva el generador que ya utilizabas: ecuaciones, sistemas no lineales, intervalos y problema. Puedes elegir también los modelos de seguimiento de los exámenes aportados.'},
 {id:'class50',label:'Nota de clase 1ª Evaluación',topics:currentClassTopics,description:'Práctica de la próxima nota de clase: sistemas de tres incógnitas, problemas de Gauss, inecuaciones y sus problemas. Cada simulacro alterna contenidos para ajustarse a 50 minutos, con tiempo de revisión.'},
 {id:'class1',label:'Nota de clase · 1.ª evaluación',description:'Pruebas breves con un formato propio: ecuaciones, sistemas o trigonometría, según la unidad.'},
 {id:'exam1',label:'Evaluación · 1.ª evaluación',description:'Combina álgebra, sistemas, problemas, trigonometría y geometría. La distribución varía entre los modelos de los exámenes aportados.'},
 {id:'follow2',label:'Seguimiento · 2.ª evaluación',topics:['functions','absoluteFunction','quadraticProfit','continuity','continuityParam','limits'],description:'Formato de funciones, continuidad, límites y problemas. Los exámenes de distintos años incluyen combinaciones diferentes.'},
 {id:'class2',label:'Nota de clase · 2.ª evaluación',topics:['derivatives'],description:'Prueba breve de derivación: regla de la cadena, productos, cocientes y funciones compuestas.'},
 {id:'exam2',label:'Evaluación · 2.ª evaluación',topics:['derivatives','limits','asymptotes','asymptoteParam','continuity','study','optimization'],description:'Formato de derivadas, límites, asíntotas y continuidad, con variantes de estudio de funciones y optimización.'},
 {id:'exam3',label:'Evaluación · 3.ª evaluación',topics:['integrals','area','study','optimization','derivability','highLimit'],description:'Formato de integrales y sus aplicaciones, representación de funciones, derivabilidad, límites y optimización.'}
];
const memories={}, decks={}, usedLast={};
let activeFormat='class50',followModel='original',classUnit='equations',activePaper=null,serial=0;
const savedLegacy={selected:{...selected},actual:null,exam:'',solution:''};
const legacyRender=render,legacyDraw=drawControls;
const titleCase=Object.fromEntries(formats.map(f=>[f.id,f.label]));
const typesFor = () => {
 const current=formats.find(f=>f.id===activeFormat);if(current.topics)return current.topics;
 if(activeFormat==='class1') return classUnit==='equations'?['rational','radical','exponential','logarithmic','absolute']:classUnit==='systems'?['linear3','nonlinear','linearProblem','linearProblem2','nonlinearProblem']:['trigTriangle','trigHeight','trigEquation'];
 if(activeFormat==='exam1') return ['polynomial','bicuadratic','rational','radical','exponential','logarithmic','linear3','nonlinear','linearProblem','linearProblem2','nonlinearProblem','trigTriangle','trigHeight','trigEquation','points','unitVector','lines','inequality','inequalitySystem1','inequalitySystem2','rationalInequality','inequalityProblem'];
 return ['polynomial','bicuadratic','rational','radical','exponential','logarithmic','linear3','nonlinear','linearProblem','linearProblem2','nonlinearProblem','classification','absolute','intervals','inequality','inequalitySystem1','inequalitySystem2','rationalInequality','inequalityProblem'];
};
const memoryKey=()=>activeFormat+'-'+(activeFormat==='class1'?classUnit:followModel);
const currentMemory=()=>memories[memoryKey()] ||= {chosen:{},forced:{},paper:null,serial:0};
const available=t=>Array.isArray(banks[t])&&banks[t].length>0;
const previousOrders={};
function shuffledItems(items,key){
 const shuffled=shuffledIndices(items.map((_,i)=>i)).map(i=>items[i]);
 if(key&&shuffled.length>1){
  const signature=arr=>JSON.stringify(arr.map(item=>item.id??item.type??item.title??String(item)));
  if(signature(shuffled)===previousOrders[key]){
   const shift=1+Math.floor(Math.random()*(shuffled.length-1));
   shuffled.push(...shuffled.splice(0,shift));
  }
  previousOrders[key]=signature(shuffled);
 }
 return shuffled;
}
function shuffleLegacyOrder(){
 const paper=document.getElementById('exam'),solutions=document.getElementById('solution-body');
 const blocks=Array.from(paper.querySelectorAll('.exam-block')).map((element,i)=>({id:i+1,element}));
 if(!blocks.length)return;
 const reordered=shuffledItems(blocks,'legacy:blocks');
 const answers=Array.from(solutions.querySelectorAll('.solution-item')).map(element=>({element,label:element.querySelector('strong'),old:Number(element.querySelector('strong').textContent.match(/^\d+/)?.[0])}));
 reordered.forEach((block,i)=>{
  const heading=block.element.querySelector('h3');
  heading.textContent=heading.textContent.replace(/^\d+\./,(i+1)+'.');
  paper.appendChild(block.element);
  for(const answer of answers.filter(a=>a.old===block.id)){
   answer.label.textContent=answer.label.textContent.replace(/^\d+/,String(i+1));
   solutions.appendChild(answer.element);
  }
 });
}

function pickBank(type){
 const remaining=unseenQuestions(type);
 if(!remaining.length)return null;
 return rememberQuestion(remaining[Math.floor(Math.random()*remaining.length)]);
}
// La versión de seguimiento usa el mismo historial que todas las pestañas.
pick=function(id){const q=pickBank(legacyTopics[id]);return q?(pool[id].find(item=>item.id===q.id)||{...q,s:q.steps.map(M).join('<br>')+'<br>'+M(q.result)}):null;};
const choice = a => a[Math.floor(Math.random()*a.length)];
function drawTabs(){
 document.getElementById('format-tabs').innerHTML=formats.map(f=>`<button type="button" class="format-tab" id="tab-${f.id}" role="tab" aria-controls="generator-panel" aria-selected="${f.id===activeFormat}" tabindex="${f.id===activeFormat?0:-1}" data-format="${f.id}">${f.label}</button>`).join('');
 for(const el of document.querySelectorAll('[data-format]')) {
  el.onclick=()=>switchFormat(el.dataset.format);
  el.onkeydown=e=>{const ids=formats.map(f=>f.id),i=ids.indexOf(el.dataset.format);let next;if(e.key==='ArrowRight')next=ids[(i+1)%ids.length];if(e.key==='ArrowLeft')next=ids[(i+ids.length-1)%ids.length];if(e.key==='Home')next=ids[0];if(e.key==='End')next=ids.at(-1);if(next){e.preventDefault();switchFormat(next);document.getElementById('tab-'+next).focus()}};
 }
}
function drawStages(){
 document.getElementById('taught-controls').innerHTML=Object.entries(stages).filter(([id])=>['algebra','systems','inequalities','trigonometry','geometry'].includes(id)).map(([id,v])=>`<label><input type="checkbox" data-stage="${id}" ${taught[id]?'checked':''}> ${v[0]}</label>`).join('');
 document.querySelectorAll('[data-stage]').forEach(el=>el.onchange=()=>{taught[el.dataset.stage]=el.checked;try{localStorage.setItem('bach-taught-v1',JSON.stringify(taught))}catch(e){}currentMemory().paper=null;savedLegacy.exam='';drawFormat();});
}
function drawTopics(){
 const state=currentMemory();
 document.getElementById('controls').innerHTML=typesFor().map(type=>{
  if(!(type in state.chosen))state.chosen[type]=activeFormat==='class50'||(type!=='linearProblem2'&&!!taught[topicInfo[type][1]]);
  const ok=available(type), remaining=unseenQuestions(type).length;
  return `<label class="opt ${!taught[topicInfo[type][1]]&&!state.chosen[type]?'optional-topic':''} ${ok?'':'upcoming'}"><input type="checkbox" data-topic="${type}" ${ok&&state.chosen[type]?'checked':''} ${ok?'':'disabled'}><span>${topicInfo[type][0]}</span><em>${ok?(!taught[topicInfo[type][1]]?'Opcional · añadir':remaining+' sin repetir'):'Pendiente de material'}</em></label>`;
 }).join('');
 document.querySelectorAll('[data-topic]').forEach(el=>el.onchange=()=>{state.chosen[el.dataset.topic]=el.checked;(state.forced ||= {})[el.dataset.topic]=el.checked;el.closest('label').classList.toggle('optional-topic',!el.checked&&!taught[topicInfo[el.dataset.topic][1]]);updateTime();document.getElementById('status').textContent='Selección modificada. Pulsa «Crear examen» para actualizarlo.';});
 updateTime();
}
function enabledTopics(){const state=currentMemory();return typesFor().filter(t=>available(t)&&state.chosen[t]);}
function templates(){
 if(activeFormat==='follow2')return choice([
  [{title:'Representa e indica las características de las funciones.',types:['functions','functions','functions'],points:3},{title:'Expresa la función como una función a trozos.',types:['absoluteFunction'],points:2},{title:'Resuelve los problemas de beneficio máximo.',types:['quadraticProfit','quadraticProfit'],points:5}],
  [{title:'Calcula los parámetros para que la función sea continua.',types:['continuityParam'],points:1.75},{title:'Estudia la continuidad y clasifica las discontinuidades.',types:['continuity'],points:1.75},{title:'Calcula los límites.',types:['limits','limits','limits','limits'],points:5},{title:'Resuelve el problema.',types:['quadraticProfit'],points:1.5}]
 ]);
 if(activeFormat==='class2')return [{title:'Deriva las siguientes funciones.',types:Array(5).fill('derivatives'),points:10}];
 if(activeFormat==='exam2')return choice([
  [{title:'Deriva las siguientes funciones.',types:Array(5).fill('derivatives'),points:2},{title:'Calcula los límites.',types:Array(3).fill('limits'),points:2.25},{title:'Calcula las asíntotas y sitúa la gráfica respecto a ellas.',types:Array(3).fill('asymptotes'),points:3},{title:'Estudia la continuidad y clasifica las discontinuidades.',types:['continuity'],points:1.5},{title:'Halla los parámetros de la función.',types:['asymptoteParam'],points:1.25}],
  [{title:'Deriva las siguientes funciones.',types:Array(4).fill('derivatives'),points:2},{title:'Calcula las asíntotas y sitúa la gráfica respecto a ellas.',types:['asymptotes','asymptotes'],points:1.5},{title:'Estudia y representa la función.',types:['study'],points:2.5},{title:'Resuelve el problema de optimización.',types:['optimization'],points:1.5},{title:'Calcula los límites.',types:['limits','limits'],points:1.5},{title:'Halla los parámetros de la función.',types:['asymptoteParam'],points:1}]
 ]);
 if(activeFormat==='exam3')return choice([
  [{title:'Estudia y representa la función.',types:['study'],points:2.5},{title:'Calcula las siguientes primitivas.',types:Array(5).fill('integrals'),points:3},{title:'Calcula los parámetros para que la función sea derivable.',types:['derivability'],points:1.5},{title:'Calcula el límite.',types:['highLimit'],points:1},{title:'Resuelve el problema de optimización.',types:['optimization'],points:2}],
  [{title:'Calcula el área del recinto.',types:['area'],points:1.5},{title:'Calcula las siguientes primitivas.',types:Array(5).fill('integrals'),points:3.5},{title:'Estudia y representa la función.',types:['study'],points:2.5},{title:'Resuelve el problema de optimización.',types:['optimization'],points:1.5},{title:'Calcula el límite.',types:['highLimit'],points:1}]
 ]);

 if(activeFormat==='class1') {
  if(classUnit==='equations')return [{title:'Resuelve las siguientes ecuaciones.',types:['rational','radical','exponential','logarithmic'],points:8},{title:'Resuelve y expresa la solución como intervalo.',types:['absolute'],points:2}];
  if(classUnit==='systems')return [{title:'Resuelve los siguientes sistemas.',types:['linear3','nonlinear'],points:4},{title:'Plantea y resuelve los siguientes problemas.',types:['linearProblem','nonlinearProblem'],points:6}];
  return [{title:'Resuelve el problema del terreno triangular.',types:['trigTriangle'],points:4},{title:'Resuelve el problema de alturas y distancias.',types:['trigHeight'],points:4},{title:'Resuelve la ecuación trigonométrica (solución general en grados).',types:['trigEquation'],points:2}];
 }
 if(activeFormat==='exam1')return choice([
  [{title:'Resuelve las ecuaciones y sistemas.',types:['linear3',choice(['exponential','logarithmic']),choice(['inequality','rationalInequality']),'inequalitySystem1','inequalitySystem2'],points:4},{title:'Plantea y resuelve el problema de Gauss.',types:['linearProblem'],points:2},{title:'Plantea y resuelve el problema de inecuaciones.',types:['inequalityProblem'],points:2},{title:'Resuelve el problema de trigonometría.',types:[choice(['trigTriangle','trigHeight'])],points:2}],
  [{title:'Puntos y vectores.',types:['points'],points:3.25},{title:'Resuelve las siguientes ecuaciones y sistemas.',types:['linear3',choice(['exponential','logarithmic','rational','radical','polynomial','bicuadratic']),'trigEquation'],points:2.5},{title:'Plantea y resuelve el problema.',types:['linearProblem'],points:1.5},{title:'Resuelve el problema de trigonometría.',types:[choice(['trigTriangle','trigHeight'])],points:1.5},{title:'Vectores perpendiculares.',types:['unitVector'],points:1.25}],
  [{title:'Resuelve las siguientes ecuaciones y sistemas.',types:['linear3',choice(['logarithmic','exponential','nonlinear','rational','radical']),'trigEquation'],points:3},{title:'Plantea y resuelve el problema.',types:[choice(['linearProblem','linearProblem2','nonlinearProblem'])],points:1.75},{title:'Resuelve el problema de trigonometría.',types:[choice(['trigTriangle','trigHeight'])],points:1.5},{title:'Puntos y vectores.',types:['points'],points:1.75},{title:'Rectas, ángulos y distancias.',types:['lines'],points:2}]
 ]);
 return choice([
  [{title:'Resuelve las siguientes ecuaciones y sistemas.',types:['linear3','exponential','logarithmic','rational'],points:5},{title:'Plantea y resuelve el problema.',types:['linearProblem'],points:3},{title:'Clasifica los sistemas.',types:['classification'],points:2}],
  [{title:'Resuelve las siguientes ecuaciones y sistemas.',types:['rational','exponential','radical','nonlinear','linear3','absolute'],points:7.5},{title:'Plantea y resuelve el problema.',types:['linearProblem'],points:2.5}],
  [{title:'Resuelve las siguientes ecuaciones y sistemas.',types:[choice(['polynomial','bicuadratic']),'exponential','nonlinear','radical','linear3'],points:6},{title:'Plantea y resuelve los problemas.',types:['linearProblem','nonlinearProblem'],points:4}]
 ]);
}
function makePlan(draw=false){
 const state=currentMemory();const selectedSet=new Set(enabledTopics());
 const plan=templates().map(block=>({...block,types:block.types.filter(t=>selectedSet.has(t)),fullCount:block.types.length})).filter(b=>b.types.length);
 const seen=new Set(plan.flatMap(b=>b.types));
 const extra=[...selectedSet].filter(t=>(state.forced?.[t]||!taught[topicInfo[t][1]])&&!seen.has(t));
 if(extra.length)plan.push({title:'Contenido adicional seleccionado.',types:extra,points:extra.length,fullCount:extra.length});
 // Si no queda ningún apartado del modelo, se practica la selección manual.
 if(!plan.length && selectedSet.size){const fallback=[...selectedSet];plan.push({title:'Resuelve los apartados seleccionados.',types:fallback,points:10,fullCount:fallback.length});}
 if(draw){
  for(const block of plan){block.questions=shuffledItems(block.types.map(type=>{const q=pickBank(type);return q?{type,...q}:null}).filter(Boolean),memoryKey()+':'+block.title);block.types=block.questions.map(q=>q.type);}
  return shuffledItems(plan.filter(b=>b.questions.length),memoryKey()+':blocks');
 }
 return plan;
}
const classOperationTypes=new Set(['inequality','rationalInequality','inequalitySystem1','inequalitySystem2']);
const classProblemTypes=new Set(['linearProblem','inequalityProblem']);
function makeClass50(){
 const candidates=enabledTopics().map(type=>{
  const qs=unseenQuestions(type);return qs.length?{type,...qs[Math.floor(Math.random()*qs.length)]}:null;
 }).filter(Boolean);
 const options=[];
 for(let mask=1;mask<2**candidates.length;mask++){
  const qs=candidates.filter((_,i)=>mask&(1<<i));
  if(qs.some(q=>q.type==='inequality')&&qs.some(q=>q.type==='rationalInequality'))continue;
  const work=qs.reduce((sum,q)=>sum+q.minutes,0);
  if(work>45)continue;
  const balanced=qs.some(q=>classOperationTypes.has(q.type))&&qs.some(q=>classProblemTypes.has(q.type));
  const coverage=qs.reduce((sum,q)=>sum+1/(1+(sessionHistory.coverage[q.type]||0)),0);
  options.push({qs,work,balanced,coverage});
 }
 if(!options.length)return null;
 const full=options.filter(o=>o.work>=40&&o.balanced);
 if(!full.length&&enabledTopics().length>=4)return null;
 const pool=full.length?full:options.filter(o=>o.work===Math.max(...options.map(v=>v.work)));
 // Favorecer los contenidos menos practicados, con desempate aleatorio.
 const weights=pool.map(o=>Math.exp(o.coverage*2));let draw=Math.random()*weights.reduce((a,b)=>a+b,0),selected=pool.at(-1);
 for(let i=0;i<pool.length;i++){draw-=weights[i];if(draw<=0){selected=pool[i];break;}}
 const qs=selected.qs.map(rememberQuestion),blocks=[];
 const operations=qs.filter(q=>classOperationTypes.has(q.type));
 if(operations.length)blocks.push({title:'Resuelve las siguientes inecuaciones y sistemas.'+(operations.some(q=>q.type==='inequalitySystem2')?' Representa la solución del sistema con dos incógnitas.':''),questions:shuffledItems(operations,'class50:operations')});
 for(const q of qs.filter(q=>!classOperationTypes.has(q.type)))blocks.push({title:q.type==='linear3'?'Resuelve el sistema de tres ecuaciones y tres incógnitas. Clasifícalo y parametriza si es SCI.':q.type==='linearProblem'?'Plantea y resuelve el problema por el método de Gauss.':'Plantea y resuelve el problema de inecuaciones.',questions:[q]});
 let allocated=0;
 const ordered=shuffledItems(blocks,'class50:blocks');
 ordered.forEach((b,i)=>{b.types=b.questions.map(q=>q.type);b.score=i===ordered.length-1?+(10-allocated).toFixed(2):+(10*b.questions.reduce((n,q)=>n+q.minutes,0)/selected.work).toFixed(2);allocated+=b.score;});
 const time=full.length?50:Math.min(50,selected.work+5);
 return {blocks:ordered,time,workTime:selected.work,reviewTime:time-selected.work,serial:++serial,partial:!full.length};
}
function updateTime(){
 if(activeFormat==='class50'){document.getElementById('duration').innerHTML='<strong>50 min</strong><small>Alterna contenidos: 40–45 min de trabajo y 5–10 min de revisión. Sin repetir ejercicios en esta pestaña.</small>';return;}
 const types=enabledTopics();document.getElementById('duration').innerHTML='Tiempo estimado: <strong>'+types.reduce((sum,t)=>sum+banks[t][0].minutes,0)+' min</strong><small>Máximo según la selección; el modelo puede incluir menos apartados.</small>';
}
function showExhausted(){
 if(!enabledTopics().length){activePaper=null;currentMemory().paper=null;document.getElementById('exam').innerHTML='<div class="empty">Selecciona al menos un contenido para crear el simulacro.</div>';document.getElementById('solution-body').innerHTML='';document.getElementById('solutions').hidden=true;document.getElementById('status').textContent='Selecciona al menos un contenido.';document.getElementById('summary-count').textContent='0';document.getElementById('summary-time').textContent='0 min';return;}
 activePaper=null;currentMemory().paper=null;
 document.getElementById('exam').innerHTML='<div class="empty">No quedan ejercicios nuevos suficientes para formar este simulacro sin repetir. Has completado las combinaciones disponibles en esta pestaña. Selecciona otros contenidos para seguir practicando.</div>';
 document.getElementById('solution-body').innerHTML='';document.getElementById('solutions').hidden=true;
 document.getElementById('summary-count').textContent='0';document.getElementById('summary-time').textContent='0 min';
 document.getElementById('status').textContent='Banco completado: no se repiten ejercicios.';
}
function regionSolution(q){
 const v=q.verification;if(!v?.halfplanes)return '';
 const number=s=>{const p=String(s).split('/');return Number(p[0])/(p[1]?Number(p[1]):1);};
 const pts=v.vertices.map(v=>v.point.map(number));const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]);
 const padX=v.bounded?Math.max(1.3,(Math.max(...xs)-Math.min(...xs))*.24):5,padY=v.bounded?Math.max(1.3,(Math.max(...ys)-Math.min(...ys))*.24):5;
 const x0=Math.min(...xs)-padX,x1=Math.max(...xs)+padX,y0=Math.min(...ys)-padY,y1=Math.max(...ys)+padY;
 let polygon=[[x0,y0],[x1,y0],[x1,y1],[x0,y1]];
 for(const [a,b,c] of v.halfplanes){
  const next=[];for(let i=0;i<polygon.length;i++){const p=polygon[i],r=polygon[(i+1)%polygon.length],fp=a*p[0]+b*p[1]-c,fr=a*r[0]+b*r[1]-c;if(fp<=1e-9)next.push(p);if((fp>1e-9)!==(fr>1e-9)){const t=fp/(fp-fr);next.push([p[0]+t*(r[0]-p[0]),p[1]+t*(r[1]-p[1])]);}}polygon=next;
 }
 const X=x=>44+(x-x0)/(x1-x0)*512,Y=y=>350-(y-y0)/(y1-y0)*320;
 let svg='<svg class="region-graph" viewBox="0 0 600 400" role="img" aria-label="Región solución sombreada; fronteras estrictas discontinuas">';
 svg+='<defs><clipPath id="clip-'+q.id+'"><rect x="44" y="30" width="512" height="320"/></clipPath></defs>';
 for(let i=0;i<=8;i++){const x=x0+(x1-x0)*i/8,y=y0+(y1-y0)*i/8;svg+=`<path d="M ${X(x)} 30 V 350 M 44 ${Y(y)} H 556" stroke="#e4eaf0"/><text x="${X(x)}" y="369" text-anchor="middle">${x.toFixed(1)}</text><text x="37" y="${Y(y)+4}" text-anchor="end">${y.toFixed(1)}</text>`;}
 svg+='<g clip-path="url(#clip-'+q.id+')">';
 svg+='<polygon points="'+polygon.map(p=>X(p[0])+','+Y(p[1])).join(' ')+'" fill="#bdd9ef"/>';
 for(const [a,b,c,strict] of v.halfplanes){const p=b?[x0,(c-a*x0)/b]:[c/a,y0],r=b?[x1,(c-a*x1)/b]:[c/a,y1];svg+=`<line x1="${X(p[0])}" y1="${Y(p[1])}" x2="${X(r[0])}" y2="${Y(r[1])}" stroke="#315f80" stroke-width="2" ${strict?'stroke-dasharray="7 5"':''}/>`;}
 if(x0<=0&&x1>=0)svg+=`<path d="M ${X(0)} 30 V 350" stroke="#8495a3"/>`;
 if(y0<=0&&y1>=0)svg+=`<path d="M 44 ${Y(0)} H 556" stroke="#8495a3"/>`;
 for(const p of v.vertices)svg+=`<circle cx="${X(number(p.point[0]))}" cy="${Y(number(p.point[1]))}" r="3.5" fill="${p.included?'#20465d':'white'}" stroke="#20465d"/>`;
 svg+='</g><text x="570" y="370">x</text><text x="23" y="20">y</text></svg>';
 return svg+'<p class="graph-key">Azul: solución · Continua: frontera incluida · Discontinua: excluida.</p><p>Vértices de la frontera: '+v.vertices.map(p=>M('('+p.point.map(s=>s.includes('/')?'\\frac{'+s.split('/')[0]+'}{'+s.split('/')[1]+'}':s).join(',')+')')+' '+(p.included?'incluido':'excluido')).join('; ')+'.</p>';
}
function updateTime(){const types=enabledTopics();document.getElementById('duration').innerHTML='Tiempo estimado: <strong>'+types.reduce((sum,t)=>sum+banks[t][0].minutes,0)+' min</strong><small>Máximo según la selección; el modelo puede incluir menos apartados.</small>';}
function mathTypeset(){
 if(window.MathJax?.typesetPromise) {
  const nodes=[document.getElementById('exam'),document.getElementById('solutions')];
  window.MathJax.typesetClear?.(nodes);
  window.MathJax.typesetPromise(nodes).catch(e=>console.warn('No se pudo maquetar una fórmula',e));
 }
}
function displayPaper(paper){
 activePaper=paper;
 const qs=paper.blocks.flatMap(b=>b.questions), all=typesFor();
 const names=qs.map(q=>topicInfo[q.type][0]);
 document.getElementById('coverage-side').innerHTML=all.map(t=>`<div class="coverage-row ${names.includes(topicInfo[t][0])?'included':'omitted'}"><span class="mini-icon">${qs.some(q=>q.type===t)?'✓':'✕'}</span><span>${topicInfo[t][0]}</span><b>${!available(t)?'Próximo':qs.some(q=>q.type===t)?'Incluido':'Omitido'}</b></div>`).join('');
 document.getElementById('summary-count').textContent=qs.length+' / '+all.length;
 document.getElementById('summary-time').textContent=paper.time+' min';
 const personal=document.querySelector('.site-cc img').src, logo=document.getElementById('brand-logo').src;
 const date=new Intl.DateTimeFormat('es-ES',{timeZone:'Europe/Madrid',day:'2-digit',month:'2-digit',year:'numeric'}).format(new Date());
 let h=`<div class="paper-brand"><div class="print-logos"><img src="${logo}" alt="Colegio Punta Galea"><img class="personal-print" src="${personal}" alt="Maite · Matemáticas"></div><span>MATEMÁTICAS · 1.º BACHILLERATO<br>${esc(titleCase[activeFormat])}</span></div><header class="exam-top"><div class="eyebrow">Generador de simulacros</div><h2>${activeFormat.startsWith('class')?'SIMULACRO · NOTA DE CLASE':activeFormat.startsWith('exam')?'SIMULACRO DE EVALUACIÓN':'SIMULACRO DE SEGUIMIENTO'}</h2><div class="sub">${paper.time} minutos aprox. · 10 puntos${paper.reviewTime?' · '+paper.reviewTime+' min para revisión':''}</div></header><div class="exam-meta"><span>Nombre y apellidos: __________________________________</span><span>Fecha: ${date}</span></div>`;
 
 let sol='';
 paper.blocks.forEach((b,i)=>{
  h+=`<section class="exam-block"><h3>${i+1}. ${b.title} <span class="points">(${b.score.toFixed(2).replace('.',',')} puntos)</span></h3><ol class="exam-list">`;
  b.questions.forEach((q,j)=>{h+=`<li>${q.q} <span class="item-points">(${((Math.floor(b.score*100/b.questions.length)+(j<Math.round(b.score*100)%b.questions.length?1:0))/100).toFixed(2).replace('.',',')} p.)</span></li>`;sol+=`<article class="solution-box"><h3>${i+1}.${letters(j)} · ${topicInfo[q.type][0]}</h3>${q.steps.map(D).join('')}<div class="result">${D(q.result)}</div>${regionSolution(q)}${sourceCaption(q)}${q.sourceNote?'<p class="source-caption">'+esc(q.sourceNote)+'</p>':''}</article>`;});
  h+='</ol></section>';
 });
 document.getElementById('exam').innerHTML=h;
 document.getElementById('solution-body').innerHTML=sol;
 document.getElementById('solutions').hidden=true;
 document.getElementById('toggle-sols').textContent='Ver soluciones';
 document.getElementById('status').textContent=`Simulacro ${paper.serial} · ${qs.length} apartados · ${paper.time} min${paper.partial?' · práctica parcial':''}`;
 document.getElementById('duration').innerHTML='Tiempo del simulacro: <strong>'+paper.time+' min</strong>';
 mathTypeset();
}
function createPaper(){
 const f=formats.find(f=>f.id===activeFormat);
 if(f.pending)return;
 if(activeFormat==='class50'){const paper=makeClass50();if(paper){currentMemory().paper=paper;displayPaper(paper);}else showExhausted();return;}
 if(activeFormat==='follow1'&&followModel==='original'){
  const selectedBefore={...selected};for(const section of sections)if(!unseenQuestions(legacyTopics[section.id]).length)selected[section.id]=false;legacyRender();selected=selectedBefore;shuffleLegacyOrder();mathTypeset();savedLegacy.selected={...selected};savedLegacy.exam=document.getElementById('exam').innerHTML;savedLegacy.solution=document.getElementById('solution-body').innerHTML;savedLegacy.actual={...actual};savedLegacy.status=document.getElementById('status').textContent;savedLegacy.side=document.getElementById('coverage-side').innerHTML;savedLegacy.count=document.getElementById('summary-count').textContent;savedLegacy.time=document.getElementById('summary-time').textContent;return;
 }
 const blocks=makePlan(true);
 if(!blocks.length&&enabledTopics().length){showExhausted();return;}
 if(!blocks.length){currentMemory().paper=null;document.getElementById('coverage-side').innerHTML=typesFor().map(t=>`<div class="coverage-row omitted"><span class="mini-icon">✕</span><span>${topicInfo[t][0]}</span><b>Omitido</b></div>`).join('');document.getElementById('duration').innerHTML='Tiempo estimado: <strong>0 min</strong>';document.getElementById('exam').innerHTML='<div class="empty">Selecciona al menos un contenido trabajado para crear el simulacro.</div>';document.getElementById('solution-body').innerHTML='';document.getElementById('solutions').hidden=true;document.getElementById('summary-count').textContent='0';document.getElementById('summary-time').textContent='0 min';document.getElementById('status').textContent='No hay contenidos activos seleccionados.';return;}
 const rawTotal=blocks.reduce((n,b)=>n+b.points*b.types.length/b.fullCount,0);
 let allocated=0;
 blocks.forEach((b,i)=>{b.score=i===blocks.length-1?+(10-allocated).toFixed(2):+(10*b.points*b.types.length/b.fullCount/rawTotal).toFixed(2);allocated+=b.score;});
 const qs=blocks.flatMap(b=>b.questions);
 const paper={blocks,time:qs.reduce((n,q)=>n+q.minutes,0),serial:++serial,partial:false};
 const state=currentMemory();state.paper=paper;displayPaper(paper);
}
function drawFormat(){
 const f=formats.find(f=>f.id===activeFormat);
 drawTabs();
 document.getElementById('generator-panel').setAttribute('aria-labelledby','tab-'+f.id);
 document.getElementById('format-title').textContent=f.label;
 document.getElementById('format-description').textContent=f.description;
 document.querySelector('.course').textContent='1.º Bachillerato · '+(activeFormat.includes('2')?'2.ª':activeFormat.includes('3')?'3.ª':'1.ª')+' evaluación';
 document.getElementById('pending-model').hidden=!f.pending;
 document.querySelector('.config').hidden=!!f.pending;
 document.querySelector('.workspace').hidden=!!f.pending;
 document.getElementById('variant-controls').innerHTML=f.pending?'':activeFormat==='follow1'?'<label>Modelo de seguimiento <select id="follow-model"><option value="original">Formato actual · conservar</option><option value="past">Modelos de exámenes anteriores</option></select></label>':activeFormat==='class1'?'<label>Unidad de la nota de clase <select id="class-unit"><option value="equations">Ecuaciones e intervalos</option><option value="systems">Sistemas de ecuaciones</option><option value="trig">Trigonometría</option></select></label>':'';
 if(f.pending){
  document.getElementById('pending-topics').innerHTML=f.topics.map(t=>`<label class="opt upcoming"><input type="checkbox" disabled><span>${topicInfo[t][0]}</span><em>Próximo contenido</em></label>`).join('');
  document.getElementById('pending-description').textContent=f.description;
  return;
 }
 const fm=document.getElementById('follow-model');if(fm){fm.value=followModel;fm.onchange=()=>{savedLegacy.selected={...selected};followModel=fm.value;drawFormat();};}
 const cu=document.getElementById('class-unit');if(cu){cu.value=classUnit;cu.onchange=()=>{classUnit=cu.value;drawFormat();};}
 document.querySelector('.config .section-head h2').textContent='Contenidos del simulacro';
 document.querySelector('.config .section-head p').textContent='Marca los contenidos que pueden entrar. La nota de clase actual alterna entre ellos para ajustarse a 50 minutos. Los demás formatos mantienen su estructura habitual.';
 document.querySelector('.planning-note').innerHTML=activeFormat==='class50'?'Cada modelo combina parte de los contenidos marcados y reserva tiempo para revisar. Las preguntas se eligen <b>al azar y sin repetición mientras siga abierta esta pestaña</b>. Al agotar un banco se avisa.':activeFormat==='follow1'&&followModel==='original'?'Se conserva la selección y la estructura del generador actual.':'Cada nuevo simulacro elige una combinación del estilo de los exámenes de referencia. La puntuación se ajusta a los apartados incluidos hasta sumar <b>10 puntos</b>.';
 if(activeFormat==='follow1'&&followModel==='original'){
  selected={...savedLegacy.selected};legacyDraw();
  if(savedLegacy.exam){document.getElementById('exam').innerHTML=savedLegacy.exam;document.getElementById('solution-body').innerHTML=savedLegacy.solution;actual={...savedLegacy.actual};document.getElementById('coverage-side').innerHTML=savedLegacy.side;document.getElementById('summary-count').textContent=savedLegacy.count;document.getElementById('summary-time').textContent=savedLegacy.time;document.getElementById('status').textContent=savedLegacy.status;document.getElementById('solutions').hidden=true;document.getElementById('toggle-sols').textContent='Ver soluciones';}
  else createPaper();
 }else{drawTopics();const state=currentMemory();if(state.paper)displayPaper(state.paper);else createPaper();}mathTypeset();
}
function switchFormat(id){
 if(activeFormat==='follow1'&&followModel==='original')savedLegacy.selected={...selected};
 activeFormat=id;drawFormat();
}
document.getElementById('generate').onclick=createPaper;
document.getElementById('newExam').onclick=createPaper;
document.getElementById('all').onclick=()=>{if(activeFormat==='follow1'&&followModel==='original'){sections.forEach(s=>selected[s.id]=true);legacyDraw();createPaper();}else{const state=currentMemory();state.forced={};typesFor().forEach(t=>state.chosen[t]=true);drawTopics();createPaper();}};
document.getElementById('none').onclick=()=>{if(activeFormat==='follow1'&&followModel==='original'){sections.forEach(s=>selected[s.id]=false);legacyDraw();createPaper();}else{const state=currentMemory();state.forced={};typesFor().forEach(t=>state.chosen[t]=false);drawTopics();createPaper();}};
document.getElementById('toggle-sols').onclick=function(){const box=document.getElementById('solutions');box.hidden=!box.hidden;this.textContent=box.hidden?'Ver soluciones':'Ocultar soluciones';if(!box.hidden){mathTypeset();box.scrollIntoView({behavior:'smooth',block:'start'});}};
document.getElementById('print').onclick=()=>window.print();
drawFormat();

