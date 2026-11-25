# JEV decision log

## 2026-11-25 · Phase 0–1 sequencing and PixelFX event

- **Use:** TypeSafe JavaScript SDK `@typesafe-ai/sdk@0.7.0`, installed in a temporary directory outside the game repository. A live API request succeeded with model `jev-1.14.0`.
- **Credentials:** secure environment availability was checked as booleans only. No API key was printed, saved in the repository, or sent to the browser.
- **Decision A — development sequence:** `playable_vertical_slice`, confidence `0.98`; probabilities returned: playable vertical slice `0.99`, broad MMORPG systems `0.00`, visual-first `0.01`.
- **Decision B — PixelFX target:** `combat_feedback`, confidence `0.37`; probabilities returned: semantic feedback `0.40`, combat feedback `0.58`, ambient world `0.02`.
- **Usage metadata:** `748` input tokens, `92` output tokens. The response contained no request ID; none is recorded here.
- **Application:** preserve the single-player quest-to-simulation loop, fix the reproducible interaction mismatch first, then add one short PixelFX hit cue to correct-answer feedback. Because the effect decision confidence was low, the effect is limited to a reversible one-shot and does not alter gameplay or clinical scoring.
- JEV is advice only. Deterministic game state, rewards, save data, and educational/clinical truth remain owned by code and reviewed content.

## 2026-11-25 · Character prototype size and outfit mapping

- **Use:** live TypeSafe JavaScript SDK `@typesafe-ai/sdk@0.7.0`, model `jev-1.14.0`; bounded Stage A art decision after inspecting the existing 32×48 logical atlas and Phaser footprint.
- **Decision A — candidate frame size:** `48x72`, confidence `0.26`; returned probabilities: 32×48 `0.12`, 40×64 `0.37`, 48×72 `0.51`.
- **Decision B — coat identity:** `separate-costume-frames`, confidence `1.00`; returned probabilities: separate costume frames `1.00`, runtime tint `0.00`, reuse doctor row `0.00`.
- **Usage metadata:** 733 input / 116 output tokens. No request ID was returned.
- **Application:** create a reversible 48×72 Stage A candidate, preserve the Player's identity by using distinct scrubs/coat rows from one art master, and retain 32×48 / 40×64 / 48×72 comparison. JEV's frame-size confidence is low; do not expand the remaining cast before owner approval.

## 2026-11-25 · Remaining five character identities

- **Use:** live TypeSafe JavaScript SDK `@typesafe-ai/sdk@0.7.0`, model `jev-1.14.0`; bounded visual-design choice after inspecting the existing sprite and portrait scripts.
- **Decision A — patient design:** `light_blue_gown`, confidence `0.44`; probabilities returned: light-blue gown `0.63`, warm clinic `0.09`, cool patient `0.28`.
- **Decision B — staff silhouettes:** `role_silhouettes`, confidence `0.85`; probabilities returned: role-specific silhouettes `0.90`, bright palette `0.04`, natural palette `0.06`.
- **Usage metadata:** 752 input / 93 output tokens. No request ID was returned.
- **Application:** Patient uses a pale-blue patterned gown; Dr. Elias uses side-parted dark hair, glasses, tie and coat; Nora gets copper bob, teal workwear and a tool clipboard; Luna gets a long braid, sage cardigan and book; Kai gets chestnut swept hair and a navy senior-student jacket. This is art direction only; deterministic gameplay and clinical content remain unchanged.
