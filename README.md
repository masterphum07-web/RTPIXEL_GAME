# RADTECH PIXEL — The X-Ray Chronicles

เกมฝึกเรียนรู้รังสีเทคนิคแบบ 2D pixel RPG ภาษาไทยเป็นหลัก ใช้ Phaser 3 + TypeScript + Vite โลกหลักเป็นโรงพยาบาลมุมมอง top-down และภารกิจถ่ายภาพทรวงอกเป็นฉาก side-view แยกต่างหาก

> สถานะ: playable vertical slice สำหรับ Phase 1–5 มีโลกโรงพยาบาล ภารกิจแรก มินิเกมฝึก และระบบบันทึกในเครื่อง งานนี้ยังเป็นต้นแบบที่ต่อยอดได้ ไม่ใช่เกมเชิงพาณิชย์ที่ผ่านการรับรอง

## เริ่มเล่น

ต้องมี Node.js 20.19+ หรือ 22.12+ และ npm

```bash
npm ci
npm run dev
```

เปิด URL ที่ Vite แสดงในเทอร์มินัล เล่นด้วย **WASD / ปุ่มลูกศร** เพื่อเดิน และ **E** เพื่อคุยหรือโต้ตอบ ปุ่มทิศทางกับปุ่ม E บนหน้าจอใช้กับจอสัมผัสได้ด้วย

```bash
npm run build       # ตรวจ TypeScript และสร้าง production bundle ที่ dist/
npm run preview     # เปิดดู production build ในเครื่อง
```

การตรวจล่าสุด: `npm run build` ผ่านด้วย TypeScript และ Vite; เล่น flow mentor → reception → radiology → ภาพ/คะแนน → radiologist จนครบ โดย quest HUD แสดงขั้นกลับไปสรุปก่อนและเปลี่ยนเป็นสำเร็จหลังคุยแพทย์, XP/เหรียญ/เคส/questStep ถูกเซฟ. Playwright ตรวจ viewport 1440×900 และ 390×844: ภาพ portrait โหลดครบ, ฉากบนมือถือรักษาสัดส่วนและซูมแบบ crop ด้านข้าง, ไม่มี console error หรือ request ล้มเหลว. bundle มี Phaser รวมอยู่และ Vite แจ้งเตือนขนาด JS chunk มากกว่า 500 kB (ยังสร้างไฟล์ได้ตามปกติ)

## วงจรเกมที่ทำงานได้

1. คุยกับพี่มายาและรับเควสต์ First Day
2. เดินไปคุยกับ Reception เพื่อรับใบส่งตรวจจำลอง
3. เดินไปประตู RADIOLOGY แล้วเริ่ม Chest PA
4. ตรวจผู้ป่วยจำลอง จัดท่า และเลือก collimation
5. ปรับค่าจำลอง ทดลองกด exposure ให้ตรงจังหวะ แล้วดูภาพ X-ray สังเคราะห์กับคะแนน
6. กลับล็อบบี้ คุยกับนักรังสีแพทย์เพื่อสรุปภารกิจ รับ XP และเหรียญ

ระบบเสริม: Case Files ที่ปลดล็อกตามลำดับ, แผงทักษะที่ปลดล็อกตาม XP/ความคืบหน้า, มุมเรียนรู้, แบบทดสอบ, บันทึกคะแนน/ภารกิจ, เอฟเฟกต์ฉลองด้วย PixelFX, responsive controls, manifest และ service worker สำหรับ app shell

### ขอบเขตด้านการเรียนรู้และความปลอดภัย

ภาพ ผู้ป่วย คะแนน และค่าตัวเลขในเกมสร้างขึ้นเพื่อการเรียนรู้และความบันเทิงเท่านั้น ไม่ใช่ภาพวินิจฉัย ไม่ใช่ protocol ไม่ใช่คำแนะนำทางการแพทย์ และห้ามใช้กำหนดค่ากับผู้ป่วยจริง เกมไม่ส่งข้อมูลไป backend และไม่ต้องใช้ API key สำหรับตัวเกม

## โครงสร้างโปรเจกต์

```text
src/
  game/       Phaser scenes, cases, scoring and synthetic X-ray generation
  ui/         HUD, dialogs, quest, mission UI and responsive pixel-game styling
  main.ts     Phaser/Vite entry point
public/
  assets/     Original pixel portraits, detailed hub art and PixelFX effect/license notices
  sw.js       Offline app-shell service worker (versioned during build)
```

