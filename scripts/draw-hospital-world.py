# High-detail 2x pixel background for the Phaser hospital hub.
# Run via the installed astra-pixel-art skill's pixelart.py exec --file.

S = 2  # two authored pixels per 16px game-world pixel
W, H = 512 * S, 288 * S
ground = new_canvas(W, H, name="hospital-ground")
ground.rect(0, 0, W, H, "#34754d")

# Garden turf: deliberately varied clusters instead of a repeating square tile.
for ty in range(0, H, 32):
    for tx in range(0, W, 32):
        n = (tx * 13 + ty * 7) % 11
        if n in (0, 3, 8):
            ground.rect(tx + 3, ty + 6, 5, 2, "#43875a")
            ground.rect(tx + 6, ty + 4, 3, 2, "#5b9a62")
            ground.rect(tx + 20, ty + 20, 4, 3, "#2e6848")
        elif n in (1, 5):
            ground.rect(tx + 15, ty + 8, 6, 2, "#408456")
            ground.rect(tx + 17, ty + 6, 3, 2, "#5b9a62")
            ground.rect(tx + 5, ty + 22, 3, 2, "#2f6a49")
        if (tx + ty) % 7 == 0:
            ground.rect(tx + 27, ty + 11, 2, 2, "#77ae67")

# Left ambulance road, with curb, dashed lane paint and road-side paving.
ground.rect(30, 0, 104, H, "#303d55")
ground.rect(32, 0, 5, H, "#56627a")
ground.rect(127, 0, 7, H, "#c2ad96")
ground.rect(134, 0, 4, H, "#e3cfb2")
for y in range(10, H, 88):
    ground.rect(80, y, 4, 42, "#e8e7dd")
    ground.rect(82, y + 3, 1, 36, "#ffffff")
for y in range(0, H, 32):
    ground.rect(31, y, 8, 1, "#69738a")
ground.rect(44, 0, 2, H, "#29364d")
ground.rect(118, 0, 2, H, "#29364d")

# Hospital approach, paved courtyard and the central path around the fountain.
ground.rect(128, 256, 800, 96, "#b69f8b")
ground.rect(128, 256, 800, 6, "#796c70")
ground.rect(128, 263, 800, 5, "#e4cfb5")
ground.rect(128, 343, 800, 9, "#756878")
ground.rect(480, 320, 64, 224, "#ae9b8b")
ground.rect(480, 320, 7, 224, "#e4cfb5")
ground.rect(537, 320, 7, 224, "#796c70")
for x in range(128, 928, 64):
    ground.rect(x, 269, 2, 72, "#9e8c82")
for y in range(272, 344, 24):
    ground.rect(130, y, 796, 1, "#cbb49e")
