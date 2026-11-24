/** Shared data catalog for the single-player RPG systems. Rewards are always granted by game code. */
export interface ItemInfo {id:string;name:string;icon:string;rarity:'common'|'uncommon'|'rare'|'epic'|'legendary';category:'quest'|'material'|'tool'|'cosmetic'|'note';description:string;source:string;price?:number;slot?:'accessory'|'tool';}
export const ITEMS:ItemInfo[]=[
  {id:'student-badge',name:'บัตรนักศึกษา',icon:'🎖️',rarity:'common',category:'quest',description:'บัตรผ่านประจำ Radiant Academy',source:'รางวัลเควสต์ First Exposure'},
  {id:'anatomy-notebook',name:'สมุดกายวิภาค',icon:'📘',rarity:'common',category:'note',description:'รวมบันทึกที่ปลดล็อกจากเคสและการสำรวจ',source:'พี่มายา · เควสต์แรก'},
  {id:'image-fragment',name:'Image Fragment',icon:'✧',rarity:'uncommon',category:'material',description:'ชิ้นส่วนข้อมูลภาพที่หายไป ใช้ปลดล็อกงานวิจัย',source:'Noise Lab และเควสต์เนื้อเรื่อง'},
  {id:'noise-crystal',name:'Noise Crystal',icon:'◆',rarity:'uncommon',category:'material',description:'ผลึกจำลองสำหรับปลดล็อกทักษะตรวจ noise',source:'Noise Slime'},
  {id:'phantom-dust',name:'Phantom Dust',icon:'☄',rarity:'rare',category:'material',description:'เศษภาพซ้อนจากสิ่งมีชีวิตเงา',source:'Motion Phantom · ยังไม่เปิดดันเจียน'},
  {id:'anatomy-crystal',name:'Anatomy Crystal',icon:'⬡',rarity:'uncommon',category:'material',description:'บันทึกโครงสร้างกายวิภาคที่ค้นพบ',source:'เคสฝึกและ collection'},
  {id:'grid-component',name:'Grid Component',icon:'▦',rarity:'rare',category:'material',description:'ชิ้นส่วนอุปกรณ์ฝึกสำหรับสาย Imaging Engineer',source:'เควสต์อุปกรณ์'},
  {id:'artifact-shard',name:'Artifact Shard',icon:'◈',rarity:'epic',category:'material',description:'ข้อมูลผิดปกติที่ยังต้องวิเคราะห์',source:'Phantom Archive · ยังไม่เปิดดันเจียน'},
  {id:'medical-supply',name:'ชุดอุปกรณ์ฝึก',icon:'🧰',rarity:'common',category:'tool',description:'ฟื้นพลังในเกมจำลอง 25 HP',source:'ร้าน Nora',price:60},
  {id:'pixel-coat',name:'เสื้อกาวน์นักศึกษา',icon:'🥼',rarity:'uncommon',category:'cosmetic',description:'เสื้อคลุมตกแต่งโปรไฟล์ ไม่มีผลต่อคะแนน',source:'ร้าน Nora',price:180,slot:'accessory'},
  {id:'basic-scanner',name:'Training Scanner',icon:'📡',rarity:'uncommon',category:'tool',description:'อุปกรณ์ฝึกที่ใช้เปิด Anatomy Scan ได้',source:'คราฟต์จากสมุด + Anatomy Crystal',slot:'tool'},
  {id:'noise-detector',name:'Noise Detector',icon:'🔎',rarity:'rare',category:'tool',description:'เปิดคำใบ้ Noise Detection ระหว่าง encounter',source:'คราฟต์จาก Noise Crystal + Image Fragment',slot:'tool'},
  {id:'anatomy-lens',name:'Anatomy Lens',icon:'🔬',rarity:'rare',category:'tool',description:'อุปกรณ์ collection สำหรับทักษะ Anatomy Recognition',source:'Workbench · ยังล็อกด้วยวัตถุดิบพื้นที่ถัดไป',slot:'tool'},
  {id:'phantom-sensor',name:'Phantom Sensor',icon:'📟',rarity:'epic',category:'tool',description:'อ่านสัญญาณภาพซ้อนในภารกิจขั้นสูง',source:'Workbench · Motion Phantom',slot:'tool'},
  {id:'radiant-accessory',name:'Radiant Pin',icon:'📍',rarity:'legendary',category:'cosmetic',description:'เครื่องประดับสะสมจากเนื้อเรื่องช่วงท้าย ไม่มีผลต่อคะแนน',source:'Radiant Core · Endgame',slot:'accessory'},
  {id:'radiant-core',name:'Radiant Core',icon:'✹',rarity:'legendary',category:'quest',description:'หัวใจข้อมูลของบทสุดท้าย',source:'บทที่ 5 · ยังไม่เปิด'},
];