- `src/game/hospital-scene.ts`: tile-based courtyard, camera, Arcade collisions, NPCs, keyboard and touch interaction.
- Character atlas uses 64×96 source frames scaled to the original 16×24 world footprint, with shaded hair/skin, distinct outfits, fine facial/uniform pixels and alternating walk frames. `hospital-world.png` is original 1024×576 pixel art (2× world size) rendered behind the collision map; 96×96 portraits are layered PNG art.
- `src/game/room-scene.ts`: original pixel-art X-ray room scene.
- `src/ui/app.ts`: quest state, dialogue, case mini-games, scoring and local saves.
- `src/game/cases.ts` / `simulation.ts`: fictional case descriptions and deterministic game scoring/image generation.
- `scripts/draw-pixel-portraits.py` and `scripts/draw-hospital-world.py`: reproducible artwork scripts for the Astra Pixel Art skill; editable exports/state are under `pixelart/exports/`.

## การบันทึก

ใช้ `localStorage` key `radtech-pixel-profile` (schema 3) เก็บ XP, เหรียญ, เคสที่ผ่าน, คะแนนสูงสุด และความคืบหน้าเควสต์ อยู่ในเบราว์เซอร์ของผู้เล่นเท่านั้น ล้างได้จากเมนูบันทึกการฝึก ปุ่มเริ่มใหม่จะลบข้อมูลเกมใน browser origin ปัจจุบัน

## GitHub Pages

หน้า GitHub Pages ใช้ branch `gh-pages` ที่ root ซึ่งเก็บไฟล์ production จาก `dist/` ส่วน source code อยู่ branch `main` การ publish รอบแรกทำจากเครื่องที่มีสิทธิ์เขียน repo:

```powershell
$env:GITHUB_ACTIONS = 'true'
$env:GITHUB_REPOSITORY = 'masterphum07-web/RTPIXEL_GAME'
npm run build
npx --yes gh-pages@6.3.0 -d dist -b gh-pages
```

การ push ไป `gh-pages` จะอัปเดตหน้าเว็บโดย GitHub Pages อัตโนมัติ หากตั้งค่า Pages ไว้ครั้งแรก ให้เลือก **Deploy from a branch → gh-pages → /(root)** ใน Settings → Pages ผู้รับช่วงต้อง build/publish อีกครั้งหลังแก้โค้ดบน `main` โปรเจกต์ไม่ต้องใช้ secret สำหรับ build หรือ publish

ไม่มี token, API key หรือ secret ใดต้องเพิ่มเพื่อ build/deploy เกมนี้

## AI handoff และสกิว

อ่าน [AGENTS.md](AGENTS.md) ก่อนแก้เกม โดยเอกสารนั้นมีแนวทางรักษาโครงเกม ลำดับเควสต์ การตรวจ build และรายการสกิวที่ควรใช้/ไม่ควรใช้

สกิวเป็นเครื่องมือของ Codex ในเครื่อง ไม่ใช่ dependency ของเกมและไม่ได้ถูกคัดลอกลง repo ทั้งหมด ตรวจว่ามีในเครื่องก่อนติดตั้งซ้ำ:

