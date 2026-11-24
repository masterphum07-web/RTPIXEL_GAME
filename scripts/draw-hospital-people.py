# Original 4x-source anime pixel-art characters for the hospital tile RPG.
# Frames are laid out as six character rows × four facings × four walk frames.
# Run via the installed Astra Pixel Art skill's pixelart.py exec --file.

UNIT = 4
FW, FH = 32 * UNIT, 48 * UNIT
KINDS, DIRECTIONS, CYCLES = 6, 4, 4
sheet = new_canvas(FW * DIRECTIONS * CYCLES, FH * KINDS, name="hospital-people")

OUT = "#19233C"
INK = "#28243A"
HAIR = "#342B39"
HAIR_SHADOW = "#211F31"
HAIR_MID = "#674752"
HAIR_LIGHT = "#A06D70"
SKIN_DARK = "#C47E73"
SKIN = "#E9AA91"
SKIN_LIGHT = "#F7C8AA"
SKIN_GLOW = "#FFE0C3"
EYE = "#233A62"
EYE_BLUE = "#4F82AE"
WHITE = "#F4F3EB"
COAT = "#E7EDF0"
COAT_SHADE = "#AABDD0"
COAT_DARK = "#637A9C"
NAVY = "#24385F"
BLUE = "#2A5797"
BLUE_MID = "#397BC0"
BLUE_LIGHT = "#7BC7E5"
MINT = "#59BFAE"
GOLD = "#F2C55D"
SHADOW = "#293754"

PALETTES = [
    # Maya, senior radiographer: long auburn hair and a fitted white coat.
    dict(hair="#4A3039", dark="#272333", mid="#85545B", light="#C1827A", skin="#F5C3A6",
         top="#F0F2EC", shade="#B9C8D3", trim="#56B7D3", pants="#30466F", role="coat", hairStyle="long", detail="#DAEBF1"),
    # Reception nurse: chestnut bob, nurse cap and sea-glass trim.
    dict(hair="#59363A", dark="#292434", mid="#9A6264", light="#D29583", skin="#F2C2A1",
         top="#F4F3EA", shade="#B8CAD5", trim="#4BB4BF", pants="#476180", role="nurse", hairStyle="bob", detail="#D85C69"),
    # Player: dark textured hair, deep blue student scrubs and an ID badge.
    dict(hair="#2A2634", dark="#1B1D2F", mid="#5D4854", light="#9A7378", skin="#F1BE9D",
         top="#28569C", shade="#193B70", trim="#66D8EF", pants="#243B68", role="student", hairStyle="short", detail="#E9F2EF"),
    # Patient: pale patterned gown with soft blue folds and a clear silhouette.
    dict(hair="#44323A", dark="#242333", mid="#79525A", light="#AF7A76", skin="#F2C3A5",
         top="#E7EFF3", shade="#A9BBD2", trim="#7CA9D2", pants="#657995", role="patient", hairStyle="short", detail="#D3E6F5"),
    # Librarian: warm layered hair and a distinctive teal uniform accent.
    dict(hair="#63413B", dark="#312838", mid="#A36D5E", light="#D09A78", skin="#F4C4A6",
         top="#F0F3F1", shade="#B9CDD1", trim="#54C6B1", pants="#466B70", role="librarian", hairStyle="long", detail="#B9F0DE"),
    # Radiologist: charcoal hair, white coat, tie and slim glasses.
    dict(hair="#272735", dark="#1D2031", mid="#57566B", light="#8A8291", skin="#EAB899",
         top="#EEF2F4", shade="#AEBCCF", trim="#4E9EC6", pants="#394A6A", role="doctor", hairStyle="neat", detail="#C9E7F1"),
]

def xy(frame, x, y):
    col = frame % (DIRECTIONS * CYCLES)
    row = frame // (DIRECTIONS * CYCLES)
    return col * FW + x * UNIT, row * FH + y * UNIT