export interface SkillInfo {id:string;name:string;tree:string;icon:string;description:string;cost:number;level:number;requires:string[];effect:string;}
export const SKILLS:SkillInfo[]=[
  {id:'positioning-insight',name:'Positioning Insight',tree:'Projection Specialist',icon:'⌖',description:'แสดงเส้นกึ่งกลางและคำใบ้เพิ่มในมินิเกมจัดท่า',cost:1,level:1,requires:[],effect:'เพิ่ม overlay ช่วยจัดกึ่งกลาง'},
  {id:'center-guide',name:'Center Point Guide',tree:'Projection Specialist',icon:'⊕',description:'แสดงจุดกึ่งกลางในหน้าจัดท่าผู้ป่วย',cost:1,level:2,requires:['positioning-insight'],effect:'เปิด center guide'},
  {id:'anatomy-scan',name:'Anatomy Scan',tree:'Image Analyst',icon:'⌁',description:'เพิ่มชั้นไฮไลต์กายวิภาคบนภาพสังเคราะห์',cost:1,level:1,requires:[],effect:'กดสแกนเพื่อดู anatomy overlay'},
  {id:'noise-detection',name:'Noise Detection',tree:'Image Analyst',icon:'✧',description:'แสดง noise overlay ในภาพทบทวนและศัตรู Noise Slime',cost:1,level:2,requires:['anatomy-scan'],effect:'เปิด noise scan'},
  {id:'photon-sense',name:'Photon Sense',tree:'Imaging Engineer',icon:'☼',description:'อธิบายแนวโน้ม contrast จากตัวแปรจำลอง',cost:1,level:1,requires:[],effect:'เพิ่มคำอธิบาย contrast'},
  {id:'detector-awareness',name:'Detector Awareness',tree:'Imaging Engineer',icon:'▤',description:'ปลดล็อกคำใบ้ detector ในเคสฝึก',cost:1,level:2,requires:['photon-sense'],effect:'เปิด detector reference'},
  {id:'patient-communication',name:'Patient Communication',tree:'Clinical Explorer',icon:'♡',description:'เพิ่มบทสนทนาการเตรียมผู้ป่วยจำลอง',cost:1,level:1,requires:[],effect:'ปลดล็อกบทสนทนาเตรียมตรวจ'},
  {id:'calm-focus',name:'Calm Focus',tree:'Clinical Explorer',icon:'◉',description:'เพิ่มหน้าต่างเวลามินิเกมจับจังหวะ 180 ms',cost:1,level:2,requires:['patient-communication'],effect:'ช่วงจับจังหวะกว้างขึ้น'},
  {id:'collimation-focus',name:'Collimation Focus',tree:'Projection Specialist',icon:'▣',description:'แสดงกรอบ field guide ในมินิเกม collimation',cost:1,level:3,requires:['center-guide'],effect:'เปิดกรอบแนะแนว field'},
  {id:'projection-mastery',name:'Projection Mastery',tree:'Projection Specialist',icon:'✧',description:'ปลดล็อกเคส projection เพิ่มและบันทึก collection',cost:2,level:5,requires:['collimation-focus'],effect:'เพิ่ม projection challenge'},
  {id:'anatomy-recognition',name:'Anatomy Recognition',tree:'Image Analyst',icon:'◉',description:'เพิ่ม label กายวิภาคใน review mode',cost:1,level:3,requires:['anatomy-scan'],effect:'เปิด anatomy labels'},
  {id:'motion-detection',name:'Motion Detection',tree:'Image Analyst',icon:'≈',description:'เผยคำใบ้ภาพซ้อนใน encounter Motion Phantom',cost:1,level:4,requires:['noise-detection'],effect:'เปิด motion hint'},
  {id:'image-critique',name:'Image Critique',tree:'Image Analyst',icon:'▤',description:'บันทึกหมวดคุณภาพที่ควรทบทวนลง collection',cost:1,level:5,requires:['anatomy-recognition'],effect:'เพิ่ม critique checklist'},
  {id:'diagnostic-challenge',name:'Diagnostic Challenge',tree:'Image Analyst',icon:'⌕',description:'ปลดล็อกชุดคำถามวิเคราะห์ภาพขั้นสูงแบบเกม',cost:2,level:7,requires:['image-critique','motion-detection'],effect:'ปลดล็อก advanced review'},
  {id:'exposure-calculator',name:'Exposure Calculator',tree:'Imaging Engineer',icon:'∑',description:'แสดงความสัมพันธ์ mA × time ใน panel ฝึก',cost:1,level:3,requires:['photon-sense'],effect:'เปิด mAs equation'},
  {id:'technique-insight',name:'Technique Insight',tree:'Imaging Engineer',icon:'⚙',description:'เพิ่มคำใบ้ผลของค่าจำลองในเครื่องมือฝึก',cost:1,level:4,requires:['detector-awareness'],effect:'แสดง simulated technique hint'},
  {id:'image-optimization',name:'Image Optimization',tree:'Imaging Engineer',icon:'✦',description:'เปิดคำอธิบายเทียบคุณภาพหลายหมวด',cost:2,level:6,requires:['technique-insight'],effect:'เพิ่ม comparative review'},
  {id:'critical-thinking',name:'Critical Thinking',tree:'Clinical Explorer',icon:'◇',description:'ให้ลองวิเคราะห์คำตอบอีกครั้งโดยไม่เสีย HP เกม',cost:1,level:3,requires:['patient-communication'],effect:'ยกเลิกการหัก HP เกมเมื่อตอบพลาด'},
  {id:'protocol-memory',name:'Protocol Memory',tree:'Clinical Explorer',icon:'▧',description:'เปิดบันทึกอ้างอิง SIM ในหน้าทบทวน',cost:1,level:4,requires:['calm-focus'],effect:'เปิด reference note'},
  {id:'fast-workflow',name:'Fast Workflow',tree:'Clinical Explorer',icon:'➜',description:'ข้ามคำอธิบายเริ่มต้นของเคสที่ผ่านแล้ว',cost:2,level:6,requires:['protocol-memory'],effect:'เล่นเคสซ้ำแบบย่อ'},
];

