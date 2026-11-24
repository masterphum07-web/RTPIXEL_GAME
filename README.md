# RADTECH PIXEL — The X-Ray Chronicles

เกมฝึกเรียนรู้รังสีเทคนิคแบบ 2D pixel RPG ภาษาไทยเป็นหลัก ใช้ Phaser 3 + TypeScript + Vite โลกหลักเป็นโรงพยาบาลมุมมอง top-down และภารกิจถ่ายภาพทรวงอกเป็นฉาก side-view แยกต่างหาก

ดู [ROADMAP.md](ROADMAP.md) สำหรับแผนพัฒนาต่อแบบ MMORPG ตั้งแต่แก้ input, ขยายล็อบบี้/ร้านค้า/เควสต์, ทำท่าผู้ป่วย ไปจนถึงระบบออนไลน์
ดู [AUDIT_REPORT.md](AUDIT_REPORT.md) สำหรับสถานะจริงแยก WORKING / INCOMPLETE / BROKEN / MISSING และผลตรวจ build/browser ล่าสุด
ดู [ART_REBUILD_REPORT.md](ART_REBUILD_REPORT.md) สำหรับ audit ภาพก่อนปรับ, character atlas ใหม่, การใช้ PixelFX และงานภาพที่ยังเหลือ

> สถานะ: playable single-player prototype มีโลกโรงพยาบาล ภารกิจแรก มินิเกมฝึก และระบบบันทึกในเครื่อง ยังไม่มี backend หรือ multiplayer

## สถานะตาม Master Development Prompt

| Phase | สถานะใน build นี้ |
|---|---|
| 1 · Visual upgrade | ปรับรอบนี้: เพิ่ม character atlas 6 บทบาท × 4 ทิศ × 4 เฟรมเดิน (เฟรมต้นฉบับ 32×48 พิกเซล), แทน canvas-วาดตัวละครเดิม โดยคงขนาดแสดงผล/hitbox เดิม; เพิ่ม PixelFX cyan acquisition burst หลังจบ X-ray |
| 2 · RPG systems | ทำแล้ว: XP/level/SP, 20-node skill tree, inventory, equipment, collection, shop, crafting, save migration and zone-specific player positions |
| 3 · Quest system | ทำแล้วใน vertical slice: main, side, daily, hidden-cache quests, rewards, relationship counters และ story journal 5 บท |
| 4 · Radiology gameplay | เล่นจบได้: Chest PA, patient verification, positioning/pose (พักแขน/ซ้าย/ขวา/ยกสองแขน), collimation, timing, synthetic image review, quality feedback |
| 5 · Combat | เล่นได้: Noise Slime, Motion Phantom, Noise King, HP, answer feedback, skill effects และ drops |
| 6 · Dungeon | มี Noise Laboratory หนึ่งด่านที่เข้า/ออกและสู้ได้ครบ; ด่านอื่นยังเป็นแผน ไม่แสดงเป็น playable |
| 7 · Story expansion | ระบบ chapter/relationship และบท 1–2 ต่อกับเควสต์/ดันเจียน; บท 3–5 และโซนต่อไปมี outline และเงื่อนไขล็อกไว้ |
| 8 · Multiplayer preparation | เพิ่ม typed contracts สำหรับ presence/party/co-op/leaderboard/transport; ยังไม่มีบัญชี, server หรือ online play |

งานต้นทางอยู่บน branch `main` ของ `masterphum07-web/RTPIXEL_GAME`; การอัปเดต branch ต้นทางไม่ใช่การ publish ไป GitHub Pages โดยอัตโนมัติ และรอบนี้ยังไม่ได้ deploy. Save ยังอยู่ใน localStorage ของ browser และไม่ได้ sync ข้ามอุปกรณ์.

## เริ่มเล่น

ต้องมี Node.js 20.19+ หรือ 22.12+ และ npm

```bash
npm ci
npm run dev
```

เปิด URL ที่ Vite แสดงในเทอร์มินัล เล่นด้วย **WASD / ปุ่มลูกศร** เพื่อเดิน และ **E** เพื่อคุยหรือโต้ตอบ บน iPad/จอสัมผัสใช้ **จอยสติ๊ก analog 360°** ทางซ้ายและปุ่ม **E** ทางขวา; แตะค้างแล้วลากเพื่อเดิน ปล่อยเพื่อหยุด

```bash
npm run build       # ตรวจ TypeScript และสร้าง production bundle ที่ dist/
npm run preview     # เปิดดู production build ในเครื่อง
```

การตรวจรอบนี้: `npm run build` ผ่านด้วย TypeScript และ Vite; Playwright ผ่าน full gameplay regression รวม X-ray, rewards, chapter, shop และ dungeon; เก็บภาพใหม่ที่ 1440×900 และ 1024×768 แล้วตรวจว่าไม่มี browser error ระหว่างเข้า mission. ก่อนหน้านี้มีการทดสอบ responsive ที่ 1920×1080, iPad จำลอง 1024×768 / 1180×820 / 1366×1024 และมือถือ 390×844; browser emulation ไม่ใช่เครื่อง iPad จริง. Vite เตือน JS bundle ใหญ่กว่า 500 kB; build ยังสำเร็จ.

## งานภาพและแหล่ง asset