for x in range(132, 928, 64):
    for y in range(274, 344, 24):
        if ((x // 64) + (y // 24)) % 3 == 0:
            ground.rect(x + 19, y + 11, 5, 2, "#d9c4ab")
            ground.rect(x + 21, y + 10, 2, 1, "#eadac3")
for y in range(320, 544, 48):
    ground.rect(488, y, 48, 2, "#9a887e")
    ground.rect(512, y + 2, 1, 44, "#d2bca5")

# Flower beds beside the walkway; lamps, shrubs and fountain stay as foreground props.
for x, y, w, h in [(152, 352, 96, 30), (704, 352, 112, 30), (146, 486, 96, 29), (704, 486, 112, 29)]:
    ground.rect(x, y, w, h, "#284e42")
    ground.rect(x + 4, y + 4, w - 8, h - 8, "#3d8052")
    ground.rect(x + 5, y + 5, w - 10, 2, "#6e9b59")
    for fx in range(x + 13, x + w - 8, 18):
        ground.rect(fx, y + 12 + ((fx // 3) % 5), 4, 4, "#e791a8")
        ground.rect(fx + 2, y + 10 + ((fx // 3) % 5), 2, 2, "#ffcf70")
        ground.rect(fx + 6, y + 17, 3, 2, "#65a865")

# Hospital façade: blue stone plinth, cream masonry, glass bays and recessed doors.
facade = new_canvas(W, H, name="hospital-facade")
facade.rect(256, 0, 512, 224, "#697da7")
facade.rect(264, 0, 496, 216, "#c8c6ce")
facade.rect(272, 0, 480, 206, "#d8d7df")
facade.rect(272, 0, 480, 11, "#f0ece5")
facade.rect(272, 9, 480, 4, "#aab5d0")
facade.rect(256, 0, 10, 220, "#3e5f91")
facade.rect(758, 0, 10, 220, "#3e5f91")
facade.rect(256, 211, 512, 16, "#405b89")
facade.rect(264, 214, 496, 6, "#6c83aa")
facade.rect(270, 220, 484, 7, "#e5e3e0")

# Pale stone wall blocks, lintels, tiny chips and cool reflected shadows.
for y in range(18, 208, 22):
    shift = 0 if (y // 22) % 2 == 0 else 18
    for x in range(276 + shift, 748, 52):
        facade.rect(x, y, 48, 1, "#b6b7c6")
        facade.rect(x + 4, y + 2, 2, 4, "#e9e7e5")
        facade.rect(x + 44, y + 13, 3, 2, "#c2c4d1")
for x in (286, 454, 570, 738):
    facade.rect(x, 18, 8, 187, "#bdc0cf")
    facade.rect(x + 2, 20, 3, 182, "#e3e1df")
    facade.rect(x + 5, 21, 2, 181, "#a9b1c7")

# Window bays (world x=148, 196, 244, 292, 340), each with frame, reflection and sill.
for x in (290, 376, 462, 548, 634, 720):
    facade.rect(x, 38, 62, 100, "#354d79")
    facade.rect(x + 4, 42, 54, 88, "#4789ba")
    facade.rect(x + 7, 45, 48, 80, "#82b8d8")
    facade.rect(x + 9, 47, 20, 74, "#a8d8ec")
    facade.rect(x + 32, 47, 2, 74, "#315582")
    facade.rect(x + 8, 78, 48, 3, "#315582")
    facade.rect(x + 12, 49, 5, 58, "#d1eff9")
    facade.rect(x + 38, 50, 13, 2, "#c3e8f5")
    facade.rect(x + 6, 132, 58, 6, "#e5e2dc")
    facade.rect(x + 8, 138, 54, 4, "#8394b5")
    facade.rect(x + 2, 143, 66, 4, "#667ba5")

# Entry vestibule and blue double doors sit beneath the main sign.
facade.rect(458, 160, 108, 66, "#334a75")
facade.rect(466, 166, 92, 56, "#22466e")
facade.rect(472, 170, 39, 45, "#73bfe1")
facade.rect(513, 170, 39, 45, "#8fd2e8")
facade.rect(475, 174, 33, 36, "#3980b4")
facade.rect(516, 174, 33, 36, "#4e9ac5")
facade.rect(509, 170, 4, 48, "#263d66")
facade.rect(505, 191, 3, 5, "#f4d478")
facade.rect(514, 191, 3, 5, "#f4d478")
facade.rect(449, 219, 126, 8, "#d9d7d3")
facade.rect(455, 225, 114, 4, "#7386a8")
facade.rect(426, 146, 13, 62, "#d2d0d3")
facade.rect(434, 149, 7, 59, "#9ba9c6")
facade.rect(583, 146, 13, 62, "#d2d0d3")
facade.rect(583, 149, 7, 59, "#9ba9c6")

# A subtle shaded roof/canopy ledge, blue trim and light-catching glass strips.
facade.rect(270, 2, 484, 5, "#7488ad")
facade.rect(273, 4, 476, 2, "#a6c2dc")
facade.rect(270, 204, 484, 4, "#93a5c5")
facade.rect(274, 207, 476, 3, "#eef0eb")

world = flatten([ground, facade], name="hospital-world", background="#34754d")
print(world.stats_text())
print(save("hospital-world", canvas=world, scales=(1, 2)))