export interface QuestInfo {id:string;name:string;type:'side'|'training'|'hidden';giver:string;description:string;objective:string;rewardXp:number;rewardCoins:number;rewardItem?:string;}
export const SIDE_QUESTS:QuestInfo[]=[
  {id:'library-notes',name:'บันทึกจากห้องสมุด',type:'side',giver:'Luna · Librarian',description:'ช่วยจัดทำบันทึกกายวิภาคจากเคสที่ผ่าน',objective:'ผ่านเคสฝึก 1 เคส',rewardXp:35,rewardCoins:45,rewardItem:'anatomy-crystal'},
  {id:'equipment-check',name:'ตรวจเช็กอุปกรณ์',type:'training',giver:'Nora · Equipment Engineer',description:'เรียนรู้ตำแหน่งอุปกรณ์และเตรียมโต๊ะฝึก',objective:'เก็บ Training Scanner จากร้านหรือคราฟต์',rewardXp:30,rewardCoins:35,rewardItem:'grid-component'},
  {id:'garden-cache',name:'กล่องที่สวนด้านข้าง',type:'hidden',giver:'สำรวจเอง',description:'มีใครซ่อนกล่องฝึกไว้ใกล้สวนหรือเปล่านะ',objective:'ค้นพบจุดลับที่สวนของ Academy',rewardXp:25,rewardCoins:25,rewardItem:'image-fragment'},
];