def rect(frame, x, y, w, h, colour):
    px, py = xy(frame, x, y)
    sheet.rect(px, py, w * UNIT, h * UNIT, colour)

def poly(frame, points, colour):
    ox, oy = xy(frame, 0, 0)
    sheet.poly([(ox + x * UNIT, oy + y * UNIT) for x, y in points], colour)

def line(frame, x1, y1, x2, y2, colour):
    ox, oy = xy(frame, 0, 0)
    sheet.line(ox + x1 * UNIT, oy + y1 * UNIT, ox + x2 * UNIT, oy + y2 * UNIT, colour)

def character(frame, kind, direction, stride):
    pal = PALETTES[kind]
    bob = 1 if stride in (1, 3) else 0
    left_step, right_step = ((0, 0), (-2, 2), (0, 0), (2, -2))[stride]

    # Ground shadow stays under the foot line through every frame.
    sheet.ellipse(*[v * UNIT for v in xy(frame, 16, 45)], 42, 8, "#1A2940")
    sheet.ellipse(*[v * UNIT for v in xy(frame, 16, 44)], 29, 4, "#435978")

    # Rear hair and back silhouette are painted first to keep the head connected.
    if direction in (0, 2, 3):
        if pal["hairStyle"] == "long":
            poly(frame, [(8,13),(7,7),(10,3),(15,2),(21,4),(25,9),(25,17),(23,26),(20,31),(17,27),(14,28),(11,32),(9,27),(7,20)], pal["dark"])
            poly(frame, [(9,12),(10,6),(14,4),(20,5),(23,10),(23,18),(21,25),(19,27),(18,20),(15,18),(12,25),(10,21)], pal["hair"])
            poly(frame, [(8,18),(10,20),(10,27),(8,25)], pal["mid"])
            poly(frame, [(21,17),(23,18),(22,25),(20,28)], pal["mid"])
        else:
            poly(frame, [(8,12),(8,7),(11,4),(15,2),(20,3),(24,7),(25,13),(23,20),(20,24),(12,24),(9,20)], pal["dark"])
            poly(frame, [(9,10),(11,5),(15,4),(20,5),(23,9),(23,15),(20,19),(12,19),(9,16)], pal["hair"])

    # Legs and chunky shoes: separate lit edge, crease, toe and sole pixels.
    if direction == 1:
        poly(frame, [(10+left_step,35+bob),(15+left_step,35+bob),(15,44),(10,44)], pal["pants"])
        poly(frame, [(17+right_step,35+bob),(22+right_step,35+bob),(22,44),(17,44)], pal["pants"])
        line(frame, 11+left_step, 37+bob, 12+left_step, 42, "#879ABA")
        line(frame, 19+right_step, 37+bob, 20+right_step, 42, "#879ABA")
    else:
        poly(frame, [(10+left_step,35+bob),(15+left_step,35+bob),(15,44),(10,44)], pal["pants"])
        poly(frame, [(17+right_step,35+bob),(22+right_step,35+bob),(22,44),(17,44)], pal["pants"])
        line(frame, 11+left_step, 37+bob, 12+left_step, 42, "#8394B2")
        line(frame, 19+right_step, 37+bob, 20+right_step, 42, "#8394B2")
    poly(frame, [(8+left_step,42),(15+left_step,42),(16,45),(8,45)], "#202B43")
    poly(frame, [(17+right_step,42),(24+right_step,42),(25,45),(17,45)], "#202B43")
    poly(frame, [(9+left_step,42),(14+left_step,42),(15,44),(9,44)], "#EAECE7")
    poly(frame, [(18+right_step,42),(23+right_step,42),(24,44),(18,44)], "#EAECE7")
    line(frame, 10+left_step, 43, 13+left_step, 43, "#B9D5DF")
    line(frame, 19+right_step, 43, 22+right_step, 43, "#B9D5DF")

    # Neck and shoulders use stepped silhouettes rather than a block torso.
    poly(frame, [(13,20+bob),(19,20+bob),(20,25+bob),(17,27+bob),(12,25+bob)], SKIN_DARK)
    poly(frame, [(14,21+bob),(18,21+bob),(18,25+bob),(14,25+bob)], pal["skin"])
    poly(frame, [(8,24+bob),(11,22+bob),(15,23+bob),(17,25+bob),(20,23+bob),(24,25+bob),(24,36+bob),(21,39+bob),(10,39+bob),(7,36+bob)], OUT)
    poly(frame, [(9,25+bob),(12,24+bob),(15,25+bob),(17,27+bob),(20,25+bob),(23,26+bob),(23,35+bob),(21,37+bob),(10,37+bob),(8,35+bob)], pal["top"])
    poly(frame, [(9,27+bob),(12,25+bob),(14,27+bob),(13,35+bob),(10,36+bob)], pal["shade"])
    poly(frame, [(22,27+bob),(23,28+bob),(22,35+bob),(20,36+bob),(20,28+bob)], pal["shade"])
    line(frame, 10, 27+bob, 10, 34+bob, WHITE)

    # Role-specific uniform details: collar/lapels, seams, pockets and ID badges.
    if pal["role"] in ("coat", "doctor", "librarian"):
        poly(frame, [(12,24+bob),(16,27+bob),(14,31+bob),(11,27+bob)], WHITE)
        poly(frame, [(20,24+bob),(17,27+bob),(19,31+bob),(22,27+bob)], pal["shade"])
        line(frame, 16, 27+bob, 16, 36+bob, pal["trim"])
        line(frame, 18, 28+bob, 18, 36+bob, "#F8FBF5")
        rect(frame, 10, 31+bob, 3, 4, pal["detail"])
        rect(frame, 20, 31+bob, 2, 3, pal["shade"])
        line(frame, 11, 35+bob, 13, 35+bob, pal["trim"])
    elif pal["role"] == "student":
        poly(frame, [(11,25+bob),(16,27+bob),(21,25+bob),(22,35+bob),(20,37+bob),(11,37+bob),(9,35+bob)], pal["top"])
        line(frame, 16, 27+bob, 16, 36+bob, pal["trim"])
        line(frame, 12, 29+bob, 14, 30+bob, "#7DADE0")
        rect(frame, 19, 30+bob, 3, 4, "#F3F2E9")
        rect(frame, 20, 31+bob, 1, 2, "#5C92BE")
        line(frame, 11, 34+bob, 14, 35+bob, pal["shade"])
    elif pal["role"] == "patient":
        poly(frame, [(10,25+bob),(13,24+bob),(16,27+bob),(19,24+bob),(22,26+bob),(23,36+bob),(20,38+bob),(10,38+bob),(8,36+bob)], pal["top"])
        line(frame, 11, 28+bob, 12, 35+bob, "#FFFFFF")
        line(frame, 21, 28+bob, 20, 35+bob, "#8CA9CA")
        for x,y in [(11,29),(20,30),(13,33),(19,35),(10,36)]: rect(frame, x, y+bob, 1, 1, pal["trim"])
        line(frame, 14, 27+bob, 18, 27+bob, pal["shade"])
    elif pal["role"] == "nurse":
        poly(frame, [(11,25+bob),(16,27+bob),(21,25+bob),(23,35+bob),(20,37+bob),(11,37+bob),(9,35+bob)], pal["top"])
        line(frame, 16, 27+bob, 16, 36+bob, pal["trim"])
        rect(frame, 10, 31+bob, 3, 4, "#D7EFF0")
        rect(frame, 20, 30+bob, 2, 4, pal["shade"])
        rect(frame, 15, 32+bob, 2, 2, "#FFFFFF")
        rect(frame, 15, 31+bob, 2, 4, pal["detail"])

    # Walking arms counter-swing from the feet; sleeves remain attached at shoulders.
    swing = (0, 2, 0, -2)[stride]
    if direction in (2, 3):
        armX = 8 if direction == 2 else 22
        rect(frame, armX, 26+bob+swing, 3, 8, pal["shade"])
        rect(frame, armX, 31+bob+swing, 3, 5, pal["skin"])
        rect(frame, armX, 32+bob+swing, 1, 3, SKIN_GLOW)
    else:
        leftArm = 7+swing
        rightArm = 23-swing
        poly(frame, [(8,25+bob),(11,26+bob),(10,33+bob+swing),(8,35+bob+swing),(6,33+bob+swing)], pal["shade"])
        poly(frame, [(22,25+bob),(24,26+bob),(26,32+bob-swing),(24,35+bob-swing),(22,33+bob-swing)], pal["shade"])
        line(frame, 7, 28+bob+swing, 8, 32+bob+swing, "#E9F0F0")
        line(frame, 24, 28+bob-swing, 25, 32+bob-swing, "#E9F0F0")
        rect(frame, 7, 34+bob+swing, 2, 3, pal["skin"])
        rect(frame, 24, 34+bob-swing, 2, 3, pal["skin"])

    # Face and hair planes are independently shaped in each facing.
    if direction == 1:
        # North-facing: layered hair, back-of-coat seam and collar.
        poly(frame, [(8,13),(7,8),(10,4),(15,2),(21,4),(25,9),(24,17),(21,23),(19,22),(18,18),(13,18),(11,22),(9,20)], pal["dark"])
        poly(frame, [(9,11),(10,6),(14,4),(19,4),(23,8),(23,15),(20,19),(12,19),(9,16)], pal["hair"])
        poly(frame, [(10,9),(13,5),(18,5),(22,8),(18,7),(14,9)], pal["mid"])
        line(frame, 13, 25+bob, 19, 25+bob, "#FFFFFF")
        if kind == 1: rect(frame, 13, 3, 6, 2, pal["detail"])
        if kind == 5:
            line(frame, 13, 28+bob, 19, 28+bob, pal["trim"])
    else:
        # Ear, shadow cheek, face highlight, jaw and chin.
        poly(frame, [(9,11),(7,10),(7,15),(9,18)], SKIN_DARK)
        poly(frame, [(23,11),(25,10),(25,15),(23,18)], SKIN_DARK)
        poly(frame, [(10,8),(13,6),(19,6),(22,9),(23,14),(22,19),(19,22),(16,23),(12,21),(9,17),(9,11)], INK)
        poly(frame, [(10,10),(13,8),(19,8),(21,10),(22,15),(20,19),(17,21),(13,20),(10,17)], pal["skin"])
        poly(frame, [(12,9),(18,9),(20,11),(19,13),(13,13),(11,12)], SKIN_GLOW)
        line(frame, 10, 14, 11, 16, "#F6C9AE")
        line(frame, 21, 15, 20, 17, SKIN_DARK)

        if direction == 0:
            # Frontal eyes with layered iris, lash and distinct catchlights.
            line(frame, 11, 14, 14, 14, INK)
            line(frame, 18, 14, 21, 14, INK)
            rect(frame, 12, 15, 2, 3, EYE)
            rect(frame, 19, 15, 2, 3, EYE)
            rect(frame, 12, 15, 1, 1, "#FFFFFF")
            rect(frame, 19, 15, 1, 1, "#FFFFFF")
            rect(frame, 13, 17, 1, 1, EYE_BLUE)
            rect(frame, 20, 17, 1, 1, EYE_BLUE)
            rect(frame, 15, 17, 2, 1, SKIN_DARK)
            line(frame, 14, 20, 18, 20, "#A85E68")
            rect(frame, 13, 19, 2, 1, "#E88E8F")
        elif direction == 2:
            rect(frame, 11, 14, 3, 3, EYE)
            rect(frame, 11, 14, 1, 1, "#FFFFFF")
            rect(frame, 16, 17, 2, 1, SKIN_DARK)
            line(frame, 13, 20, 17, 20, "#A85E68")
        else:
            rect(frame, 18, 14, 3, 3, EYE)
            rect(frame, 20, 14, 1, 1, "#FFFFFF")
            rect(frame, 16, 17, 2, 1, SKIN_DARK)
            line(frame, 15, 20, 19, 20, "#A85E68")

        # Hair fringe overlaps the forehead but does not hide the eyes.
        if pal["hairStyle"] == "long":
            poly(frame, [(8,12),(7,8),(10,4),(14,2),(20,3),(24,7),(25,12),(22,10),(20,11),(18,8),(15,12),(13,9),(11,13)], pal["dark"])
            poly(frame, [(9,8),(12,4),(17,4),(21,6),(23,9),(19,8),(17,10),(14,8),(11,11)], pal["mid"])
            line(frame, 10, 8, 12, 6, pal["light"])
            line(frame, 15, 6, 18, 5, pal["light"])
            if direction in (2,3):
                poly(frame, [(8,12),(7,17),(8,26),(10,28),(11,23),(10,18)], pal["hair"])
                line(frame, 9, 18, 9, 24, pal["mid"])
        else:
            poly(frame, [(8,12),(7,8),(10,4),(14,2),(20,3),(24,7),(25,12),(22,10),(20,11),(18,8),(15,12),(13,9),(11,13)], pal["dark"])
            poly(frame, [(9,8),(12,4),(17,4),(21,6),(23,9),(19,8),(17,10),(14,8),(11,11)], pal["mid"])
            line(frame, 10, 8, 12, 6, pal["light"])
            line(frame, 16, 6, 18, 5, pal["light"])
            if direction in (2,3):
                poly(frame, [(9,12),(8,17),(10,20),(11,16)], pal["hair"])

        if pal["hairStyle"] == "bob":
            poly(frame, [(8,12),(7,16),(8,22),(10,24),(11,19),(10,14)], pal["hair"])
            poly(frame, [(22,12),(24,15),(23,23),(21,24),(20,19),(21,14)], pal["hair"])
        if pal["hairStyle"] == "long":
            poly(frame, [(8,13),(7,18),(8,26),(10,29),(12,24),(11,18)], pal["dark"])
            poly(frame, [(22,13),(24,18),(23,27),(21,29),(20,23),(21,18)], pal["dark"])
        if kind == 1:
            # Nurse cap is a small, well-outlined accessory, not a floating block.
            poly(frame, [(11,4),(12,2),(20,2),(21,4),(19,6),(13,6)], "#F7F7EF")
            line(frame, 15, 3, 15, 5, pal["detail"])
            line(frame, 17, 3, 17, 5, pal["detail"])
            rect(frame, 15, 3, 1, 2, "#D95B68")
            rect(frame, 16, 2, 1, 4, "#D95B68")
        if kind == 5:
            line(frame, 10, 14, 14, 14, pal["detail"])
            line(frame, 18, 14, 22, 14, pal["detail"])
            line(frame, 14, 15, 18, 15, pal["detail"])

    # A few deterministic highlights tie each walk strip together at runtime size.
    if stride in (1,3):
        line(frame, 11+left_step, 38, 13+left_step, 39, "#B4C5DC")
        line(frame, 18+right_step, 38, 20+right_step, 39, "#B4C5DC")
    if direction in (0,2,3) and kind in (0,1,4):
        rect(frame, 8, 22, 2, 2, pal["light"])

for kind in range(KINDS):
    for direction in range(DIRECTIONS):
        for stride in range(CYCLES):
            frame = kind * DIRECTIONS * CYCLES + direction * CYCLES + stride
            character(frame, kind, direction, stride)

print(sheet.stats_text())
print(save("hospital-people", canvas=sheet, scales=(1, 2)))