พร็อพและฉากโรงพยาบาลเป็นงานต้นฉบับใน `scripts/draw-hospital-world.py`, `scripts/draw-hospital-props.py` และ `scripts/draw-hospital-people.py`; ตัวละครในโลกใช้ sprite sheet 96 เฟรมความละเอียด 4× แล้วลดแสดงผลให้ footprint ตรงกับฟิสิกส์เดิม ห้อง X-ray ใช้ art ที่แยกชั้นจาก `scripts/draw-xray-room.py`. งานวาดและ export ใช้ Astra Pixel Art; แผ่นเอฟเฟกต์ cyan หลังรับภาพมาจาก PixelFX `pickups/collect-burst` และปรับ palette ให้เข้ากับเกม. ไฟล์ runtime อยู่ใน `public/assets/`, master อยู่ใน `pixelart/exports/`, และขั้นตอนวาดอยู่ในสคริปต์/`pixelart/session.jsonl`. ภาพอ้างอิงใช้กำกับองค์ประกอบเท่านั้น. ดูที่มาและ license ใน [ASSET_CATALOG.md](ASSET_CATALOG.md) และ [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

### สกิลสำหรับ AI ที่ทำงานต่อ

สกิลโปรเจกต์ติดตั้งไว้ใน `.agents/skills/`: Phaser 2D, sprite pipeline, game UI, web-game foundations, game playtest และ game-studio จาก [OpenAI Plugins](https://github.com/openai/plugins/tree/main/plugins/game-studio/skills) พร้อม `radtech-pixel-art-direction` ที่เพิ่มกติกาภาพเฉพาะเกมนี้ แต่ละโฟลเดอร์มี `SKILL.md` ให้อ่านก่อนทำงาน สกิลเหล่านี้เป็นแนวทางสำหรับเอเจนต์ ไม่ใช่ dependencies ของ runtime เกม

ดู [ART_DIRECTION.md](ART_DIRECTION.md), [ASSET_CATALOG.md](ASSET_CATALOG.md) และ [AUDIT_REPORT.md](AUDIT_REPORT.md) ก่อนทำงานต่อ

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
    network/  Typed future-server contracts; no multiplayer client/server
  ui/         HUD, dialogs, quest, mission UI and responsive pixel-game styling
  main.ts     Phaser/Vite entry point
public/
  assets/     Original pixel portraits, detailed hub art and PixelFX effect/license notices
  sw.js       Offline app-shell service worker (versioned during build)
```

- `src/game/hospital-scene.ts`: tile-based courtyard, camera, Arcade collisions, NPCs, keyboard and touch interaction.
- Character atlas uses 128×192 source cells (32×48 authored pixels at 4×) scaled to the same 19.2×28.8 world footprint and collision body as before; the 96 frames cover six roles, four facings, and four walk poses. `hospital-world.png` is original 1024×576 pixel art (2× world size) rendered behind the collision map; 96×96 portraits are layered PNG art.
- `src/game/room-scene.ts`: original pixel-art X-ray room scene.
- `src/ui/app.ts`: quest state, dialogue, case mini-games, scoring and local saves.
- `src/game/cases.ts` / `simulation.ts`: fictional case descriptions and deterministic game scoring/image generation.
- `src/game/content.ts` / `progression.ts`: data catalog, 20 skills, quests, story chapters, item drops and schema-5 local save migration.
- `src/game/dungeon-scene.ts`: single-player Lost Imaging Lab, authored movement/collision and knowledge encounters.
- `src/game/network/contracts.ts`: type-only boundary for future presence/party/co-op/leaderboard transport; no real online connection.
- `scripts/draw-pixel-portraits.py`, `scripts/draw-hospital-world.py`, `scripts/draw-hospital-people.py` and `scripts/draw-xray-room.py`: reproducible artwork scripts for the Astra Pixel Art skill; editable exports/state are under `pixelart/exports/`.

## การบันทึก

ใช้ `localStorage` key `radtech-pixel-profile` (schema 5) เก็บ XP, เหรียญ, เคสที่ผ่าน, คะแนน, inventory/equipment/skills, quests, chapter, relationships, dungeon progress, collections, current zone และตำแหน่งแยกตามโซน อยู่ในเบราว์เซอร์ของผู้เล่นเท่านั้น ล้างได้จากเมนูบันทึกการฝึก ปุ่มเริ่มใหม่จะลบข้อมูลเกมใน browser origin ปัจจุบัน

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
| `pixelfx` | [patch-gg/pixelfx](https://github.com/patch-gg/pixelfx), `skills/pixelfx` | ใช้ confetti และ `collect-burst` ที่ปรับเป็น cyan สำหรับผลรับภาพ X-ray; MIT, ดู notices ใน repo |
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

PixelFX confetti และ `pickups/collect-burst` ที่ recolor palette เป็น cyan แจกจ่ายภายใต้ MIT. รายละเอียด license/attribution: [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md), `public/assets/pixelfx-LICENSE.txt`, `public/assets/pixelfx-NOTICE.md`. ภาพพอร์ตเทรตและสไปรต์ตัวละครหลักเป็นภาพต้นฉบับจาก Astra Pixel Art; สคริปต์วาดและ master อยู่ใต้ `scripts/` และ `pixelart/exports/`. ฉากและตัวละครไม่ได้ดึงจากเกมอื่นหรือใช้ภาพ reference เป็น asset.
