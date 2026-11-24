# RADTECH PIXEL — Art Rebuild Checkpoint

Updated: 2026-11-25 · Character Stage A prototype

## Latest checkpoint — Character Art Rebuild Stage A

### 1. Current visual problems

- Player and multiple NPCs previously shared atlas rows; Player/Kai and Radiologist/Engineer were visually duplicated.
- Equipping the Player coat selected Radiologist row 5, changing the Player's face and hair.
- Existing sprites had little room for facial and fabric details; the Player HUD portrait showed a white coat while the world sprite wore blue scrubs.
- Dialogue used the Maya portrait for Reception.

### 2. Reference images reviewed

- Owner-supplied hospital and X-ray screenshots were treated as composition/style references only.
- Reviewed the SKIMA 48×80 sprite listing, Ameba 48×72 article, OpenGameArt 40×64 CC0 walk-cycle listing, and Pipoya CharaMEL atlas page. The reference assets were not downloaded into the game, traced or copied. Direct image fetches for the SKIMA/Ameba/itch previews were blocked or timed out, so comparison was based on the owner screenshots and the readable source-page descriptions.

### 3. Skills actually used

- `radtech-pixel-art-direction`: read project art bible; applied palette, crisp outlines, shadow, original-art and in-game QA rules.
- `sprite-pipeline`: read and applied fixed frame cells, shared baseline, four-facing strip layout and contact-sheet inspection. The prototype is procedural rather than image-generated; there was no paid generation step.
- `astra-pixel-art`: actually invoked to draw/export the Stage A sprite sheet and 12 portrait expressions from deterministic scripts.
- `phaser-engineer`: read and applied spritesheet frame mapping, preserved runtime footprint, and recalculated Arcade local size/offset so effective body dimensions remain the same.
- `game-playtest` + `playwright`: used headed Chromium for actual Phaser render, E interactions, console and responsive viewport screenshots.
- `jev-system-one`: made a live bounded choice call; see the JEV subsection below.
- `imagegen` / `spritecast`: not invoked. Stage A did not need a paid provider; no cost was authorized.

### 4–8. Artwork, dimensions, animation, portraits and integration

- Added `scripts/draw-character-prototypes.py`, creating a 4-row × 16-frame atlas: Player scrubs, Player coat, Maya and Reception. Each cell is 192×288 texture pixels / 48×72 logical pixels, four facings × four walk frames. The authored strip uses a shared foot baseline, shadow and head/hair identity per character.
- Phaser scale is `.1`; 192×288 source gives a 19.2×28.8 world-pixel frame. Arcade body size/offset changed from 68×74 at `.15` to 102×111 at `.1`, retaining the exact same effective 10.2×11.1 body and 4.5×15.6 offset.
- Added a named Stage A row map. Player scrubs and coat now select rows 0/1 from the same Player master; Maya and Reception select Stage A rows 2/3. Other five roles remain on the legacy atlas until the owner approves the visual direction.
- Rebuilt `scripts/draw-pixel-portraits.py` into layered Player/Maya/Reception artwork with smile/default, neutral, talk and concern variants (12 portrait files total). Player portrait now uses blue scrubs, and Reception dialogue selects her own talking portrait.
- X-ray patient and radiographer assets were not replaced in this gate. The X-ray room already uses its own sheet and remains a later consistency stage.

### 9–14. Screenshots, build, QA and Git

- Phaser screenshots: `output/playwright/character-after-1440x900.png`, `character-after-1024x768.png`, `character-after-844x390.png`, `character-after-390x844.png`, and `character-reception-dialogue.png`.
- Frame-size comparison: `output/playwright/character-size-comparison.png` uses the Player master downsampled to 32×48, 40×64 and 48×72 source cells at near-equal world footprint.
- The requested sizes were inspected at four responsive browser viewports. Keyboard E opened Maya and Reception dialogue; Reception portrait matched the nurse. The canvas and sprite sheet loaded. Browser console contained only the existing `/favicon.ico` 404; no Phaser error or character-asset load failure.
- `npm run build`: passed (TypeScript + Vite); Vite retained the existing >500 kB bundle warning.
- No collision/gameplay rule changed. The saved profile schema was not changed. The effective player/NPC physics body is mathematically preserved, but X-ray scene switching and a UI-acquired coat were not exercised in this pass.
- Git target: `art/character-rebuild`, source branch only; no merge or GitHub Pages deployment. Editable ASTRA JSON state for the 13 large new variant sheets is excluded from Git to avoid adding roughly 69 MB; deterministic drawing scripts, runtime PNGs and the project’s smaller base portrait states remain available.

### JEV — visual size and outfit decision

- Live TypeSafe SDK call, model `jev-1.14.0`; selected `48x72` (confidence `0.26`; probabilities: 32×48 `0.12`, 40×64 `0.37`, 48×72 `0.51`) and `separate-costume-frames` (confidence `1.00`). Usage: 733 input / 116 output tokens; no request ID returned.
- Frame-size confidence is low, so this is only a Stage A comparison candidate, not a final approval. It does not override the prompt's size comparison or owner approval gate.

## Previous art checkpoint

