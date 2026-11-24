# RADTECH PIXEL — Source Audit and Current Checkpoint

## Phase 0–1 re-audit — 2026-11-25

- Scope: existing source checkout on `codex/radtech-phase0-1`; no production branch, remote, or player save was changed.
- `npm ci` initially hit Windows `EPERM` because a headed-browser Vite process held a native dependency. The browser was closed, clean install then completed (20 packages; 0 reported vulnerabilities), and baseline `npm run build` passed with Vite's existing large-chunk notice.
- Fresh desktop Chromium audit reproduced a contextual action mismatch: the scene selected the nearby `radiology-door` while the newly rendered touch button still advertised the quest-step Reception action. Cause confirmed in code: its initial label came from quest state, while `mountApp` cached the last target kind across complete DOM re-renders and skipped updating a replacement button.
- The source fix makes the action label a neutral fallback and refreshes it when either the selected target or actual button element changes. The same pass replaces the dashboard's hard-coded level/HP values with saved profile values.
- A seeded Noise Lab browser check exposed a second runtime crash: `DungeonScene` synchronously requested saved coordinates before creating `this.player`, so a save returning to that zone called `setPosition` on `undefined`. The request now runs immediately after the player sprite is created. The seeded-zone recheck passed after the fix.
- Visual audit at a 512×288 game viewport scaled to 1036×583 CSS px found the hub composition substantially flatter and sparser than the supplied target. This checkpoint does not claim that the art overhaul is complete.
- A restrained prop-art pass was made with Astra Pixel Art: tree leaf clusters, fountain water glints, and flowerbed leaves/stone edges are denser while preserving the seven atlas crop bounds. Trees were enlarged/distributed, trunk blockers added, and player/prop depth now sorts by Y. A 1440×900 capture showed the new composition, and ArrowLeft moved the player 34.9 world px in 550 ms. A teleport-based trunk-block check did not synchronize the Arcade body with the sprite, so tree collision is not yet verified. The latest visual capture was not followed by a clean console query. The overall hub remains sparser/flatter than the reference; see `output/playwright/hub-tree-depth-1440x900.png`.
- PixelFX candidate review selected `impacts/hit-spark` for brief correct-answer combat feedback. It was recolored to the hospital cyan/blue ramp, rendered as a 16-frame 136×80 Phaser atlas at 30 fps, and checked with `node tools/check.mjs impacts/hit-spark` (1 pass, 0 fail, 0 warnings). The cue is scheduled after the result dialog closes so the dialog does not cover it.
- Live JEV was called through the installed TypeSafe SDK. It favored completing a playable vertical slice (confidence 0.98); for the next PixelFX use it favored combat feedback, but with low confidence 0.37. This is a bounded recommendation only. Exact record: `JEV_DECISION_LOG.md`.
- Fresh headed desktop Chromium verification confirms the selected target and contextual button stay in sync after the mentor dialogue causes a DOM rebuild. The Reception action opens Reception dialogue; at the locked X-ray entrance the label explicitly says it is locked and points back to the referral objective. The seeded Noise Lab save now boots without a crash, opens an encounter, applies the correct-answer HP change, and plays then destroys one `combat-hit-spark` sprite after Continue. Those focused tests reported 0 console errors and 0 warnings. A later tree-depth screenshot confirmed the new composition; ArrowLeft moved the player 34.9 world px in 550 ms. Tree blocker collision and a console query after that latest pass are not verified. Mobile/iPad, full X-ray, shop and save/reload regression remain outside completed coverage.

### Phase 0–1 verification (2026-11-25)

- `npm ci`: passed after browser/dev server stopped.
- Baseline `npm run build`: passed before edits.
- Post-change `npm run build`: passed. The baseline build reported a non-blocking large-chunk notice; later build output passed without that notice.
- Post-change browser coverage: focused fresh-profile desktop test passed the mentor-to-Reception action and target-aware locked-door label at the authored 512×288 world. A seeded Noise Lab save booted successfully; normal E interaction opened the first encounter, the correct answer changed enemy HP from 2/2 to 1/2, and Continue spawned a hit-spark that self-destroyed. The 1440×900 hub capture showed the expanded trees and player movement; all seven prop frames loaded in the prior pass. Tree blocker collision has not been verified, and no mobile/iPad emulation or full game loop was run in this re-audit.
- PixelFX check: `node tools/check.mjs impacts/hit-spark` passed (1 pass, 0 fail, 0 warnings); runtime trigger was confirmed in the headed browser.

Audit reference: local `main` checkout; the preceding art checkpoint was commit `4a39eb4`. Repository: `masterphum07-web/RTPIXEL_GAME`. The current sprite/effect update is built and browser-tested; source push and Pages deployment are reported separately.

## Interaction button fix — 2026-11-24

- Root cause: the contextual `E` button was inside `.touch-pad`, which was `display:none` except on coarse-pointer devices. On desktop, the canvas showed only a keyboard hint and there was no clickable control. Legacy small-screen CSS also positioned that button below the viewport, and a 560 px minimum shell could clip controls in short landscape windows.
- Fix: show a large contextual action button on all pointer types. It uses the same `virtual-interact` controller as keyboard E and shows the current action (talk, enter, shop, etc.). Removed the stale mobile layout rules and made the shell fit the actual viewport height.
- Verification: production `npm run build` passed. Playwright confirmed the button is visible and clickable at 1440×900, iPad 1024×768, phone 390×844, phone landscape 844×390, and narrow mouse 390×844. A full mouse and iPad flow clicked the mentor, Reception, and Radiology entrance and reached the Chest PA mission without console or page errors. Full quest/X-ray/shop/dungeon regression passed.

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
