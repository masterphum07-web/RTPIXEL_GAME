# Original two-times pixel-art assets for the radiography training room.
# Run with the installed astra-pixel-art skill's pixelart.py exec --file.
S = 2
W, H = 320 * S, 180 * S

# Room surfaces: individually shaded wall panels, observation window and tiled floor.
wall = new_canvas(W, H, name="xray-room-walls")
wall.rect(0, 0, W, H, "#26365F")
wall.rect(0, 20*S, W, 127*S, "#8999BF")
wall.rect(0, 20*S, W, 5*S, "#F0EEE8")
wall.rect(0, 25*S, W, 2*S, "#687BA5")
for row, y in enumerate(range(28, 145, 24)):
    wall.rect(0, y*S, W, 24*S, ("#9AA8C7", "#AAB5D0", "#929FBE")[row % 3])
    wall.rect(0, y*S, W, S, "#7788AC")
    wall.rect(0, (y+1)*S, W, S, "#C3C9DC")
    for x in range((row % 2)*32, 320, 32):
        wall.rect(x*S, (y+2)*S, S, 21*S, "#7F8FB3")
        wall.rect((x+1)*S, (y+2)*S, S, 21*S, "#B5C0D8")
        wall.rect((x+2)*S, (y+4)*S, 27*S, S, "#AAB5CE")
        wall.rect((x+3)*S, (y+5)*S, 24*S, S, "#D0D5E3")

# Long ceiling light with a warm bounce and crisp blue glass edge.
wall.rect(4*S, 29*S, 61*S, 7*S, "#66799F")
wall.rect(5*S, 29*S, 59*S, 4*S, "#E2EBF4")
wall.rect(7*S, 30*S, 55*S, 2*S, "#FFF8E9")
wall.rect(8*S, 33*S, 52*S, S, "#80C6E5")
for x in range(12, 61, 12):
    wall.rect(x*S, 34*S, 4*S, S, "#D1F4FF")

