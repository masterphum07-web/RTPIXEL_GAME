import type { CaseInfo, Technique } from './types';
export interface Score { total:number; contrast:number; coverage:number; sharpness:number; positioning:number; notes:string[]; }
export function scoreExposure(t:Technique, verified:boolean, positioned:boolean, collimated:boolean, breath:boolean, patientReady:boolean, activeCase:CaseInfo):Score {
  const notes:string[]=[];
  const contrast=Math.max(0,100-Math.abs(t.kvp-110)*1.25);
  const coverage=Math.max(0,100-Math.abs(t.sid-180)*1.1-Math.abs(t.oid-8)*.8-(collimated?0:24));
  const sharpness=Math.max(0,100-Math.abs(t.mas-2.5)*15-Math.abs(t.time-0.08)*150);
  const positioning=(verified?25:0)+(positioned?40:0)+(breath?20:0)+(patientReady?15:0);
  if(!verified)notes.push('กลับไปตรวจสอบตัวตนผู้ป่วยจำลองก่อนเริ่มงาน');
  if(!positioned)notes.push('ทบทวนการจัดท่าตามโจทย์');
  if(!collimated)notes.push('ปรับขอบเขตลำรังสีจำลองให้เหมาะกับบริเวณที่ศึกษา');
  if(!breath)notes.push('ทบทวนจังหวะการหายใจตามคำแนะนำ');
  if(t.grid && t.mas<2)notes.push('การเลือก Grid SIM ไม่สอดคล้องกับการตั้งค่า mAs SIM ในแบบฝึกนี้');
  if(t.aec)notes.push('AEC SIM เปิดอยู่: เปรียบเทียบผลกับการควบคุมแบบแมนนวล');
  notes.push(`โจทย์รอบนี้: ${activeCase.challenge}`);
  const total=Math.round(contrast*.28+coverage*.22+sharpness*.2+positioning*.3);
  return {total,contrast:Math.round(contrast),coverage:Math.round(coverage),sharpness:Math.round(sharpness),positioning:Math.round(positioning),notes};
}
export function makeSyntheticXray(score:Score, seed=1, caseId='chest-pa'):string {
  const quality=score.total/100;
  const noiseSeed=(seed*9301+49297)%233280;
  let noise=''; for(let i=0;i<48;i++){ const v=(Math.sin((i+noiseSeed)*12.9898)*43758.5453)%1; const x=(i*37)%300,y=(i*61)%390,r=1+Math.abs(v)*2.2; noise+=`<circle cx="${x}" cy="${y}" r="${r.toFixed(1)}" fill="#d9eaff" opacity="${(.08+Math.abs(v)*.15).toFixed(2)}"/>`; }
  const haze=(1-quality)*.5;
  const chestBones=`<g opacity=".76" fill="#d3e0fa" stroke="#e5edff" stroke-width="5"><path d="M142 30h16v285h-16z"/><path d="M148 59 C110 42 69 50 53 75 M152 59 C190 42 231 50 247 75" fill="none" stroke-width="8"/>${Array.from({length:9},(_,i)=>`<path d="M148 ${82+i*22} Q${75-i*2} ${65+i*19} 40 ${105+i*21}" fill="none" stroke-width="4"/><path d="M152 ${82+i*22} Q${225+i*2} ${65+i*19} 260 ${105+i*21}" fill="none" stroke-width="4"/>`).join('')}</g><g filter="url(#blur)"><ellipse cx="102" cy="176" rx="52" ry="94" fill="url(#lung)"/><ellipse cx="198" cy="176" rx="52" ry="94" fill="url(#lung)"/><path d="M149 160 C125 177 125 238 158 252 C181 263 188 226 175 204 C166 188 170 171 149 160" fill="#b5c9eb" opacity=".76"/></g><path d="M47 306 Q150 282 253 306 L260 325 Q150 340 40 325z" fill="#b6c9eb" opacity=".8"/>`;
  const lateralChest=`<g opacity=".78" fill="#d3e0fa" stroke="#e5edff" stroke-width="5"><path d="M139 28h20v294h-20z"/><path d="M142 55 C90 45 54 87 61 157 M158 55 C210 45 246 87 239 157" fill="none" stroke-width="8"/>${Array.from({length:9},(_,i)=>`<path d="M146 ${78+i*23} Q90 ${62+i*22} 69 ${108+i*21}" fill="none" stroke-width="4"/>`).join('')}</g><g filter="url(#blur)"><ellipse cx="125" cy="178" rx="64" ry="100" fill="url(#lung)"/><ellipse cx="188" cy="183" rx="40" ry="93" fill="url(#lung)"/><path d="M142 154 C120 193 138 253 179 258 C207 257 204 217 184 196 C164 176 166 160 142 154" fill="#b5c9eb" opacity=".7"/></g>`;
  const handBones=`<g fill="none" stroke="#e1e9fa" stroke-linecap="round" stroke-linejoin="round"><path d="M126 299 Q116 240 109 190 M142 298 Q137 232 136 174 M158 299 Q160 235 162 177 M174 299 Q183 245 188 201" stroke-width="13"/><path d="M108 191 Q96 161 92 126 Q90 111 99 108 Q107 105 111 123 L121 159 L121 94 Q121 77 131 77 Q141 77 141 95 L143 153 L149 82 Q151 66 161 69 Q172 72 169 91 L163 157 L178 98 Q183 81 193 86 Q204 91 198 108 L185 172 Q178 204 172 232" stroke-width="9"/><path d="M121 277 Q150 256 179 277" stroke-width="18"/></g>`;
  const wristBones=`<g fill="none" stroke="#e1e9fa" stroke-linecap="round"><path d="M111 66 L125 235 M187 66 L174 235" stroke-width="19"/><path d="M124 224 Q149 211 176 224" stroke-width="12"/><path d="M128 240l-8 22m20-25-2 27m20-25 4 24m14-27 9 20" stroke-width="9"/><path d="M125 274 Q151 263 178 276" stroke-width="10"/></g>`;
  const kneeBones=`<g fill="none" stroke="#e1e9fa" stroke-linecap="round"><path d="M126 42 L132 164 M174 42 L168 164" stroke-width="23"/><path d="M130 148 Q149 127 170 148 Q184 166 168 189 Q148 207 130 189 Q116 167 130 148z" fill="#c6d5ee" stroke-width="7"/><path d="M137 194 L123 336 M163 194 L178 336" stroke-width="22"/><path d="M151 197 L150 313" stroke-width="12"/></g>`;
  const anatomy=caseId==='chest-lateral'?lateralChest:caseId==='hand-pa'?handBones:caseId==='wrist-pa'?wristBones:caseId==='knee-ap'?kneeBones:chestBones;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 390"><defs><linearGradient id="bg" x2="0" y2="1"><stop stop-color="#091733"/><stop offset=".5" stop-color="#253f69"/><stop offset="1" stop-color="#101c3a"/></linearGradient><radialGradient id="lung"><stop stop-color="#07142d"/><stop offset=".68" stop-color="#16294a"/><stop offset="1" stop-color="#8ca8d0"/></radialGradient><filter id="blur"><feGaussianBlur stdDeviation="${(1+haze*4).toFixed(1)}"/></filter></defs><rect width="300" height="390" fill="url(#bg)"/><g filter="url(#blur)">${anatomy}</g>${noise}<rect width="300" height="390" fill="#b9d7ff" opacity="${haze.toFixed(2)}"/><text x="12" y="375" fill="#d9e6ff" font-size="9" opacity=".62">SIMULATED TRAINING IMAGE · NOT DIAGNOSTIC</text></svg>`;
}
