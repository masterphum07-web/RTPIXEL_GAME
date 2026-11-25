# Original RADTECH PIXEL props, authored with the Astra Pixel Art skill.
# Each cutout is laid out for named Phaser frames in hospital-scene.ts.
a = new_canvas(384, 160, name="hospital-props")

# 0: oak tree, 64×80 source pixels = 32×40 world pixels.
a.ellipse(32, 73, 23, 5, "#172b3a80")
a.rect(26, 44, 12, 27, "#493849")
a.rect(29, 48, 7, 23, "#815342")
a.rect(22, 58, 9, 4, "#9b6547")
a.poly([(12, 35), (16, 19), (25, 12), (41, 13), (51, 24), (54, 39), (48, 52), (38, 58), (18, 52), (9, 43)], "#183c3b")
a.poly([(15, 32), (19, 19), (27, 15), (42, 16), (49, 26), (51, 39), (44, 49), (35, 54), (20, 49), (13, 41)], "#286b4b")
a.rect(22, 19, 12, 5, "#3f8b58")
a.rect(31, 16, 10, 6, "#4c995b")
a.rect(15, 29, 8, 7, "#368354")
a.rect(39, 27, 9, 8, "#378453")
a.rect(22, 40, 8, 6, "#328052")
a.rect(39, 41, 7, 5, "#337b4e")
a.rect(20, 25, 4, 3, "#8ac36a")
a.rect(35, 22, 5, 3, "#a1cb72")
a.rect(44, 33, 3, 4, "#76b75f")
a.rect(27, 46, 3, 2, "#a5d07b")
# Layered leaf clusters add the irregular canopy silhouettes and cool rim light
# visible in the reference, while keeping the original 64×80 frame bounds.
for cx, cy, rx, ry, shade in [
    (19, 24, 6, 5, "#3b8653"), (29, 18, 7, 5, "#5b9e60"),
    (40, 21, 6, 5, "#498e55"), (47, 31, 5, 6, "#3a8050"),
    (16, 39, 5, 6, "#34774d"), (27, 48, 7, 5, "#3c8652"),
    (39, 45, 7, 5, "#34774d"), (34, 31, 8, 7, "#34794d"),
]:
    a.ellipse(cx, cy, rx, ry, shade)
for x, y, shade in [
    (18, 25, "#a4d277"), (22, 21, "#78b765"), (29, 17, "#c0d982"),
    (34, 19, "#88bf68"), (41, 22, "#a6ce72"), (47, 29, "#83bb67"),
    (15, 39, "#8fc16b"), (21, 45, "#72ad5e"), (30, 50, "#94c66d"),
    (39, 46, "#77b15d"), (45, 40, "#9ac96e"),
]:
    a.rect(x, y, 3, 2, shade)
a.rect(24, 24, 2, 2, "#d5e693")
a.rect(37, 27, 2, 2, "#c8df8d")
a.rect(31, 40, 2, 2, "#b6d77d")

# 1: garden fountain, 128×80 source pixels = 64×40 world pixels.
a.ellipse(128, 70, 56, 7, "#172b3a80")
a.ellipse(128, 59, 57, 17, "#514c62")
a.ellipse(128, 55, 54, 17, "#ad998a")
a.ellipse(128, 53, 48, 14, "#d5c0a8")
a.ellipse(128, 51, 39, 10, "#314f83")
a.ellipse(128, 49, 34, 8, "#4eb7de")
a.ellipse(128, 47, 24, 5, "#94e8f7")
a.rect(123, 31, 10, 18, "#657a9e")
a.rect(119, 28, 18, 5, "#d4c8b6")
a.rect(122, 21, 12, 9, "#4fb6df")
a.rect(125, 12, 6, 12, "#76d9f0")
a.rect(121, 8, 4, 7, "#b3f5ff")
a.rect(132, 5, 3, 8, "#d6fbff")
a.rect(106, 47, 7, 2, "#c5f7ff")
a.rect(145, 53, 8, 2, "#c5f7ff")
a.rect(112, 57, 4, 2, "#d5f9ff")
a.rect(140, 43, 5, 2, "#d5f9ff")
a.rect(78, 58, 4, 5, "#e994ad")
a.rect(174, 57, 4, 5, "#f2ca69")
# Broken fountain highlights read as moving water without turning the prop into
# a flat cyan disc; the short glints are separately animated in Phaser too.
a.rect(113, 48, 8, 2, "#c0f6ff")
a.rect(136, 51, 10, 2, "#b5f2ff")
a.rect(117, 57, 6, 2, "#31a7d5")
a.rect(137, 58, 8, 2, "#2d9ccd")
a.rect(124, 18, 2, 6, "#e7ffff")
a.rect(131, 10, 2, 6, "#c4f8ff")
a.rect(119, 25, 3, 3, "#a7eff8")
a.rect(136, 28, 3, 3, "#b3f5fc")

