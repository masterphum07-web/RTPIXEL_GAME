# Stage A original character prototypes for RADTECH PIXEL.
# Drawn as 48x72 logical pixel art on a 4x canvas with Astra Pixel Art.
# Output: nine rows covering the player outfit variants and all five additional roles,
# each with 4 facings x 4 walk frames.

UNIT = 4
FW, FH = 48 * UNIT, 72 * UNIT
DIRECTIONS, CYCLES, ROWS = 4, 4, 9
sheet = new_canvas(FW * DIRECTIONS * CYCLES, FH * ROWS, name="hospital-people-stage-a")

OUT = "#17223D"
INK = "#292532"
HAIR = "#45333C"
HAIR_MID = "#71505A"
HAIR_LIT = "#A77A7B"
SKIN_SHADOW = "#D69583"
SKIN = "#F4C7AC"
SKIN_LIGHT = "#FFE0C7"
EYE = "#26395C"
EYE_LIT = "#5D91C0"
WHITE = "#EDF1F4"
WHITE_SHADE = "#BCCBDD"
NAVY = "#152956"
BLUE = "#2D73AA"
CYAN = "#56D7F3"
GOLD = "#F4B84F"
SHADOW = "#273652"

VARIANTS = [
    dict(name="player-scrubs", hair="#292532", hairDark="#191D2D", hairMid="#57404A", hairLit="#957075", skin="#F4C7AC", top="#2866A6", shade="#1B477B", trim=CYAN, pants="#20365F", outfit="scrubs", style="messy", clip="#F4B84F", tie=False),
    dict(name="player-coat", hair="#292532", hairDark="#191D2D", hairMid="#57404A", hairLit="#957075", skin="#F4C7AC", top=WHITE, shade=WHITE_SHADE, trim=CYAN, pants="#20365F", outfit="coat", style="messy", clip="#F4B84F", tie=False),
    dict(name="maya", hair="#57353A", hairDark="#302631", hairMid="#955A5E", hairLit="#D29283", skin="#F5C7AC", top=WHITE, shade="#BCCBDD", trim=CYAN, pants="#334669", outfit="coat", style="ponytail", clip=GOLD, tie=False),
    dict(name="reception", hair="#634344", hairDark="#302632", hairMid="#A16B68", hairLit="#D9A08C", skin="#F4C7AC", top="#EAF4F5", shade="#B7D0D8", trim="#54C7D3", pants="#48627F", outfit="nurse", style="bob", clip="#D85C69", tie=False),
    dict(name="patient", hair="#263347", hairDark="#192536", hairMid="#506781", hairLit="#8EAFC1", skin="#F1C7AC", top="#B9E5F0", shade="#78B9CE", trim="#F7FAF4", pants="#D7E9ED", outfit="gown", style="shortcrop", clip="#61C9DE", tie=False),
    dict(name="elias", hair="#39343B", hairDark="#252631", hairMid="#77727A", hairLit="#C4B7A5", skin="#EFC2A5", top=WHITE, shade="#B8C7D6", trim="#4CBBD7", pants="#263958", outfit="doctor", style="sidepart", clip=GOLD, tie=True),
    dict(name="nora", hair="#774536", hairDark="#392A31", hairMid="#B46B4C", hairLit="#E0A06E", skin="#F4C5A7", top="#267C80", shade="#185A68", trim="#64E0D3", pants="#243E59", outfit="engineer", style="bob", clip="#F4B84F", tie=False),
    dict(name="luna", hair="#65413D", hairDark="#3B2A35", hairMid="#A96860", hairLit="#DCA18A", skin="#F5C9AA", top="#718C78", shade="#4F6D68", trim="#EAD7AE", pants="#46566B", outfit="librarian", style="braid", clip="#E4B767", tie=False),
    dict(name="kai", hair="#604339", hairDark="#302834", hairMid="#9A6A4F", hairLit="#D2A079", skin="#F2C5A8", top="#315B84", shade="#203C68", trim="#E8B95D", pants="#263958", outfit="senior", style="swept", clip="#64D4E8", tie=False),
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

def person(frame, variant, direction, stride):
    p = VARIANTS[variant]
    bob = 1 if stride in (1, 3) else 0
    steps = ((0, 0), (-3, 3), (0, 0), (3, -3))[stride]
    sx, dx = steps

    # Contact shadow and a fixed foot baseline for every direction/frame.
    sheet.ellipse(*[v * UNIT for v in xy(frame, 24, 69)], 18 * UNIT, 3 * UNIT, "#1D2B43")
    sheet.ellipse(*[v * UNIT for v in xy(frame, 24, 68)], 12 * UNIT, 2 * UNIT, "#536A88")

    # Legs, trouser folds and shoes; stride offsets never move the baseline.
    if direction in (0, 1):
        leg_a, leg_b = 14 + sx, 27 + dx
        poly(frame, [(leg_a,52+bob),(22+sx,52+bob),(22,64),(15,65),(12+sx,60)], p["pants"])
        poly(frame, [(leg_b,52+bob),(34+dx,52+bob),(36,60),(33,65),(27+dx,63)], p["pants"])
        line(frame, 17+sx,55+bob,18+sx,61,"#8295B2")
        line(frame, 30+dx,55+bob,31+dx,61,"#8295B2")
        poly(frame, [(11+sx,63),(22,63),(24,68),(21,70),(10+sx,69)], OUT)
        poly(frame, [(27+dx,63),(37,63),(39,68),(36,70),(26+dx,69)], OUT)
        poly(frame, [(12+sx,64),(21,64),(22,67),(12+sx,67)], "#F4F3EB")
        poly(frame, [(28+dx,64),(36,64),(37,67),(28+dx,67)], "#F4F3EB")
        line(frame, 13+sx,68,19,68,"#B8D6E2")
        line(frame, 29+dx,68,35,68,"#B8D6E2")
    else:
        legx = 18 + sx
        poly(frame, [(legx,52+bob),(30+dx,52+bob),(32,64),(27,66),(17+sx,63)], p["pants"])
        line(frame, 21+sx,56+bob,22+sx,62,"#8295B2")
        poly(frame, [(17+sx,63),(29,63),(33,68),(29,70),(15+sx,69)], OUT)
        poly(frame, [(18+sx,64),(28,64),(30,67),(17+sx,67)], "#F4F3EB")
        line(frame, 19+sx,68,27,68,"#B8D6E2")

    # Neck and tailored torso silhouette.
    poly(frame, [(19,30+bob),(29,30+bob),(31,37+bob),(24,41+bob),(17,37+bob)], SKIN_SHADOW)
    poly(frame, [(21,31+bob),(27,31+bob),(28,36+bob),(24,39+bob),(20,36+bob)], p["skin"])
    poly(frame, [(12,36+bob),(17,33+bob),(23,35+bob),(25,37+bob),(29,35+bob),(36,37+bob),(39,43+bob),(37,53+bob),(33,57+bob),(15,57+bob),(10,53+bob),(9,43+bob)], OUT)
    poly(frame, [(13,37+bob),(18,35+bob),(23,37+bob),(25,39+bob),(29,37+bob),(35,38+bob),(37,43+bob),(35,52+bob),(32,55+bob),(16,55+bob),(12,52+bob),(11,43+bob)], p["top"])
    # Material shading, shoulder highlights, seams and side folds.
    poly(frame, [(13,40+bob),(17,37+bob),(20,39+bob),(19,52+bob),(15,53+bob),(12,50+bob)], p["shade"])
    poly(frame, [(34,40+bob),(36,42+bob),(34,51+bob),(31,53+bob),(31,42+bob)], p["shade"])
    line(frame, 15,39+bob,19,38+bob,"#FFFFFF")
    line(frame, 33,40+bob,35,44+bob,"#DDEAF0")
    line(frame, 16,51+bob,20,53+bob,p["trim"])

    if p["outfit"] == "coat":
        # Open coat panels over a blue scrub shirt, so the same Player head is retained.
        poly(frame, [(17,36+bob),(23,39+bob),(22,54+bob),(16,53+bob),(13,42+bob)], WHITE)
        poly(frame, [(31,36+bob),(26,39+bob),(27,54+bob),(33,53+bob),(36,42+bob)], "#DCE6EE")
        poly(frame, [(23,38+bob),(25,40+bob),(24,52+bob),(22,51+bob)], BLUE)
        line(frame, 17,39+bob,19,42+bob,CYAN)
        line(frame, 32,39+bob,30,42+bob,"#FFFFFF")
        rect(frame, 16,46+bob,4,5,"#DDEAF0")
        rect(frame, 17,47+bob,2,2,p["trim"])
        line(frame, 29,43+bob,29,50+bob,"#AEBFD0")
        if variant == 2:
            rect(frame, 30,44+bob,4,5,"#F4F5EE")
            line(frame, 31,45+bob,33,45+bob,CYAN)
    elif p["outfit"] == "nurse":
        poly(frame, [(16,37+bob),(23,39+bob),(25,41+bob),(27,39+bob),(34,37+bob),(37,44+bob),(35,53+bob),(32,55+bob),(16,55+bob),(13,52+bob),(11,44+bob)], "#F3F6F0")
        poly(frame, [(13,41+bob),(17,39+bob),(19,51+bob),(15,52+bob)], "#D1E3E7")
        poly(frame, [(34,40+bob),(36,43+bob),(33,52+bob),(30,51+bob)], "#B7D0D8")
        line(frame, 24,41+bob,24,53+bob,p["trim"])
        rect(frame, 15,46+bob,4,5,"#DDEEF0")
        line(frame, 16,47+bob,18,47+bob,"#5BBABF")
        rect(frame, 29,45+bob,4,5,"#EEF3F0")
        rect(frame, 29,45+bob,4,1,p["trim"])
        rect(frame, 23,45+bob,3,5,"#FFFFFF")
        rect(frame, 24,44+bob,1,7,p["clip"])
    else:
        # Student scrubs: cyan collar, stitched placket, pocket, ID badge.
        poly(frame, [(17,36+bob),(23,39+bob),(25,41+bob),(28,39+bob),(34,37+bob),(37,43+bob),(35,52+bob),(32,55+bob),(16,55+bob),(12,52+bob),(11,43+bob)], p["top"])
        poly(frame, [(20,37+bob),(24,41+bob),(22,43+bob),(18,39+bob)], CYAN)
        poly(frame, [(29,37+bob),(25,41+bob),(27,43+bob),(31,39+bob)], "#70DFF2")
        line(frame, 25,42+bob,25,53+bob,"#A1DDEC")
        rect(frame, 14,46+bob,5,6,"#3B7FB1")
        line(frame, 15,47+bob,18,47+bob,"#91D9ED")
        rect(frame, 31,45+bob,5,6,"#EDF1F4")
        rect(frame, 32,46+bob,3,1,GOLD)
        rect(frame, 32,48+bob,2,2,"#5295B9")
        line(frame, 14,52+bob,19,53+bob,"#74B7DB")

    # Role-specific shape language and small props keep the new roles distinct
    # even at their native 48x72 display size.
    if p["outfit"] == "gown":
        poly(frame, [(17,38+bob),(22,40+bob),(25,42+bob),(29,40+bob),(34,38+bob),(37,43+bob),(35,55+bob),(32,58+bob),(15,58+bob),(12,54+bob),(12,43+bob)], "#17223D")
        poly(frame, [(18,39+bob),(23,41+bob),(25,43+bob),(28,41+bob),(33,39+bob),(35,44+bob),(33,54+bob),(31,56+bob),(16,56+bob),(14,53+bob),(14,44+bob)], p["top"])
        poly(frame, [(16,42+bob),(19,41+bob),(20,53+bob),(16,54+bob)], p["shade"])
        poly(frame, [(33,42+bob),(34,45+bob),(32,54+bob),(29,54+bob)], p["shade"])
        line(frame,25,43+bob,25,55+bob,"#EAFBFC")
        for px,py in ((20,45),(29,47),(22,51),(31,42)):
            rect(frame,px,py+bob,2,2,"#69BDD1")
        rect(frame,30,46+bob,3,5,"#EAF5F3");rect(frame,31,47+bob,1,1,p["clip"])
    elif p["outfit"] in ("doctor", "engineer", "librarian", "senior"):
        # Layered lapels, job-specific trims and badges over the tailored base.
        if p["outfit"] == "doctor":
            poly(frame,[(17,36+bob),(23,39+bob),(25,42+bob),(22,45+bob),(15,40+bob)],"#FFFFFF")
            poly(frame,[(34,37+bob),(28,40+bob),(25,42+bob),(28,45+bob),(36,41+bob)],"#D9E4EC")
            poly(frame,[(23,39+bob),(25,42+bob),(27,39+bob),(27,47+bob),(25,49+bob),(23,47+bob)],"#294365")
            rect(frame,30,45+bob,4,5,"#EAF0F1");line(frame,31,46+bob,33,46+bob,GOLD)
            line(frame,17,39+bob,20,43+bob,p["trim"]);line(frame,33,39+bob,30,43+bob,p["trim"])
        elif p["outfit"] == "engineer":
            line(frame,25,41+bob,25,53+bob,"#B7F6E8")
            rect(frame,14,45+bob,5,7,"#267078");line(frame,15,47+bob,18,47+bob,"#A1F0E4")
            rect(frame,30,44+bob,5,6,"#E6F0E9");rect(frame,31,45+bob,3,1,GOLD);rect(frame,32,47+bob,2,2,"#328B91")
            line(frame,20,53+bob,30,53+bob,GOLD)
        elif p["outfit"] == "librarian":
            poly(frame,[(19,38+bob),(24,41+bob),(22,45+bob),(18,42+bob)],"#E9E1CC")
            poly(frame,[(31,38+bob),(26,41+bob),(28,45+bob),(32,42+bob)],"#D9D1BC")
            rect(frame,15,46+bob,5,6,"#82978A");line(frame,16,47+bob,19,47+bob,"#EDE2C9")
            rect(frame,30,45+bob,4,5,"#F0EAD8");line(frame,31,46+bob,33,46+bob,p["clip"])
        else:
            poly(frame,[(23,40+bob),(25,43+bob),(27,40+bob),(27,47+bob),(25,49+bob),(23,47+bob)],"#F0EBDD")
            line(frame,15,40+bob,18,39+bob,p["trim"]);line(frame,35,40+bob,32,39+bob,p["trim"])
            rect(frame,15,46+bob,4,5,"#3E7097");line(frame,16,47+bob,18,47+bob,GOLD)
            rect(frame,30,45+bob,5,6,"#EAF0ED");rect(frame,31,46+bob,3,1,GOLD);rect(frame,32,48+bob,2,2,"#4684AC")

    # Arms counter-swing with connected shoulders, sleeves, cuffs and hands.
    arm_swing = (0,2,0,-2)[stride]
    if direction in (0, 1):
        poly(frame, [(11,38+bob),(15,39+bob),(15,48+bob+arm_swing),(13,52+bob+arm_swing),(10,50+bob+arm_swing),(9,43+bob)], p["shade"])
        poly(frame, [(35,38+bob),(38,40+bob),(40,46+bob-arm_swing),(38,51+bob-arm_swing),(35,52+bob-arm_swing),(33,48+bob)], p["shade"])
        line(frame, 11,42+bob,12,47+bob+arm_swing,"#EAF4F6")
        rect(frame, 10,50+bob+arm_swing,4,4,p["skin"])
        rect(frame, 36,50+bob-arm_swing,4,4,p["skin"])
    else:
        armx = 10 if direction == 2 else 35
        poly(frame, [(armx,38+bob),(armx+4,39+bob),(armx+5,48+bob+arm_swing),(armx+3,53+bob+arm_swing),(armx,51+bob+arm_swing)], p["shade"])
        rect(frame, armx+1,50+bob+arm_swing,4,4,p["skin"])

    if p["outfit"] == "engineer":
        if direction == 1:
            rect(frame,30,39+bob,5,12,"#E3EEE9");rect(frame,31,41+bob,3,1,p["clip"]);line(frame,31,44+bob,33,44+bob,"#469A9C")
        else:
            px=33 if direction in (0,3) else 8
            rect(frame,px,44+bob,7,9,"#E7F0EC");rect(frame,px+1,45+bob,5,1,p["clip"]);line(frame,px+1,48+bob,px+5,48+bob,"#40989A");rect(frame,px+2,51+bob,2,1,"#40989A")
    elif p["outfit"] == "librarian":
        if direction == 1:
            rect(frame,29,43+bob,7,8,"#E9E1CC");rect(frame,30,44+bob,5,6,"#728B7C");line(frame,33,44+bob,33,50+bob,"#D9C89D")
        else:
            px=33 if direction in (0,3) else 8
            rect(frame,px,45+bob,7,8,"#E9E1CC");rect(frame,px+1,46+bob,5,6,"#718C78");line(frame,px+3,46+bob,px+3,52+bob,"#D9C89D")

    # Hair/back silhouette first; 4 distinct face directions keep anatomy readable.
    if direction == 1:
        if p["style"] in ("ponytail", "braid"):
            poly(frame, [(12,17),(13,10),(19,6),(27,6),(34,10),(37,18),(35,29),(31,33),(17,32),(13,27)], p["hairDark"])
            poly(frame, [(34,18),(39,17),(42,21),(39,26),(34,24)], p["hairMid"])
            line(frame, 38,19,40,21,p["hairLit"])
            if p["style"] == "braid":
                rect(frame,37,23,5,3,p["hair"]);rect(frame,38,26,4,3,p["hairMid"]);rect(frame,37,29,4,3,p["hair"]);rect(frame,38,32,3,3,p["clip"])
        if p["style"] in ("sidepart", "swept"):
            poly(frame,[(17,13),(22,8),(29,9),(34,13),(28,12),(24,15)],p["hairMid"]);line(frame,19,11,25,9,p["hairLit"])
        else:
            poly(frame, [(11,18),(13,10),(19,6),(27,6),(35,10),(38,18),(36,29),(32,34),(17,34),(13,29)], p["hairDark"])
        poly(frame, [(14,15),(17,9),(24,7),(31,10),(35,16),(32,23),(17,23)], p["hair"])
        poly(frame, [(16,12),(21,8),(28,9),(33,13),(27,12),(22,14)], p["hairMid"])
        line(frame, 19,10,23,9,p["hairLit"])
        if p["outfit"] == "coat":
            line(frame, 18,39+bob,31,39+bob,"#F8FAF4")
            line(frame, 23,42+bob,23,52+bob,p["trim"])
        return

    if direction in (2, 3):
        # Profile: one large eye, stepped nose, layered side locks.
        poly(frame, [(12,17),(13,10),(19,6),(28,6),(35,11),(37,19),(35,28),(31,34),(18,34),(14,30)], p["hairDark"])
        poly(frame, [(14,15),(18,9),(27,8),(33,12),(35,18),(32,23),(18,22),(14,19)], p["hair"])
        poly(frame, [(17,12),(22,9),(29,10),(33,13),(26,12),(22,14)], p["hairMid"])
        line(frame, 19,10,22,9,p["hairLit"])
        if p["style"] in ("ponytail", "braid"):
            poly(frame, [(31,19),(38,18),(41,23),(38,28),(32,26)], p["hairMid"])
            if p["style"] == "braid":
                rect(frame,38,24,4,3,p["hair"]);rect(frame,37,27,5,3,p["hairMid"]);rect(frame,38,30,4,3,p["hair"]);rect(frame,39,33,3,3,p["clip"])
        if p["style"] in ("sidepart", "swept"):
            line(frame,19,10,27,8,p["hairLit"]);line(frame,27,8,33,11,p["hairMid"])
        elif p["style"] == "bob":
            poly(frame, [(14,18),(12,23),(15,31),(19,34),(20,28),(17,23)], p["hair"])
        else:
            poly(frame, [(14,18),(12,23),(16,29),(19,26),(18,22)], p["hairMid"])
        poly(frame, [(18,21),(29,20),(34,23),(34,29),(30,33),(21,32),(17,28)], INK)
        poly(frame, [(19,22),(29,21),(32,24),(32,28),(29,31),(22,30),(19,27)], p["skin"])
        rect(frame, 29 if direction == 2 else 22,23,4,5,EYE)
        rect(frame, 29 if direction == 2 else 22,23,2,2,"#FFFFFF")
        rect(frame, 32 if direction == 2 else 25,26,1,2,EYE_LIT)
        rect(frame, 20 if direction == 2 else 31,26,2,2,SKIN_SHADOW)
        line(frame, 27 if direction == 2 else 22,30,30 if direction == 2 else 25,30,"#A96670")
        if p["outfit"] == "doctor":
            rect(frame,28 if direction==2 else 21,21,6,1,"#374A62");rect(frame,29 if direction==2 else 22,21,1,7,"#374A62");rect(frame,33 if direction==2 else 26,21,1,7,"#374A62")
        # Fringe and hair accessory remain clear of the visible eye.
        poly(frame, [(13,17),(15,10),(20,7),(28,7),(35,11),(37,17),(33,16),(30,19),(26,15),(23,20),(20,16),(16,20)], p["hairDark"])
        poly(frame, [(16,13),(21,9),(28,10),(33,13),(29,12),(26,16),(23,13),(19,17)], p["hairMid"])
        line(frame, 18,12,21,10,p["hairLit"])
        if variant == 3:
            # Cap silhouette is attached to the hair/head, not floating.
            poly(frame, [(15,9),(18,6),(31,6),(35,10),(33,13),(17,13)], "#F6F5EE")
            line(frame, 17,12,33,12,"#B7CDD8")
            rect(frame, 24,7,2,5,"#D85C69")
            rect(frame, 23,8,4,2,"#D85C69")
        if variant == 2:
            rect(frame, 36,14,3,3,p["clip"])
        return

    # Front view: broad layered fringe and readable eyes/catchlights.
    poly(frame, [(11,18),(12,11),(18,6),(27,5),(35,10),(38,18),(36,28),(33,34),(16,34),(12,29)], p["hairDark"])
    poly(frame, [(14,14),(18,9),(26,8),(33,12),(35,18),(33,23),(17,23),(13,19)], p["hair"])
    poly(frame, [(16,12),(21,8),(28,9),(33,13),(29,12),(26,16),(22,13),(18,17)], p["hairMid"])
    line(frame, 18,11,22,9,p["hairLit"])
    line(frame, 27,10,30,12,p["hairLit"])
    # Neck/face contour and shaded cheek planes.
    poly(frame, [(15,17),(18,14),(30,14),(34,18),(34,27),(30,33),(24,35),(18,32),(14,27)], OUT)
    poly(frame, [(16,18),(19,15),(29,15),(32,18),(32,27),(29,31),(24,33),(19,31),(16,27)], p["skin"])
    poly(frame, [(16,22),(18,22),(19,27),(17,28)], SKIN_SHADOW)
    poly(frame, [(30,22),(32,22),(31,28),(29,27)], SKIN_SHADOW)
    line(frame, 18,16,21,16,SKIN_LIGHT)
    # Eyes have outline, iris, pupil and catchlight at native logical size.
    line(frame, 17,22,22,21,INK)
    line(frame, 26,21,31,22,INK)
    poly(frame, [(18,22),(22,22),(22,27),(20,28),(18,26)], EYE)
    poly(frame, [(27,22),(31,22),(31,26),(29,28),(27,27)], EYE)
    rect(frame, 19,22,2,2,"#FFFFFF")
    rect(frame, 28,22,2,2,"#FFFFFF")
    rect(frame, 20,26,2,2,EYE_LIT)
    rect(frame, 29,26,2,2,EYE_LIT)
    rect(frame, 23,27,2,1,SKIN_SHADOW)
    line(frame, 22,30,26,30,"#A96670")
    rect(frame, 19,28,3,1,"#E99B9B")
    rect(frame, 27,28,3,1,"#E99B9B")
    # Layered bangs frame the eyes with asymmetric locks.
    poly(frame, [(12,18),(13,11),(18,6),(27,5),(35,10),(38,18),(34,16),(31,19),(28,14),(24,20),(21,15),(17,20)], p["hairDark"])
    poly(frame, [(15,13),(20,8),(27,8),(33,12),(30,12),(27,16),(24,12),(21,16),(18,14)], p["hairMid"])
    line(frame, 17,12,21,9,p["hairLit"])
    line(frame, 25,10,28,11,p["hairLit"])
    if p["style"] in ("ponytail", "braid"):
        poly(frame, [(13,19),(12,25),(14,32),(17,34),(18,28),(16,23)], p["hair"])
        poly(frame, [(34,19),(36,25),(34,33),(31,34),(30,28),(32,23)], p["hairDark"])
        poly(frame, [(34,27),(39,27),(40,31),(36,33),(33,31)], p["hairMid"])
        rect(frame, 36,28,2,2,p["clip"])
        if p["style"] == "braid":
            rect(frame,36,31,4,3,p["hair"]);rect(frame,35,34,5,3,p["hairMid"]);rect(frame,36,37,4,3,p["hair"]);rect(frame,37,40,3,3,p["clip"])
    elif p["style"] == "bob":
        poly(frame, [(13,19),(12,24),(14,32),(18,35),(19,29),(16,23)], p["hair"])
        poly(frame, [(34,19),(36,24),(34,32),(30,35),(29,29),(32,23)], p["hair"])
    else:
        poly(frame, [(13,19),(12,24),(15,28),(18,25),(16,22)], p["hairMid"])
        poly(frame, [(34,19),(36,24),(33,29),(30,26),(32,22)], p["hairDark"])
    if variant == 3:
        poly(frame, [(15,9),(18,5),(31,5),(35,9),(33,12),(17,12)], "#F6F5EE")
        line(frame, 17,11,33,11,"#B7CDD8")
        rect(frame, 24,6,2,5,"#D85C69")
        rect(frame, 23,7,4,2,"#D85C69")
    if variant == 2:
        rect(frame, 36,13,3,3,p["clip"])
    if p["outfit"] == "doctor":
        rect(frame,16,21,7,1,"#374A62");rect(frame,27,21,7,1,"#374A62")
        rect(frame,17,21,1,7,"#374A62");rect(frame,22,21,1,7,"#374A62")
        rect(frame,28,21,1,7,"#374A62");rect(frame,33,21,1,7,"#374A62")
        line(frame,23,23,27,23,"#5D7085")
    if p["style"] in ("sidepart", "swept"):
        line(frame,17,11,25,8,p["hairLit"]);line(frame,25,8,31,10,p["hairMid"])

for row, variant in enumerate(VARIANTS):
    for direction in range(DIRECTIONS):
        for stride in range(CYCLES):
            person(row * DIRECTIONS * CYCLES + direction * CYCLES + stride, row, direction, stride)

print(sheet.stats_text())
print(save("hospital-people-stage-a", canvas=sheet, scales=(1, 2)))
