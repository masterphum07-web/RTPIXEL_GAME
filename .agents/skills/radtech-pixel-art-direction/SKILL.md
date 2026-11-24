---
name: radtech-pixel-art-direction
description: "Apply the RADTECH PIXEL art bible when creating or reviewing pixel-art game scenes, sprites, equipment, environment layers, and UI."
---

# Radtech Pixel Art Direction

Use this skill for visual work in the RADTECH PIXEL Phaser project. Read the project-root `ART_DIRECTION.md` before authoring or approving art.

## Rules

- Preserve the supplied hospital and radiography screenshots as composition references; create original artwork. Never copy Ragnarok Online or other copyrighted game assets.
- Keep the Phaser orthographic scene, its saves, missions, controls, interactions, and HUD behavior intact while changing presentation.
- Author clean pixel clusters with palette-consistent outlines, material shading, highlights, and contact shadows. Keep pixel edges crisp at the game's actual render scale.
- Prefer independent, named environment, machine, actor, and effects assets over drawing the entire world as one flat backdrop. Keep UI labels and dense text in DOM.
- Use stable frame dimensions and bottom-center anchors for actor strips. Keep anatomy connected and pose changes driven by the existing gameplay state.
- Store deterministic authoring scripts in `scripts/`, exports in `pixelart/exports/`, and runtime images in `public/assets/`. Record original source/license information in `ASSET_CATALOG.md`.
- Before declaring visual work done, inspect the Phaser-rendered scene at native scale, including desktop and iPad layouts, and exercise the scene's relevant mission and animation interactions.
- Clearly label simulated radiology content as educational simulation; do not present art or parameters as real clinical guidance.