# Observation glass; silhouettes beyond the window use multiple depth values.
wall.rect(3*S, 47*S, 73*S, 52*S, "#17223D")
wall.rect(5*S, 49*S, 69*S, 48*S, "#CAD5E6")
wall.rect(7*S, 51*S, 65*S, 44*S, "#28507A")
wall.rect(9*S, 53*S, 61*S, 39*S, "#1D345C")
wall.rect(10*S, 55*S, 59*S, 4*S, "#315D86")
for x, top, h, col in [(12,68,19,"#385477"),(18,62,25,"#233D68"),(27,70,17,"#416184"),(48,66,23,"#26436D"),(58,59,30,"#385983")]:
    wall.rect(x*S, top*S, 5*S, h*S, col)
    wall.rect((x+S)*S//S, (top+2)*S, 2*S, (h-4)*S, "#4C7196")
wall.rect(38*S, 52*S, 2*S, 42*S, "#D7E0ED")
wall.rect(6*S, 49*S, 69*S, 2*S, "#F0EEE8")
wall.rect(6*S, 95*S, 69*S, 2*S, "#F0EEE8")
wall.rect(4*S, 49*S, 2*S, 49*S, "#AFC4DF")
wall.rect(75*S, 49*S, 2*S, 49*S, "#8398B8")
# Reflections and a hint of a neighboring control room.
wall.poly([(12*S,55*S),(20*S,55*S),(35*S,92*S),(29*S,92*S)], "#6EB7DC")
wall.rect(46*S, 58*S, 19*S, 14*S, "#182A4E")
wall.rect(48*S, 60*S, 15*S, 9*S, "#2D73AA")
wall.rect(50*S, 62*S, 4*S, 2*S, "#9DF4F4")
wall.rect(56*S, 62*S, 5*S, 2*S, "#80C6E5")
wall.rect(48*S, 71*S, 15*S, 2*S, "#D8DFE9")

# Safety poster with an original radiation trefoil, paper edge and pinned corners.
wall.rect(81*S, 52*S, 42*S, 51*S, "#6A7190")
wall.rect(82*S, 53*S, 40*S, 49*S, "#F0E5CF")
wall.rect(84*S, 55*S, 36*S, 45*S, "#F8EED9")
wall.rect(86*S, 58*S, 30*S, 2*S, "#34466E")
wall.rect(86*S, 62*S, 24*S, 2*S, "#49618A")
wall.rect(86*S, 66*S, 27*S, 2*S, "#49618A")
wall.rect(97*S, 74*S, 11*S, 11*S, "#F4B84F")
wall.rect(101*S, 76*S, 3*S, 6*S, "#17223D")
wall.rect(99*S, 75*S, 2*S, 3*S, "#17223D")
wall.rect(104*S, 75*S, 2*S, 3*S, "#17223D")
wall.rect(99*S, 81*S, 2*S, 3*S, "#17223D")
wall.rect(104*S, 81*S, 2*S, 3*S, "#17223D")
for y, w in [(89,20),(93,26),(97,18)]:
    wall.rect(86*S, y*S, w*S, S, "#8999BF")
wall.rect(84*S, 54*S, 2*S, 2*S, "#E76B62")
wall.rect(118*S, 54*S, 2*S, 2*S, "#E76B62")

# Wall-mounted service outlet, cable conduit and illuminated room indicator.
wall.rect(125*S, 50*S, 2*S, 42*S, "#536A98")
wall.rect(127*S, 52*S, S, 38*S, "#CFD5E3")
wall.rect(122*S, 61*S, 13*S, 19*S, "#51658D")
wall.rect(124*S, 63*S, 9*S, 15*S, "#D9DFEB")
wall.rect(126*S, 65*S, 5*S, 6*S, "#75ADD1")
wall.rect(127*S, 66*S, 3*S, 2*S, "#D3F4FF")
wall.rect(127*S, 73*S, 3*S, 3*S, "#F4B84F")

# Cool wall wash and little rivets keep the finish from reading as flat blocks.
for y in range(37, 140, 18):
    for x in range(4+(y%3)*5, 316, 29):
        wall.rect(x*S, y*S, S, S, "#DDE3EF")
        wall.rect((x+1)*S, (y+1)*S, S, S, "#7283A9")

# Glossy tiled floor, joints, reflections and floor markings.
wall.rect(0, 147*S, W, 33*S, "#354B77")
wall.rect(0, 147*S, W, 2*S, "#D0D9E8")
wall.rect(0, 149*S, W, S, "#6E83AA")
for x in range(-10, 340, 24):
    wall.rect(x*S, 151*S, S, 29*S, "#273B67")
    wall.rect((x+1)*S, 151*S, S, 29*S, "#526D9A")
for y in range(157, 180, 9):
    wall.rect(0, y*S, W, S, "#536B98")
    wall.rect(0, (y+1)*S, W, S, "#405984")
for y in range(151, 180, 6):
    for x in range(4 + (y % 2)*6, 318, 31):
        wall.rect(x*S, y*S, 5*S, S, "#8EA1C1")
        wall.rect((x+7)*S, (y+1)*S, 3*S, S, "#293D68")
for x in range(130, 238, 24):
    wall.rect(x*S, 145*S, 2*S, S, "#F4B84F")
wall.rect(130*S, 145*S, 2*S, 12*S, "#F4B84F")
wall.rect(235*S, 145*S, 2*S, 12*S, "#F4B84F")
wall.rect(18*S, 140*S, 89*S, 2*S, "#9AAED0")
wall.rect(30*S, 142*S, 54*S, S, "#6C82AB")
print(save("xray-room-walls", canvas=wall, scales=(1, 2)))

# Furniture and X-ray assembly are a separate transparent layer for depth/readability.
eq = new_canvas(W, H, name="xray-equipment")
# Cast shadows first.
eq.ellipse(184*S, 152*S, 54*S, 3*S, "#1A2C52")
eq.ellipse(111*S, 130*S, 23*S, 3*S, "#1A2C52")
eq.ellipse(267*S, 119*S, 25*S, 3*S, "#1A2C52")
# Overhead rail, ceiling mount and articulated carriage.
eq.rect(125*S, 19*S, 82*S, 7*S, "#34466E")
eq.rect(127*S, 19*S, 77*S, 2*S, "#E5E7E6")
eq.rect(130*S, 21*S, 70*S, 2*S, "#96A8C9")
eq.rect(137*S, 23*S, 4*S, 14*S, "#596C96")
eq.rect(191*S, 23*S, 4*S, 14*S, "#596C96")
eq.rect(140*S, 31*S, 56*S, 12*S, "#26385F")
eq.rect(142*S, 30*S, 52*S, 10*S, "#CFD5E3")
eq.rect(145*S, 29*S, 46*S, 3*S, "#F4F0E9")
eq.rect(148*S, 32*S, 39*S, 8*S, "#ABB8D2")
eq.rect(152*S, 33*S, 32*S, 6*S, "#E9E5DE")
eq.rect(157*S, 32*S, 21*S, 7*S, "#263B69")
eq.rect(159*S, 34*S, 17*S, 3*S, "#2D73AA")
eq.rect(161*S, 34*S, 4*S, S, "#C9F3FF")
eq.rect(167*S, 34*S, 5*S, S, "#80C6E5")
eq.rect(164*S, 40*S, 6*S, 12*S, "#50648F")
eq.rect(161*S, 50*S, 12*S, 6*S, "#2E3F6B")
eq.rect(162*S, 51*S, 10*S, 3*S, "#AAB8D3")
eq.rect(164*S, 55*S, 6*S, 3*S, "#E5E5E1")
eq.rect(166*S, 58*S, 2*S, 6*S, "#475B83")
# Tube collimator face: layered housing and amber caution lamp.
eq.rect(158*S, 56*S, 18*S, 4*S, "#34466E")
eq.rect(160*S, 59*S, 14*S, 3*S, "#91A1C1")
eq.rect(163*S, 61*S, 8*S, 2*S, "#34466E")
eq.rect(165*S, 62*S, 4*S, S, "#F4B84F")
# Detector bucky / upright stand to the right of the patient.
eq.rect(202*S, 68*S, 6*S, 47*S, "#34466E")
eq.rect(204*S, 70*S, 3*S, 41*S, "#8A9BB9")
eq.rect(206*S, 71*S, S, 37*S, "#D7E0ED")
eq.rect(208*S, 77*S, 4*S, 28*S, "#526D9A")
eq.rect(209*S, 80*S, 2*S, 22*S, "#C1D3E4")
eq.rect(200*S, 111*S, 12*S, 5*S, "#2A3D69")
eq.rect(199*S, 115*S, 15*S, 2*S, "#536891")
# Patient table / detector surface with pale cushion, rails, lift and articulated base.
eq.rect(128*S, 116*S, 111*S, 8*S, "#26375E")
eq.rect(130*S, 113*S, 108*S, 6*S, "#374A76")
eq.rect(132*S, 111*S, 104*S, 4*S, "#E6E6E1")
eq.rect(134*S, 110*S, 100*S, 2*S, "#F5F1E8")
eq.rect(136*S, 109*S, 95*S, S, "#AFC5DF")
eq.rect(135*S, 115*S, 101*S, 2*S, "#D0D5DE")
eq.rect(143*S, 122*S, 85*S, 4*S, "#7184AA")
eq.rect(151*S, 126*S, 68*S, 5*S, "#465B87")
eq.rect(159*S, 130*S, 53*S, 11*S, "#8190B1")
eq.rect(162*S, 131*S, 47*S, 2*S, "#CCD5E3")
eq.rect(165*S, 141*S, 7*S, 9*S, "#40547D")
eq.rect(202*S, 141*S, 7*S, 9*S, "#40547D")
eq.rect(158*S, 150*S, 16*S, 3*S, "#26375E")
eq.rect(199*S, 150*S, 16*S, 3*S, "#26375E")
eq.rect(130*S, 120*S, 5*S, 2*S, "#F4B84F")
eq.rect(233*S, 120*S, 5*S, 2*S, "#F4B84F")
# Foot pedal, control cable and neatly clipped cable run.
eq.rect(184*S, 138*S, 2*S, 11*S, "#263B69")
eq.rect(180*S, 148*S, 10*S, 3*S, "#374A76")
eq.rect(181*S, 148*S, 7*S, S, "#85C9E2")
# Console: angled top, luminous display, key clusters and tactile controls.
eq.poly([(92*S,99*S),(119*S,95*S),(130*S,101*S),(103*S,106*S)], "#293A68")
eq.poly([(94*S,98*S),(119*S,95*S),(127*S,100*S),(103*S,104*S)], "#D5DBE5")
eq.poly([(98*S,98*S),(118*S,96*S),(124*S,99*S),(104*S,102*S)], "#152956")
eq.poly([(101*S,98*S),(117*S,97*S),(121*S,99*S),(105*S,101*S)], "#4A91BE")
for i in range(4):
    for j in range(2):
        eq.rect((103+i*4)*S, (98+j*2)*S, 2*S, S, ("#9DF4F4", "#80C6E5")[i%2])
eq.rect(99*S, 105*S, 29*S, 4*S, "#586B95")
eq.rect(98*S, 108*S, 31*S, 18*S, "#354B77")
eq.rect(100*S, 109*S, 27*S, 14*S, "#92A1BE")
eq.rect(102*S, 110*S, 22*S, 10*S, "#24365F")
for x in (104,110,116,122):
    eq.rect(x*S, 111*S, 3*S, 2*S, "#45BBDD")
    eq.rect(x*S, 115*S, 3*S, 2*S, "#83E1EC")
eq.rect(100*S, 123*S, 27*S, 3*S, "#DADCD9")
eq.rect(105*S, 126*S, 16*S, 3*S, "#7889AA")
eq.rect(108*S, 129*S, 10*S, 4*S, "#354B77")
eq.rect(102*S, 133*S, 22*S, 3*S, "#26375E")
eq.rect(104*S, 133*S, 18*S, S, "#D4DCE7")
# Shelves and equipment caddy with trays, drawers and tiny supplies.
eq.rect(244*S, 87*S, 43*S, 4*S, "#604D4C")
eq.rect(246*S, 88*S, 39*S, 2*S, "#B48A70")
eq.rect(247*S, 91*S, 3*S, 21*S, "#435780")
eq.rect(281*S, 91*S, 3*S, 21*S, "#435780")
eq.rect(246*S, 112*S, 39*S, 4*S, "#35466E")
eq.rect(248*S, 94*S, 13*S, 15*S, "#2A416A")
eq.rect(250*S, 96*S, 9*S, 10*S, "#6384AA")
eq.rect(251*S, 97*S, 2*S, 6*S, "#A7D8E8")
eq.rect(264*S, 96*S, 10*S, 13*S, "#536D98")
eq.rect(266*S, 98*S, 6*S, 8*S, "#C4D0DF")
eq.rect(268*S, 100*S, 2*S, 4*S, "#6EB7D1")
eq.rect(276*S, 93*S, 6*S, 16*S, "#7287AA")
eq.rect(277*S, 95*S, 4*S, 10*S, "#E1E5E7")
eq.rect(279*S, 96*S, 2*S, 6*S, "#84B6D1")
# Mobile instrument cart in the right foreground.
eq.rect(255*S, 120*S, 31*S, 3*S, "#26375E")
eq.rect(258*S, 123*S, 2*S, 12*S, "#65789F")
eq.rect(282*S, 123*S, 2*S, 12*S, "#65789F")
eq.rect(256*S, 134*S, 4*S, 3*S, "#202F50")
eq.rect(280*S, 134*S, 4*S, 3*S, "#202F50")
eq.rect(258*S, 112*S, 26*S, 9*S, "#293D68")
eq.rect(260*S, 114*S, 22*S, 5*S, "#5A729B")
eq.rect(261*S, 115*S, 13*S, 2*S, "#2D73AA")
eq.rect(276*S, 114*S, 4*S, 4*S, "#E2E7EA")
# A plant softens the sterile room; pot and leaves have separate value groups.
eq.ellipse(266*S, 84*S, 12*S, 2*S, "#26375E")
eq.rect(259*S, 75*S, 16*S, 9*S, "#7C594F")
eq.rect(261*S, 77*S, 12*S, 5*S, "#A67962")
eq.rect(263*S, 74*S, 8*S, 2*S, "#E2C9AB")
for x,y,w,h,col in [(264,68,3,8,"#328456"),(258,67,8,3,"#398C58"),(267,65,10,4,"#3F995F"),(260,61,7,7,"#55A96A"),(270,60,8,5,"#46965E"),(253,70,8,3,"#64B574"),(267,72,10,3,"#318052"),(263,56,5,7,"#73BF77")]:
    eq.rect(x*S, y*S, w*S, h*S, col)
eq.rect(264*S, 60*S, 2*S, 10*S, "#285A45")
eq.rect(256*S, 70*S, 5*S, S, "#88CF83")
eq.rect(273*S, 64*S, 4*S, S, "#8BD48A")
print(save("xray-equipment", canvas=eq, scales=(1, 2)))

# Consistent 44×56 logical-pixel frames; every actor shares the baseline and size.
FRAME_W, FRAME_H = 88, 112
actors = new_canvas(FRAME_W*5, FRAME_H, name="xray-actors")
INK="#17223D"; HAIR="#292532"; HAIR_MID="#57404A"; HAIR_LIT="#957075"
SKIN="#F4C7AC"; SKIN_SHADOW="#D69583"; BLUE="#274F9A"; BLUE_MID="#3473C2"; BLUE_LIT="#73CFF0"
COAT="#EDF1F4"; COAT_SHADE="#BCCBDD"; PANTS="#354B77"; SHOE="#E5EAF0"

def actor_rect(frame, x,y,w,h,c):
    actors.rect(frame*FRAME_W+x, y, w, h, c)

def person(frame, outfit="patient", pose="rest", walk=0):
    # Soft grounded shadow.
    actor_rect(frame, 14, 104, 60, 6, "#263655")
    actor_rect(frame, 19, 104, 50, 3, "#40577E")
    # Legs and shoes with shared grounded baseline.
    shift = walk
    actor_rect(frame, 30-shift, 80, 11, 23, PANTS if outfit=="patient" else BLUE)
    actor_rect(frame, 48+shift, 80, 11, 23, PANTS if outfit=="patient" else BLUE)
    actor_rect(frame, 28-shift, 99, 16, 7, SHOE)
    actor_rect(frame, 47+shift, 99, 17, 7, SHOE)
    actor_rect(frame, 30-shift, 104, 15, 2, INK)
    actor_rect(frame, 49+shift, 104, 16, 2, INK)
    # Neck, collar and connected torso silhouette.
    actor_rect(frame, 36, 42, 16, 12, SKIN_SHADOW)
    actor_rect(frame, 38, 43, 12, 10, SKIN)
    if outfit=="patient":
        actor_rect(frame, 25, 52, 39, 32, INK)
        actor_rect(frame, 27, 53, 35, 29, "#D5E1F1")
        actor_rect(frame, 30, 54, 29, 25, "#EFF4F6")
        actor_rect(frame, 39, 54, 10, 26, "#C5D5EA")
        actor_rect(frame, 32, 58, 4, 3, "#A8BEE0")
        actor_rect(frame, 51, 61, 4, 3, "#91ACD5")
        actor_rect(frame, 35, 69, 3, 2, "#A8BEE0")
        actor_rect(frame, 47, 74, 4, 2, "#91ACD5")
        actor_rect(frame, 29, 80, 32, 3, "#AFC6E0")
    else:
        actor_rect(frame, 24, 52, 41, 33, INK)
        actor_rect(frame, 27, 53, 35, 29, BLUE)
        actor_rect(frame, 30, 54, 14, 27, BLUE_MID)
        actor_rect(frame, 47, 55, 12, 25, "#2B5AA1")
        actor_rect(frame, 43, 56, 4, 26, "#C8E9F3")
        actor_rect(frame, 43, 60, 4, 7, "#E5F1F5")
        actor_rect(frame, 35, 68, 4, 2, "#F4B84F")
        actor_rect(frame, 49, 69, 8, 2, "#1D3D77")
    # Arms are drawn into connected shoulder / sleeve / hand shapes.
    if pose == "clinical" and outfit == "patient":
        for x in (20, 57):
            actor_rect(frame, x, 51, 12, 10, INK)
            actor_rect(frame, x+2, 52, 8, 8, "#D5E1F1")
            actor_rect(frame, x+3, 46, 6, 13, "#C5D5EA")
            actor_rect(frame, x+4, 39, 5, 10, SKIN_SHADOW)
            actor_rect(frame, x+5, 39, 3, 8, SKIN)
            actor_rect(frame, x+3, 37, 7, 4, SKIN)
    elif outfit=="tech":
        actor_rect(frame, 16, 56, 17, 12, INK)
        actor_rect(frame, 18, 57, 12, 8, BLUE_MID)
        actor_rect(frame, 17, 63, 10, 10, BLUE)
        actor_rect(frame, 58, 56, 12, 10, INK)
        actor_rect(frame, 60, 57, 8, 7, BLUE_MID)
        actor_rect(frame, 62, 62, 6, 13, SKIN_SHADOW)
        actor_rect(frame, 63, 63, 4, 10, SKIN)
        actor_rect(frame, 66, 62, 8, 4, SKIN)
    else:
        actor_rect(frame, 17, 55, 12, 18, INK)
        actor_rect(frame, 19, 56, 8, 14, "#D5E1F1" if outfit=="patient" else BLUE_MID)
        actor_rect(frame, 21, 67, 6, 14, SKIN_SHADOW)
        actor_rect(frame, 22, 68, 4, 11, SKIN)
        actor_rect(frame, 60, 56, 10, 16, INK)
        actor_rect(frame, 61, 57, 7, 12, "#D5E1F1" if outfit=="patient" else BLUE_MID)
        actor_rect(frame, 62, 68, 6, 13, SKIN_SHADOW)
        actor_rect(frame, 63, 69, 4, 10, SKIN)
    # Clear the first-pass head, then redraw a stepped silhouette with cheeks and chin.
    actors.clear(frame*FRAME_W+25, 12, 40, 36)
    for x,y,w,h in [(36,13,16,3),(32,15,24,3),(29,18,30,3),(27,21,34,8),
                    (28,29,32,6),(30,35,28,5),(34,40,20,4),(38,44,12,2)]:
        actor_rect(frame,x,y,w,h,INK)
    # Soft warm face plane with a lighter forehead and cheek highlights.
    for x,y,w,h,c in [(34,21,24,3,SKIN_SHADOW),(32,24,28,11,SKIN_SHADOW),
                      (34,34,24,6,SKIN_SHADOW),(37,39,18,5,SKIN_SHADOW),
                      (35,23,22,12,SKIN),(36,25,20,9,"#F7D5BB"),
                      (36,34,20,5,SKIN),(39,39,14,3,SKIN),
                      (34,28,2,4,"#E8AE9E"),(58,28,2,4,"#E8AE9E")]:
        actor_rect(frame,x,y,w,h,c)
    # Ears sit under the side locks; neck remains attached to the jaw.
    actor_rect(frame, 29, 29, 4, 7, SKIN_SHADOW)
    actor_rect(frame, 59, 29, 4, 7, SKIN_SHADOW)
    actor_rect(frame, 30, 30, 2, 4, SKIN)
    actor_rect(frame, 60, 30, 2, 4, SKIN)
    # Layered cap and separated fringe locks make the student silhouette distinct.
    for x,y,w,h,c in [(28,19,9,12,INK),(32,15,28,8,INK),(49,16,15,11,INK),
                       (26,24,6,10,INK),(58,22,7,12,INK),
                       (31,17,14,5,HAIR_MID),(40,14,13,5,HAIR_MID),(51,17,9,5,HAIR_MID),
                       (29,22,8,5,HAIR_MID),(54,22,8,5,HAIR_MID),
                       (35,16,5,2,HAIR_LIT),(44,15,4,2,HAIR_LIT),(52,19,4,2,HAIR_LIT),
                       (29,29,4,5,HAIR_MID),(60,28,4,5,HAIR_MID)]:
        actor_rect(frame,x,y,w,h,c)
    # Reopen the face below the fringe; anime eyes have an outline, iris and catchlight.
    actor_rect(frame, 36, 27, 20, 11, SKIN)
    actor_rect(frame, 37, 28, 18, 8, "#F7D5BB")
    actor_rect(frame, 36, 29, 6, 2, INK)
    actor_rect(frame, 50, 29, 6, 2, INK)
    actor_rect(frame, 37, 30, 4, 4, "#31517D")
    actor_rect(frame, 51, 30, 4, 4, "#31517D")
    actor_rect(frame, 38, 30, 2, 2, "#F7F5EF")
    actor_rect(frame, 52, 30, 2, 2, "#F7F5EF")
    actor_rect(frame, 44, 34, 3, 2, SKIN_SHADOW)
    actor_rect(frame, 43, 38, 5, 2, "#A65F69")
    actor_rect(frame, 40, 41, 11, S, "#F4DECE")

# Patient walk frames, neutral rest, connected arm-up posture, and radiographer at console.
person(0, "patient", "rest", walk=3)
person(1, "patient", "rest", walk=-3)
person(2, "patient", "rest")
person(3, "patient", "clinical")
person(4, "tech", "profile")
print(save("xray-actors-strip", canvas=actors, scales=(1, 2)))
