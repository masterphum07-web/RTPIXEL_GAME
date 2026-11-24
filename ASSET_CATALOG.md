# RADTECH PIXEL Asset Catalog

All new hospital artwork listed below is original RADTECH PIXEL artwork. The reference screenshots guide composition and palette only; none of them is shipped as a game asset.

| Filename | Source | License / attribution | Intended use | Status |
|---|---|---|---|---|
| `public/assets/hospital-world.png` | `scripts/draw-hospital-world.py`, drawn with Astra Pixel Art | Original project artwork; no external attribution | 2× authored top-down hospital courtyard background (world map is 512×288) | Original, modified this cycle with denser ground detail, window interiors and corrected façade bounds |
| `public/assets/hospital-props.png` | `scripts/draw-hospital-props.py`, drawn with Astra Pixel Art | Original project artwork; no external attribution | Transparent cutouts for oak tree, fountain, ambulance, bench, streetlamp, flowerbed and wayfinding sign | Original, added this cycle |
| `pixelart/exports/hospital-world@2x.png` | Export of `hospital-world` | Same as source artwork | High-resolution preview/source export | Original |
| `pixelart/exports/hospital-props@2x.png` | Export of `hospital-props` | Same as source artwork | High-resolution preview/source export | Original |
| `public/assets/student-portrait.*`, `public/assets/mentor-portrait.*` | Existing project art and SVG portraits | Original project artwork | Character portraits and dialogue panel | Existing |
| `public/assets/pixelfx-confetti.png` and `.json` | PixelFX effect pack | See `public/assets/pixelfx-LICENSE.txt` and `public/assets/pixelfx-NOTICE.md` | Original pixel VFX for mission completion | Existing third-party asset; attribution/license notice retained |

## Regeneration

Source drawing scripts are in `scripts/`. They use the installed Astra Pixel Art skill runtime and write editable exports beneath `pixelart/exports/`; copy the matching 1× PNG to `public/assets/` after regenerating. The production game loads only assets from `public/assets/`.

No paid assets, remote images, API keys, or assets from Ragnarok Online are used by this cycle.
