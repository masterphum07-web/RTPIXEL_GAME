# RADTECH PIXEL Asset Catalog

All new hospital artwork listed below is original RADTECH PIXEL artwork. The reference screenshots guide composition and palette only; none of them is shipped as a game asset.

| Filename | Source | License / attribution | Intended use | Status |
|---|---|---|---|---|
| `public/assets/hospital-world.png` | `scripts/draw-hospital-world.py`, drawn with Astra Pixel Art | Original project artwork; no external attribution | 2× authored top-down hospital courtyard background (world map is 512×288) | Original, modified this cycle with denser ground detail, window interiors and corrected façade bounds |
| `public/assets/hospital-props.png` | `scripts/draw-hospital-props.py`, drawn with Astra Pixel Art | Original project artwork; no external attribution | Transparent cutouts for oak tree, fountain, ambulance, bench, streetlamp, flowerbed and wayfinding sign | Original, added this cycle |
| `public/assets/hospital-people.png` | `scripts/draw-hospital-people.py`, drawn with Astra Pixel Art | Original RADTECH PIXEL artwork; no external attribution | 96-frame atlas: six hospital roles × four facings × four walk frames; authored at 32×48 pixels per frame then exported at 4× | Original, replaces runtime canvas-drawn sprites while preserving world footprint |
| `public/assets/xray-room-walls.png` | `scripts/draw-xray-room.py`, drawn with Astra Pixel Art | Original project artwork; no external attribution | 2× authored room wall, observation window, safety poster and reflective tiled floor | Original, added this cycle |
| `public/assets/xray-equipment.png` | `scripts/draw-xray-room.py`, drawn with Astra Pixel Art | Original project artwork; no external attribution | Transparent 2× layer for tube rail, collimator, detector, table, console, storage, cart and plant | Original, added this cycle |
| `public/assets/xray-actors-strip.png` | `scripts/draw-xray-room.py`, drawn with Astra Pixel Art | Original project artwork; no external attribution | Eight fixed 88×112 source frames: two patient walk frames, rest, both arms raised, left arm raised, right arm raised, breathing idle, and radiographer | Original, extended this cycle |
| `pixelart/exports/xray-room-walls.png` + `@2x`, `xray-equipment.png` + `@2x`, `xray-actors-strip.png` + `@2x` | Astra Pixel Art exports; editable source in `scripts/draw-xray-room.py` and `pixelart/session.jsonl` | Same as source artwork | Runtime-resolution and high-resolution art masters | Original |
| `pixelart/exports/hospital-world@2x.png` | Export of `hospital-world` | Same as source artwork | High-resolution preview/source export | Original |
| `pixelart/exports/hospital-props@2x.png` | Export of `hospital-props` | Same as source artwork | High-resolution preview/source export | Original |
| `public/assets/student-portrait.*`, `public/assets/mentor-portrait.*` | Existing project art and SVG portraits | Original project artwork | Character portraits and dialogue panel | Existing |
| `public/assets/pixelfx-confetti.png` and `.json` | PixelFX `ui/confetti` | MIT; `patch-gg/pixelfx`, Copyright (c) 2026 Patch and Hugo Duprez; see `THIRD_PARTY_NOTICES.md` | Mission reward celebration | Third-party effect; notice retained |
| `public/assets/pixelfx-xray-acquisition.png` and `.json` | PixelFX `pickups/collect-burst`, palette recolored cyan | MIT; `patch-gg/pixelfx`, Copyright (c) 2026 Patch and Hugo Duprez; see `THIRD_PARTY_NOTICES.md` | Brief non-radiation ring/glint when a simulated exposure mission completes | Third-party effect, palette modified for RADTECH PIXEL |

## Regeneration

Source drawing scripts are in `scripts/`. They use the installed Astra Pixel Art skill runtime and write editable exports beneath `pixelart/exports/`; copy the matching runtime PNG to `public/assets/` after regenerating. `src/game/hospital-scene.ts` loads the 128×192-per-cell character atlas as a Phaser spritesheet. `src/game/room-scene.ts` loads the room layers, eight-frame actor sheet and PixelFX acquisition atlas. The production game loads only assets from `public/assets/`.

No paid assets, remote images, API keys, or assets from Ragnarok Online are used by this cycle.
