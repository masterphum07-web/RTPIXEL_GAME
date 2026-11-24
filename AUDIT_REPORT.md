# RADTECH PIXEL — Source Audit and Current Checkpoint

Audit reference: local `main` checkout; the preceding art checkpoint was commit `4a39eb4`. Repository: `masterphum07-web/RTPIXEL_GAME`. The current sprite/effect update is built and browser-tested; source push and Pages deployment are reported separately.

## Latest art checkpoint — 2026-11-24

- Replaced the code-painted hospital sprite atlas with an original Astra-authored 96-frame sheet (six roles, four facings, four walk frames), while preserving its displayed footprint and scaled collision body.
- Added left-arm, right-arm, both-arm and rest poses to the patient positioning mini-game and mirrored them in the X-ray patient sprite strip. Chest PA still requires the two-arm pose; wrong single-arm poses are accepted as choices but show corrective feedback.
- Added a cyan-recolored PixelFX collect-burst after mission completion. It is a completion flourish, not an X-ray emission or clinical effect. MIT notice and license are retained.
- `ART_REBUILD_REPORT.md` contains the before/after implementation audit and remaining visual work. Character pass is complete for this checkpoint; detailed patient pose set, independently rendered equipment and richer interiors remain incomplete.
- `npm run build`, the focused patient-pose interaction check and Playwright full game-flow regression passed; an X-ray viewport screenshot was captured at 1024×768 and a fresh hub screenshot at 1440×900. See the art report for the exact ignored QA paths.

## Runtime and deployment facts

- Runtime: Phaser 3.90, TypeScript 5.9, Vite 8.3, Canvas renderer, Arcade Physics, `pixelArt: true`.
- Source branch: `main`; remote `origin` points to the repository above. Remote `gh-pages` exists. The checkout has no active GitHub Actions deployment workflow; GitHub Pages publication is separate from pushing `main`.
- Build command: `npm run build` (`tsc -b && vite build`). Local app: `npm run dev`; production preview: `npm run preview`.
- Persistent profile: `localStorage` key `radtech-pixel-profile`, schema 5. Migration is in `src/game/progression.ts`; zone player positions are stored per profile. No server account or cross-device save exists.
- Existing scenes: `HospitalScene`, `RoomScene`, `DungeonScene`. The hub and dungeon use 512×288 world coordinates. X-ray artwork is authored at 320×180 and scales to that viewport.
- No repository-owned `tests/` directory or `npm test` script is present. Browser coverage for this checkpoint was run with local Playwright scripts; see verification below.

## Feature classification

### WORKING

- Hospital hub movement on keyboard, four-direction character frames, collision world, NPC dialogue, first-day quest flow, shop and map UI.
- Chest PA simulation: patient verification, position mini-game, pose choice, collimation, timing, synthetic image preview and feedback, EXP/coin rewards.
- Inventory, equipment, skills, crafting, quest board, achievements/story progression and versioned local save migration.
- Noise Laboratory single-player dungeon, encounter questions, HP, drops and clear rewards.
- E interaction after this update: hold-to-enter-range, single activation, point-blank/front-facing target selection, wall-ray check and target-anchored prompt. Touch interaction uses the same target action.
- Touch movement after this update: analog 360° joystick, dead zone, normalized speed, release/cancel cleanup and a separate touch E button; both hub and dungeon consume the same vector.
- Original hub pixel art and newly authored prop atlas: tree, fountain, ambulance, bench, lamp, flowerbed and wayfinding sign.
- Original six-role hospital character atlas with four facings/four walk frames; PixelFX acquisition completion cue integrated into the X-ray scene.

### INCOMPLETE