| สกิว | ที่มา/สถานะ | ใช้กับงานนี้ |
|---|---|---|
| `phaser-engineer` | `C:/Users/phumshop/.codex/skills/phaser-engineer` | ใช้ออกแบบ Phaser scenes, physics, input และ save schema |
| `pixelfx` | [patch-gg/pixelfx](https://github.com/patch-gg/pixelfx), `skills/pixelfx` | ใช้เอฟเฟกต์ confetti ในเกม; MIT, ดู notices ใน repo |
| `astra-pixel-art` | [Shanghaitech-DataTech/PixelSkill](https://github.com/Shanghaitech-DataTech/PixelSkill), `skills/astra-pixel-art` | ติดตั้งไว้ที่ `C:/Users/phumshop/.agents/skills/astra-pixel-art`; ใช้วาดภาพพอร์ตเทรต 96×96 แบบ layered PNG ด้วย Python มาตรฐาน (MIT) |
| `spritecast` | [Sunghwan0112/spritecast](https://github.com/Sunghwan0112/spritecast), `skills/spritecast` | มีในเครื่อง/ตรวจวิธีใช้แล้ว; ยังไม่สร้าง asset เพราะ pipeline สร้างภาพใช้ API แบบคิดค่าใช้จ่ายและไม่ได้จำเป็นกับงานโค้ดพิกเซลชุดนี้ |
| `img2threejs` | [img2threejs/img2threejs](https://github.com/img2threejs/img2threejs), repository root `SKILL.md` | มีในเครื่อง/ตรวจแล้ว; ไม่ใช้เพราะเกมนี้เป็น 2D pixel และไม่มีโมเดล 3D |
| `jev-system-one` | local Codex skill `C:/Users/phumshop/.codex/skills/jev-system-one` | ใช้ JEV จริงตัดสินใจลำดับภารกิจ/การควบคุม ดูบันทึกด้านล่าง |
| `playwright` | local Codex skill `C:/Users/phumshop/.codex/skills/playwright` | ใช้เปิดเกมใน browser, ตรวจปุ่ม/บทสนทนา และอ่าน console |
| `skill-installer` | bundled Codex skill `C:/Users/phumshop/.codex/skills/.system/skill-installer` | อ่านวิธีติดตั้งสกิวสำหรับ AI ผู้รับช่วง |
| `console-skill` | [Jakeschincariol/console-skill](https://github.com/Jakeschincariol/console-skill) | ไม่เกี่ยวกับเกมเว็บนี้; เป็นชุดสกิว reverse-engineer/port/mod เกม PS2 |

ติดตั้งสกิวจาก GitHub ใน Codex ที่รองรับด้วย installer ที่มีอยู่ในเครื่อง (อย่าคัดลอกสกิวลง dependency เกม):

```powershell
$installer = "$env:USERPROFILE\.codex\skills\.system\skill-installer\scripts\install-skill-from-github.py"
python $installer --repo patch-gg/pixelfx --path skills/pixelfx
python $installer --repo Shanghaitech-DataTech/PixelSkill --path skills/astra-pixel-art --dest "$env:USERPROFILE/.agents/skills"
python $installer --repo img2threejs/img2threejs --path . --name img2threejs
python $installer --repo Sunghwan0112/spritecast --path skills/spritecast
# Optional PS2-only toolset; not needed for this browser game:
python $installer --repo Jakeschincariol/console-skill --path console-anywhere console-backend console-controller console-graphics console-levels console-mod console-physics console-reverse console-saves console-sound console-tester
```

หากต้องการชุดสกิว console เฉพาะงาน PS2 ให้ติดตั้งเป็นรายสกิวจาก `Jakeschincariol/console-skill` path `console-anywhere`, `console-backend`, `console-controller`, `console-graphics`, `console-levels`, `console-mod`, `console-physics`, `console-reverse`, `console-saves`, `console-sound` และ `console-tester` สกิวเหล่านี้ไม่จำเป็นต่อ RADTECH PIXEL

`phaser-engineer`, `jev-system-one`, `playwright` และ `skill-installer` เป็นสกิว local/bundled ของเครื่อง Codex นี้ ไม่ใช่ GitHub repo ที่เกมควร vendor ลงมา ผู้รับช่วงควรเปิดสกิวเหล่านี้จาก Codex ของตน หรือใช้เอกสารนี้เป็นแนวทางหากไม่มี

### JEV record

JEV System One ถูกเรียกผ่าน TypeSafe SDK จริง รุ่น `jev-1.13.0`. การออกแบบ gameplay เลือก flow `walk-quest-to-room` (confidence 1.00), ทำเคสแรกให้ครบก่อน (confidence 1.00), และ hybrid d-pad + แตะจอบนแท็บเล็ต (confidence 0.68; probabilities 0.79 / 0.02 / 0.19), usage 866 input / 169 output tokens. การจัดลำดับภาพรอบนี้เลือก `characters-first` (confidence 1.00; probabilities 1 / 0 / 0), usage 544 input / 45 output tokens. ไม่มี request ID ในผลลัพธ์ทั้งสองครั้ง

JEV ใช้เป็นตัวช่วยตัดสินใจแบบ bounded choice เท่านั้น กฎเกม คะแนน การเซฟ และ input validation ยังคงเป็นโค้ด deterministic ห้ามใส่ JEV/API key ใน frontend, README, git หรือ log หาก AI คนต่อไปต้องเรียก JEV ให้ใช้ skill ในเครื่องและ secret ผ่าน environment ที่จัดการอย่างปลอดภัยเท่านั้น

## Credits

PixelFX confetti effect distributed under MIT. รายละเอียด license/attribution: [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md), `public/assets/pixelfx-LICENSE.txt`, `public/assets/pixelfx-NOTICE.md`. ภาพพอร์ตเทรต 96×96 เป็น PNG แบบ layered วาดด้วย Astra Pixel Art; สคริปต์วาดอยู่ใน `scripts/draw-pixel-portraits.py` และไฟล์แก้ไข/preview อยู่ใต้ `pixelart/exports/`. ฉากและตัวละครในเกมวาดด้วยโค้ด/SVG ของโปรเจกต์ ไม่ได้ดึงภาพจาก reference มาใช้เป็น asset.