| Area | Before | This checkpoint | Still incomplete |
|---|---|---|---|
| Hospital characters | A canvas routine painted 96 tiny 64×96 source cells with rectangle clusters, then displayed them at 0.3 scale. At the 512×288 world size, faces/uniform marks had little room to read. | Replaced the runtime drawing routine with an authored 4× pixel atlas: 6 roles × 4 facings × 4 walk frames. Each source frame is 128×192 texture pixels (32×48 authored pixels) and displays at the same 19.2×28.8 world size. Existing body footprint and role/frame IDs remain compatible. | Run cycles still need more motion variation, and the hub cast still needs more role-specific silhouettes/portraits. |
| X-ray room people | Patient had two entrance frames, neutral, and a both-arms-raised pose; technologist was one static frame. | Expanded the original sheet to eight 88×112 frames: walk, rest, both arms raised, left arm raised, right arm raised, breathing idle and technologist. Added matching left/right/both/rest controls in the positioning mini-game. A cyan PixelFX `pickups/collect-burst` ring/glint plays when the exposure mission completes; it is a visual confirmation cue, not an emission beam or safety effect. | Turning, hold-breath, table-position and recovery animations remain. The current exercise accepts the prescribed both-arm pose for Chest PA and gives feedback for single-arm variants. |
| Equipment and rooms | Wall/floor is one art layer; multiple pieces of equipment share one transparent composite. | No art source change here; existing room and equipment assets still load in independent scene layers. | Split tube, detector, table, console and storage into their own interactive layers; add more floor/wall depth and materials. |
| Hospital outdoors | Existing original backdrop plus prop atlas; density and depth remain limited compared with reference. | Added layered leaf clusters to the tree canopy, broken water highlights to the fountain, and varied leaves/stone edging to flowerbeds in `scripts/draw-hospital-props.py`. All existing prop atlas frame bounds remain unchanged. | The hub still has broad quiet lawn areas and lacks the dense layered gardens/building detail of the target. Additional readable ground variation, depth-sorted props and interior locations remain future work. |

## Assets and implementation

- `scripts/draw-hospital-people.py` is the repeatable Astra Pixel Art source. Its exported runtime atlas is `public/assets/hospital-people.png` (2048×1152; about 70 KB). The 2× master is `pixelart/exports/hospital-people@2x.png` (4096×2304; about 202 KB). The 34.5 MB generated editing-state JSON is ignored by Git; source code and skill session remain available for regeneration.
- `src/game/hospital-scene.ts` now loads the atlas as 128×192 Phaser cells. Sprite scale `.15` and physics dimensions/offsets were doubled together so the on-screen actor size and collision footprint match the old `.3` sprite.
- `scripts/draw-xray-room.py` adds three arm-position variants; `src/game/room-scene.ts` selects the corresponding patient frame, and the positioning modal draws and labels those same poses.
- `public/assets/pixelfx-xray-acquisition.png` and `.json` are the cyan palette variant of PixelFX `pickups/collect-burst`. They load through the existing X-ray scene and animate at the source 30 fps only on mission completion. MIT license and notices are retained.
- The 2026-11-25 PixelFX `impacts/hit-spark` atlas is a cyan/blue one-shot for correct-answer feedback in Noise Lab; it plays after the result dialog closes. Runtime trigger was checked in Chromium.
- Regenerated `pixelart/exports/hospital-props.png`, `hospital-props@2x.png` and `public/assets/hospital-props.png` from the source using Astra Pixel Art. Phaser crop rectangles and 0.5 scale are unchanged.
- `HospitalScene` now draws trees at 0.62 scale, orders prop depth by root Y, orders the player by foot Y, and places small Arcade blockers at tree trunks. Keyboard movement was observed, but a direct teleport-based tree-collision check left the Arcade body stale and did not verify the new blockers.
- No paid asset API, new dependency or skill reinstall was used. The Astra and PixelFX skills were already installed locally.

## Verification

- `npm run build`: passed (TypeScript + Vite); Vite still notes the existing large JavaScript bundle.
- Re-audit 2026-11-25: headed Chromium verified the target-aware E button, locked X-ray prompt, seeded Noise Lab startup, correct-answer HP change and PixelFX sprite lifetime. 0 console errors and 0 warnings in the focused runs. No mobile/iPad or full X-ray/shop/save regression was run in this pass.
- 1440×900 prop-art screenshot: `output/playwright/hub-props-pass-1440x900.png`; all seven named prop frames loaded with original crop bounds and no browser errors. The greenery reads richer, but the map still falls short of the target's scene density.
- Expanded-tree screenshot: `output/playwright/hub-tree-depth-1440x900.png`; the player moved 34.9 world px during a 550 ms ArrowLeft hold. Trunk collision and a final console query after the last layer/collider edit remain unverified.
- Playwright `output/playwright/test-phases-room.mjs`: passed the complete quest / X-ray / reward / shop / dungeon regression after the extra arm choices, with no collected browser errors.
- A focused Playwright interaction pass selected left, right, both and rest; confirmed a single-arm pose receives correction feedback, Chest PA accepts the both-arm pose, and the browser reports no errors.
- Playwright `output/playwright/inspect-xray.mjs 1024 768`: loaded the room and captured `output/playwright/xray-redesign-1024x768.png`; browser reports game ready.
- Playwright fresh hub capture at 1440×900: `output/playwright/characters-pixelfx-hub.png`.
- These screenshots are ignored local QA artifacts, not production content. Browser emulation is not a physical iPad test.

## Decision aid and remaining work

JEV System One was called live through `@typesafe-ai/sdk@0.7.0` (model `jev-1.14.0`) on 2026-11-25. It favored a playable vertical slice at confidence 0.98 and combat feedback for the next PixelFX cue at confidence 0.37. The effect is therefore a limited reversible one-shot; it does not control gameplay. See `JEV_DECISION_LOG.md` for returned probabilities and token usage.

Next visual stages: add patient turn, hold-breath and recovery frames; split X-ray equipment into independently rendered pieces; then add environment detail and repeat browser/build checks. Preserve quest flow, save schema, current controls and pixel scale while extending art.
