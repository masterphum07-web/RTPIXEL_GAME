# RADTECH PIXEL — Art Rebuild Checkpoint

Updated: 2026-11-25

## Audit findings

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
