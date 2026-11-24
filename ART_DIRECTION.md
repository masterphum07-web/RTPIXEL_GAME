# RADTECH PIXEL — Art Direction Bible

## North star

Original, high-detail 2D pixel art with the warm character appeal of classic MMORPGs and the cool, carefully lit material language of a modern teaching hospital. Ragnarok Online is a mood reference only. No Ragnarok art, logo, maps, or audio may be copied. The supplied hospital and radiography screenshots guide composition, not source pixels.

## Visual principles

- Draw deliberate pixel clusters with outline, shadow, midtone, reflected light, and a few bright accents. Avoid isolated noise pixels, repetitive checker fills, and large unshaded rectangles.
- Build people from readable silhouettes first, then face, layered hair, clothing folds, seams, accessories, cast shadow, and animation. Keep joints connected across frames.
- Separate surfaces by material: glazed glass has strong cool highlights; painted walls have soft panel seams and trim; metal has narrow hard highlights; fabric uses broad folds; skin uses warm light and a muted cool shadow.
- Use one upper-left key light for characters and equipment. Anchor every walkable actor and prop with a compact ground shadow.
- Keep pixel edges crisp. Do not enlarge a small finished sprite with blur or CSS smoothing.

## Palette

| Use | Colors |
|---|---|
| Deep outline / recess | `#17223D`, `#263655`, `#34466E` |
| Hospital navy / sign | `#152956`, `#20477D`, `#2D73AA` |
| Cool wall | `#8999BF`, `#B7C3DD`, `#D9DFEB`, `#F0EEE8` |
| Glass / displays | `#275585`, `#4A91BE`, `#80C6E5`, `#C9F3FF` |
| Floor / metal | `#354B77`, `#526D9A`, `#8798B8`, `#CAD5E6` |
| Light / interaction | `#56D7F3`, `#7DE9F4`, `#9DF4C8` |
| Safety / reward | `#F4B84F`, `#FFDA78`, `#EE6B62` |
| Skin / hair / uniform | Warm skin `#F4C7AC` with `#D69583` shadow; layered dark brown hair `#292532` / `#57404A` / `#957075`; blue scrubs `#274F9A` / `#3473C2` / `#73CFF0`; white coat `#EDF1F4` / `#BCCBDD` |
| Garden | `#285A45`, `#3F8054`, `#58A064`, `#8FC86D`, flowers `#EA91AE`, `#F1C85E` |

Use a working palette of about 24–40 colors per asset family; share outline, shadow, glass, and highlight colors across families.

## Scale and camera

- World tile: 16×16 logical pixels; author tile texture at 2× (32×32 source pixels).
- Hospital map: 512×288 logical pixels, top-down orthographic.
- Hospital characters: about 18–22×27–34 logical pixels on screen; collision footprint is smaller than the full hair/coat sprite. Feet share a bottom-center anchor.
- X-ray room composition: 320×180 logical pixels inside the existing 512×288 Phaser viewport. Author backdrop and prop sources at 2×, render pixel-perfect at 0.5 scale, then retain the established room camera zoom. Keep each machine, patient, technologist, preview, and HUD independently renderable.
- Room actors should occupy roughly 42–55 logical pixels in height. Do not distort the existing character aspect ratio to fill a frame.
- Use `pixelArt`, nearest-neighbor filtering, and rounded camera pixels. Capture QA at native viewport size and inspect physical pixel edges.

## Environment and equipment

- Hospital exteriors need a clear facade silhouette, windows with visible interior light/reflections, department sign, paved entrance, grass variation, planted beds, shrubs, fountain/bench/lamps, road and ambulance bay. Props use separate atlas frames and meaningful depth/collision.
- X-ray room layers: wall and floor; safety poster and observation window; ceiling rails and tube assembly; vertical detector; patient platform; console and storage; patient; technologist; foreground cart/props; restrained illumination and machine status lights.
- Machine components should read as an X-ray system at gameplay scale: rail, tube head, collimator aperture, support, receptor face, table lift, console screen, and physical controls. Use highlights and contact shadows to separate parts.
- Do not bake UI text into images. Use DOM for labels and dense controls; art assets carry surface detail only.

## Character and animation rules

- Match the current chibi MMORPG identity, but use layered hair, face shading, readable eyes, distinct silhouettes, clothing seams and shoe details.
- All frames in a strip share frame size, anchor, palette and identity. Use a single approved base frame as the source of truth.
- Walk cycles retain a grounded foot line. Body parts remain connected at pivots; do not rotate an entire standing figure to fake a new pose.
- Patient pose changes must be visibly linked to the positioning UI and return to a safe neutral pose. Keep animation stylized and educational; it is not a real clinical instruction.

## Asset naming and source of truth

- Lowercase kebab-case names with a role suffix: `xray-room-walls.png`, `xray-equipment.png`, `patient-chest-pa-strip.png`, `radiographer-console-idle.png`.
- Store source authoring scripts under `scripts/`, source/export state under `pixelart/exports/`, and runtime assets under `public/assets/`.
- Keep high-resolution masters marked `@2x`; record source and license in `ASSET_CATALOG.md`.
- Preserve the same Phaser texture key once shipped; use named atlas frames rather than magic numeric slices where practical.

## UI language

- Reuse the existing navy/cyan beveled MMORPG frame, with amber for actions/rewards and green for completion.
- Keep mission status near the top, checklist to the left, image preview and brief tips to the right, and technique controls low in the scene. Keep the center patient/machine readable.
- Only show the large debrief after exposure completes. The ordinary movement screen must not carry a permanent lower-middle card.
- Maintain portrait, title, EXP, HP, currency and settings controls. Keep touch joystick and E button clear of dialogue and dock.

## Visual acceptance checklist

1. Review the actual Phaser-rendered scene at native desktop and iPad landscape sizes; never approve a source image in isolation.
2. Confirm edges remain crisp at the production scaling factor.
3. Confirm patient and radiographer read as characters, not stacked rectangles.
4. Confirm tube, detector, table and console are recognizable without relying on text.
5. Confirm wall, floor, fabric, skin and metal have different values and materials.
6. Confirm depth order, shadows, collision, interaction prompts, and patient animation remain correct.
7. Confirm normal-play HUD does not obscure the central action.
8. Keep before/after screenshots and list remaining deficiencies; do not call a visual overhaul complete if a major item fails.