- The hospital map is still one outdoor hub plus one X-ray room and one Noise Lab. Reception, CT, MRI, classroom and lounge are not explorable scenes.
- NPC activity is limited to idle/bob animation and one short deterministic student patrol. There is no daily schedule, pathfinding or crowd simulation.
- Player animation has four facings and a short walk cycle; there are no full run/attack/sit/customization animation sets. Patient movement is a contained entrance/pose animation, not the complete projection-specific choreography in the master prompt.
- The minimap and some department signs remain compact authored UI/world representations. No real scene map discovery or navigation routing is implemented.
- UI/browser behavior is emulated at iPad viewport sizes; no physical iPad Safari session has been tested.
- No saved-data export/import, long-session soak test or multiple-scene performance profile was completed in this checkpoint.

### BROKEN

- No reproducible blocking issue was found in the tested flows after this update. The prior E handling/prompt behavior was reported as broken; the revised target controller and hold-to-range path passed browser tests.

### MISSING

- Real multiplayer, authentication, authoritative server, party/guild/chat/friends and online persistence. Existing network contracts are preparation only; do not describe the game as online.
- Playable CT/MRI protocols, multi-projection X-ray missions, patient schedules, voice/music/ambient audio and live equipment values.
- A tracked automated browser-test suite and actual iPad hardware QA.

## Changes in this checkpoint

- Set the Phaser viewport to match the full 512×288 authored hospital map.
- Replaced the four-button touch D-pad with an analog joystick and unified vector input in hospital/dungeon; the independent E control remains available for multi-touch.
- Centralized hospital target selection with close-range/front-facing priorities and an obstruction check; anchored the prompt to the chosen target.
- Increased the on-screen player/NPC sprite size, added a short deterministic student patrol, and animated the patient entering the X-ray position.
- Re-authored original grass/window details and added original transparent pixel-art prop sprites. Sources are `scripts/draw-hospital-world.py` and `scripts/draw-hospital-props.py`; credits and asset licenses are in `ASSET_CATALOG.md`.

## X-ray visual revision (2026-11-24)

- Replaced the rectangle-only `RoomScene` artwork with separate 2× pixel-art wall/floor, equipment, and actor-strip assets. The strip has fixed-size patient walk/rest/arm-raised frames plus a radiographer frame; a short stepped entrance and restrained idle motion play in Phaser.
- Expanded the positioning mini-game patient board in the DOM UI with larger pixel-art-style clothing, limbs, and face treatment. Pose selection still emits the existing `patient-pose` event; the quest, save and mission flow remains intact.
- Added `ART_DIRECTION.md` and project-local agent instructions under `.agents/skills/`; added source/license records in `ASSET_CATALOG.md`.
- Local QA captures: `output/playwright/xray-redesign-1440x900.png`, `output/playwright/xray-redesign-positioned-1440x900.png` and iPad-viewport `output/playwright/xray-redesign-1024x768.png` (ignored by Git).
- `npm run build`: passed. Existing Playwright end-to-end test passed the quest, X-ray, reward, shop/equipment and dungeon flow after the art/CSS change. The interaction/analog-control test also passed E hold-to-range, one-shot dialogue, target prompt and iPad/mobile emulation. Browser runs captured the room at 1440×900 and 1024×768 with no page errors.
- The Vite bundle-size warning remains non-blocking. These are hand-authored low-frame-count game animations, not 120 fps video. Physical iPad Safari remains untested.

## Verification results

- `npm run build`: passed. Vite reports a non-blocking client bundle-size warning (about 1.31 MB minified / 353 kB gzip).
- Playwright end-to-end flow: passed quest board, Chest PA, rewards, chapter completion, shop purchase/equip and Noise Lab encounters/zone saves.
- Playwright control flow: passed E hold-to-range, no repeated dialogue, target prompt anchoring, analog direction vector and coarse-pointer layout checks.
- Responsive preview checks: desktop 1440×900 and 1920×1080; iPad emulation 1024×768, 1180×820 and 1366×1024; mobile 390×844. No browser errors in the checks. Production `vite preview` also loaded at 1440×900 and 390×844 without failed requests or console errors.
- No real iPad testing, medical protocol validation or online service test is claimed.