export const DAILY_QUEST:QuestInfo={id:'daily-case-review',name:'ทบทวนภาพประจำวัน',type:'training',giver:'Quest Board',description:'ทำเคสจำลองหนึ่งเคสและดู feedback ให้ครบ',objective:'จบเคสฝึก 1 เคสวันนี้',rewardXp:20,rewardCoins:30,rewardItem:'medical-supply'};
export const ZONES=[
  {id:'academy',name:'Radiant Academy',icon:'🏥',status:'open',level:'Lv.1+',description:'ล็อบบี้ ห้องสมุด สวน และแผนกรังสี'},
  {id:'noise-lab',name:'Lost Imaging Lab',icon:'🧪',status:'quest',level:'Lv.2+',description:'ดันเจียนแรก · Noise Slime และ Noise King'},
  {id:'positioning-maze',name:'Positioning Maze',icon:'🧭',status:'planned',level:'Lv.5+',description:'กำลังทำเนื้อหาในเฟสถัดไป'},
  {id:'crystal-cave',name:'Crystal Anatomy Cave',icon:'💎',status:'planned',level:'Lv.5+',description:'ด่านสำรวจกายวิภาคและ collection'},
  {id:'neon-city',name:'Neon Medical City',icon:'🌃',status:'planned',level:'Lv.10+',description:'ศูนย์ภาพขั้นสูงและวิจัย'},
  {id:'phantom-archive',name:'Phantom Archive',icon:'🌌',status:'planned',level:'Lv.15+',description:'พื้นที่เนื้อเรื่องช่วงท้าย'},
];

export interface RecipeInfo {id:string;name:string;icon:string;needs:Record<string,number>;description:string;}
export const RECIPES:RecipeInfo[]=[
  {id:'basic-scanner',name:'Training Scanner',icon:'📡',needs:{'anatomy-notebook':1,'anatomy-crystal':1},description:'อุปกรณ์สแกนกายวิภาคสำหรับการฝึก'},
  {id:'noise-detector',name:'Noise Detector',icon:'🔎',needs:{'noise-crystal':2,'image-fragment':1},description:'อุปกรณ์เรียนรู้การตรวจ noise'},
  {id:'anatomy-lens',name:'Anatomy Lens',icon:'🔬',needs:{'anatomy-crystal':3,'image-fragment':1},description:'เลนส์สำหรับ collection กายวิภาค'},
  {id:'phantom-sensor',name:'Phantom Sensor',icon:'📟',needs:{'phantom-dust':2,'grid-component':1},description:'เซนเซอร์วิเคราะห์สัญญาณภาพซ้อน'},
  {id:'radiant-accessory',name:'Radiant Pin',icon:'📍',needs:{'artifact-shard':3,'radiant-core':1},description:'ของสะสมปลายเนื้อเรื่อง'},
];

export const MONSTERS=[
  {id:'noise-slime',name:'Noise Slime',level:'1–5',focus:'Image Noise',drop:'Noise Crystal'},
  {id:'motion-phantom',name:'Motion Phantom',level:'5–10',focus:'Motion Blur',drop:'Phantom Dust'},
  {id:'anatomy-mimic',name:'Anatomy Mimic',level:'10–15',focus:'Anatomy Recognition',drop:'Anatomy Crystal'},
  {id:'grid-crawler',name:'Grid Crawler',level:'15–20',focus:'Grid and Scatter',drop:'Grid Component'},
  {id:'artifact-eye',name:'Artifact Eye',level:'20–25',focus:'Image Artifacts',drop:'Artifact Shard'},
  {id:'phantom-protocol',name:'Phantom Protocol',level:'Endgame',focus:'Image Quality Analysis',drop:'Radiant Core'},
];

