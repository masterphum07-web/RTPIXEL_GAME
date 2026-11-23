# Instructions for AI contributors

## Project identity and scope

- This repository is **RADTECH PIXEL**, a browser game built with Phaser 3, TypeScript, and Vite. It is independent of the user's older NuMed Arena/other projects. Keep all edits in this repository.
- The target is a 2D pixel RPG: explore a top-down hospital, talk to NPCs, complete a quest, then enter the side-view X-ray training scene. Use the supplied screenshots as composition/style references; do not use them as extracted game art.
- The project is a Thai-first learning-game prototype. Keep clinical content fictional, clearly label all machine settings and images as SIM, and preserve the safety notice.
- Read `README.md` and this file before making a substantial change. Read `src/game/types.ts`, `src/game/cases.ts`, `src/game/simulation.ts`, `src/game/hospital-scene.ts`, `src/game/room-scene.ts`, `src/ui/app.ts` and `src/ui/rpg.css` as relevant before modifying gameplay.

## Current implementation

- `hospital` scene: 16 px procedural tilemap, follow camera, Arcade physics/collisions, characters/NPC contacts, WASD/arrows, E interaction, virtual d-pad and touch interact.
- Quest sequence: mentor → reception/referral → radiology door → Chest PA practice → radiologist debrief.
- `room` scene: side-view X-ray setup with verify, positioning, collimation, exposure timing, fictional technique controls, synthetic image, deterministic feedback, XP/coins and PixelFX completion effect.
- More cases, learning/reference panel, quiz, results view, localStorage schema 3, responsive UI, PWA manifest/service worker and GitHub Pages workflow are included.
- Original artwork is mostly drawn in code and SVG. Do not replace the top-down RPG with a dashboard or a 3D scene.

## Engineering rules

- Use Phaser 3 APIs and TypeScript types. Keep each scene scoped to one screen/concern and use game events for UI↔scene communication. Clean up game-level and keyboard listeners when a scene shuts down/restarts.
- Keep update-loop work small; do not create disposable object arrays every frame without a reason.
- Treat quest transitions, scores, saved data, and input ranges as deterministic code. JEV may advise bounded design decisions but must never own game logic or clinical truth.
- Migrate `localStorage` when changing its schema. Keep user data local unless a new network feature is explicitly requested.
- Never add a credential, API key, patient record, or user secret to code, a public asset, docs, test output, or Git history. The frontend currently needs no key. JEV credentials are supplied only through the local secure environment/skill.
- Respect third-party notices. PixelFX is MIT-licensed; retain notices in `THIRD_PARTY_NOTICES.md` and `public/assets/` if its asset remains.
- For art, prefer small, readable pixel clusters, crisp edges, a limited palette, consistent 3/4 top-down perspective, and sprites that read at native game scale. External image-generation pipelines may cost money; do not invoke a paid step unless the user explicitly approved that cost.
- Keep keyboard and touch flows equivalent. Check the game at desktop and narrow/mobile viewport sizes when changing controls/layout.

## Local workflow

```bash
npm ci
npm run dev
npm run build
npm run preview
```

When asked to verify a change, inspect the game in a real browser and check the complete affected flow, responsive controls, browser console, and `npm run build`. Do not claim unrun checks. `@playwright/cli` was used for manual browser checks in the original Codex environment; it is not a runtime dependency.

## Game flow acceptance checklist

1. Fresh profile can talk to the mentor and accept the quest.
2. Quest advances only after a separate conversation with Reception and referral acceptance.
3. The radiology door opens only after referral; wrong order gives a clear prompt.
4. Mission requires verification, positioning, and collimation before simulated exposure.
5. Timing mini-game can be retried; successful exposure produces a synthetic result and saves XP/score.
6. Returning to the hub and talking to the radiologist completes the first-day quest once.
7. Re-entering scenes does not duplicate event listeners; E, WASD/arrows and touch controls work.
8. Browser reload restores local progress; no API secrets or real patient data are stored.

## Relevant skills for the next AI

Check local availability first. Codex skill folders are not project libraries; do not copy the global skills directory into this repository.

- **Use:** `phaser-engineer`, `playwright`, `jev-system-one` for Phaser implementation, browser verification, and bounded decisions. `pixelfx` is in use for the completion effect.
- **Optional:** `spritecast` for new 2D characters/props when its requirements are met. Its drawing/model pipeline may incur cost and needs the applicable keys; inspect its `SKILL.md` and get explicit approval before a paid step. `img2threejs` is for genuinely 3D assets and is normally irrelevant to the 2D target.
- **Not for this project:** `Jakeschincariol/console-skill` contains PS2 reverse-engineering, porting, modding, and asset tools.
- **Live JEV used in this project:** details and exact usage returned by the SDK are in `README.md`. Do not claim a fresh live JEV call unless you actually made one and inspected the usage metadata. Never expose or commit the key.

The global skill sources, install paths, provenance, and exclusions are documented in `README.md`. Codex's built-in `skill-installer` can install GitHub skills; restart/start a new Codex turn after installation if the host requires it.

## Publishing

GitHub Pages is configured by `.github/workflows/deploy.yml` and deploys `dist/` from `main`. Never point this project at the old project's remote. Verify the intended repository before push and do not add API keys to GitHub Actions; this game has no secret requirement.
