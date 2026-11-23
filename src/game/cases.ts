import type { CaseInfo } from './types';
export const CASES: CaseInfo[] = [
  { id:'chest-pa', title:'Chest PA', short:'CHEST · PA', view:'ยืนหันหน้าเข้ารับภาพ', objective:'ประเมินการจัดท่าและการเปิดรับรังสีจำลองของทรวงอก', anatomy:'ปอด · เงาหัวใจ · กระดูกซี่โครง', hint:'จัดไหล่ให้ผ่อนคลาย หายใจเข้าลึกและกลั้นหายใจตามคำแนะนำของผู้สอน', challenge:'แสดงปอดทั้งสองข้างและลดการหมุนของลำตัว', unlockedAt:0 },
  { id:'chest-lateral', title:'Chest Lateral', short:'CHEST · LAT', view:'ด้านข้าง', objective:'ฝึกจัดท่าด้านข้างและวางศูนย์กลางภาพ', anatomy:'ปอด · เงาหัวใจ · กระดูกสันหลัง', hint:'วางแขนพ้นแนวทรวงอกและรักษาท่าด้านข้างให้มั่นคง', challenge:'ให้ทรวงอกอยู่กึ่งกลางภาพ', unlockedAt:1 },
  { id:'hand-pa', title:'Hand PA', short:'HAND · PA', view:'ฝ่ามือวางบนแผ่นรับภาพ', objective:'ฝึกจัดนิ้วมือและข้อมือในภาพจำลอง', anatomy:'กระดูกฝ่ามือ · นิ้วมือ · ข้อมือ', hint:'วางนิ้วแยกเล็กน้อยและแนบมือกับแผ่นรับภาพ', challenge:'แสดงปลายนิ้วและข้อมือครบในภาพ', unlockedAt:2 },
  { id:'wrist-pa', title:'Wrist PA', short:'WRIST · PA', view:'ข้อมือวางตรง', objective:'ฝึกจัดแนวข้อมืออย่างสมมาตร', anatomy:'กระดูกข้อมือ · ปลาย radius/ulna', hint:'จัดข้อมือให้ตรงและอยู่ในขอบเขตภาพ', challenge:'จัดแนวข้อมือไว้กึ่งกลาง', unlockedAt:3 },
  { id:'knee-ap', title:'Knee AP', short:'KNEE · AP', view:'เข่าเหยียดในท่านอน', objective:'ฝึกจัดแนวข้อเข่าในภาพจำลอง', anatomy:'กระดูกต้นขา · ข้อเข่า · กระดูกหน้าแข้ง', hint:'จัดแนวขาให้ตรงตามโจทย์การฝึก', challenge:'ครอบคลุมข้อเข่าทั้งสองด้าน', unlockedAt:4 },
];