export const QUEST_MILESTONES=[
  {id:'first-exposure',name:'The First Exposure',description:'เริ่มวันแรกที่ Radiant Academy',at:0},
  {id:'lost-images',name:'The Lost Images',description:'เริ่มสืบเรื่อง Image Fragment ที่หายไป',at:1},
  {id:'noise-lab',name:'Noise in the Lab',description:'เคลียร์ Noise Laboratory',at:2},
];

/** Five-chapter narrative plan. Only chapters 1–2 are playable in this build. */
export const STORY_CHAPTERS=[
  {id:1,title:'THE FIRST EXPOSURE',mentor:'Maya',summary:'เริ่มเวรที่ Radiant Academy เรียนรู้ workflow และส่งเคสแรกให้ Dr. Elias',gate:'เริ่มได้ทันที',playable:true},
  {id:2,title:'THE LOST IMAGES',mentor:'Elias · Nora · Luna',summary:'ตามรอย Image Fragments ที่หายไป ผ่านบทฝึก Noise และ Detector ใน Lost Imaging Lab',gate:'จบ First Exposure',playable:true},
  {id:3,title:'ANATOMY AWAKENING',mentor:'Luna · Kai',summary:'ตามสัญญาณโครงสร้างจำลองสู่ Crystal Anatomy Cave และเผชิญ The Rotator',gate:'ขยายหลัง Noise Lab',playable:false},
  {id:4,title:'THE PHANTOM PROTOCOL',mentor:'Nora · Elias',summary:'ค้นหาต้นตอของภาพสังเคราะห์ผิดปกติใน Phantom Archive',gate:'พื้นที่เนื้อเรื่องในอนาคต',playable:false},
  {id:5,title:'THE RADIANT CORE',mentor:'ทีม Radiant Academy',summary:'รวมทักษะจากทุกบทเพื่อหยุด Phantom Protocol ในการเผชิญหน้าหลายช่วง',gate:'พื้นที่เนื้อเรื่องในอนาคต',playable:false},
];

export const ENCOUNTER_QUESTIONS=[
  {question:'Noise ในภาพฝึกสัมพันธ์กับสิ่งใดมากที่สุด?',choices:['ความแปรปรวน/เม็ดรบกวนในภาพ','ตัวผู้ป่วยเคลื่อนไหวเท่านั้น','ตำแหน่งป้ายชื่อ'],answer:0,topic:'noise',feedback:'Noise คือความแปรปรวนที่บดบังรายละเอียดของภาพ ในเกมนี้เป็นแนวคิดเพื่อการเรียนรู้'},
  {question:'ก่อนประเมินภาพฝึก ควรเริ่มจากอะไร?',choices:['ดูโจทย์และ checklist ของเคส','เพิ่มเหรียญในกระเป๋า','สุ่มเลือกท่า'],answer:0,topic:'workflow',feedback:'เริ่มจากโจทย์และ checklist แล้วค่อยประเมินภาพตามบริบทการฝึก'},
  {question:'ภาพซ้อนของขอบโครงสร้างในโจทย์นี้ชวนให้ตรวจปัจจัยใดก่อน?',choices:['การเคลื่อนไหวระหว่างแบบจำลอง','สีเสื้อของผู้ป่วย','จำนวนเหรียญ'],answer:0,topic:'motion',feedback:'การเคลื่อนไหวเป็นหนึ่งในแนวคิดที่ใช้ทบทวนภาพซ้อนในแบบฝึกนี้'},
  {question:'ถ้าเห็นลายซ้ำผิดปกติในภาพสังเคราะห์ ควรทำอย่างไร?',choices:['บันทึกเป็นข้อสังเกตและทบทวนภาพ','ถือว่าเป็น anatomy ปกติทันที','ลบเคสออก'],answer:0,topic:'artifact',feedback:'สังเกตรูปแบบและบริบทก่อนจัดหมวดเป็น artifact ในเกม'},
];