# 2: ambulance, 128×80 source pixels = 64×40 world pixels.
a.ellipse(256, 70, 56, 5, "#172b3a80")
a.rect(204, 38, 94, 23, "#263956")
a.poly([(208, 38), (217, 23), (231, 18), (272, 18), (285, 30), (294, 39)], "#e8edf0")
a.poly([(213, 37), (220, 26), (233, 22), (249, 22), (249, 37)], "#8ccde4")
a.poly([(254, 22), (271, 22), (282, 31), (284, 37), (254, 37)], "#b3e4ef")
a.rect(207, 40, 86, 18, "#f4f1e8")
a.rect(207, 48, 86, 10, "#c9d9e2")
a.rect(201, 34, 8, 18, "#e4e7e5")
a.rect(291, 40, 8, 12, "#f4f1e8")
a.rect(211, 55, 18, 7, "#18273b")
a.rect(270, 55, 18, 7, "#18273b")
a.ellipse(220, 60, 8, 8, "#273146")
a.ellipse(279, 60, 8, 8, "#273146")
a.ellipse(220, 60, 4, 4, "#a8b9c6")
a.ellipse(279, 60, 4, 4, "#a8b9c6")
a.rect(241, 39, 14, 3, "#d83f58")
a.rect(246, 34, 4, 13, "#d83f58")
a.rect(222, 15, 18, 5, "#b93d53")
a.rect(225, 12, 12, 3, "#f1d767")
a.rect(266, 15, 18, 5, "#3e8fce")
a.rect(269, 12, 12, 3, "#f1d767")
a.rect(213, 42, 2, 8, "#ffffff")
a.rect(287, 43, 3, 4, "#f4c95c")

# 3: bench, 64×64 source pixels = 32×32 world pixels.
a.ellipse(352, 59, 28, 4, "#172b3a80")
a.rect(326, 28, 53, 6, "#503d3b")
a.rect(329, 24, 47, 6, "#8e5d4c")
a.rect(330, 18, 45, 6, "#bc8060")
a.rect(331, 15, 43, 3, "#dfaa7d")
a.rect(329, 35, 47, 5, "#76504b")
a.rect(332, 40, 4, 15, "#354258")
a.rect(370, 40, 4, 15, "#354258")
a.rect(326, 53, 12, 3, "#26364e")
a.rect(367, 53, 12, 3, "#26364e")
a.rect(336, 25, 2, 3, "#f2c18b")
a.rect(358, 25, 2, 3, "#f2c18b")

# Lower row is authored separately and blitted into the atlas at y=80.
lower = new_canvas(384, 80, name="hospital-props-lower")

# 4: streetlamp, 48×80 source pixels = 24×40 world pixels.
lower.ellipse(24, 74, 18, 4, "#172b3a80")
lower.rect(21, 28, 6, 43, "#283852")
lower.rect(22, 29, 2, 37, "#5d7294")
lower.rect(14, 23, 21, 7, "#263956")
lower.rect(12, 17, 25, 7, "#4b6082")
lower.rect(15, 10, 20, 8, "#f3d584")
lower.rect(18, 12, 14, 4, "#fff1b0")
lower.rect(17, 7, 16, 3, "#273754")
lower.rect(13, 25, 23, 2, "#91b5df")
lower.rect(18, 67, 12, 4, "#26364c")

# 5: flowerbed, 128×64 source pixels = 64×32 world pixels.
lower.ellipse(112, 58, 56, 4, "#172b3a80")
lower.rect(57, 29, 111, 24, "#344d43")
lower.rect(61, 28, 103, 19, "#438253")
lower.rect(63, 29, 99, 4, "#75a85f")
for x, y, petal in [(68, 35, "#ed94ad"), (84, 40, "#ffd36c"), (102, 34, "#e8a4c1"), (121, 41, "#f5d477"), (142, 34, "#f09ab1"), (155, 40, "#ffe27b"), (74, 45, "#fff0d4"), (133, 47, "#f2a7bd")]:
    lower.rect(x, y, 6, 4, petal)
    lower.rect(x + 2, y - 2, 3, 3, "#f8d66f")
    lower.rect(x - 3, y + 2, 3, 3, "#32734d")
    lower.rect(x + 6, y + 1, 3, 4, "#377b50")
# Leaf fans and alternating stone edging give the planting strip a more
# hand-laid, garden-bed feel while preserving the same prop atlas crop.
for x, y in [(72, 38), (91, 45), (111, 37), (128, 47), (148, 38), (160, 45)]:
    lower.rect(x, y, 3, 6, "#2c6847")
    lower.rect(x - 3, y + 1, 3, 2, "#5ba35b")
    lower.rect(x + 3, y + 2, 3, 2, "#70b45e")
    lower.rect(x - 1, y - 2, 2, 2, "#91c96b")
lower.rect(63, 51, 101, 3, "#bda48d")
lower.rect(66, 54, 95, 2, "#5c5362")
for x in range(65, 163, 12):
    lower.rect(x, 52, 6, 2, "#d8c1a4")
    lower.rect(x + 6, 53, 3, 1, "#8f7c75")

# 6: department wayfinding sign, 96×64 source pixels = 48×32 world pixels.
lower.ellipse(224, 58, 42, 4, "#172b3a80")
lower.rect(220, 20, 8, 38, "#283852")
lower.rect(224, 22, 3, 33, "#7690b2")
lower.rect(184, 9, 89, 24, "#182a4e")
lower.rect(187, 7, 83, 22, "#244b7b")
lower.rect(190, 10, 77, 16, "#2875a6")
lower.rect(194, 12, 60, 3, "#b9ecff")
lower.rect(194, 19, 55, 2, "#81c8ec")
lower.poly([(255, 14), (263, 18), (255, 22)], "#fff0a2")
lower.rect(181, 6, 4, 28, "#a7d8fa")
lower.rect(272, 10, 4, 21, "#84bcf0")

a.blit(lower, 0, 80)

print(a.stats_text())
print(save("hospital-props", canvas=a, scales=(1, 2)))
