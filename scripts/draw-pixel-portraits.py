# Matching Stage A portraits: Player, Maya and Reception, with four expressions.
# Original layered pixel art, authored with Astra Pixel Art (no external art).

SIZE = 96
EXPRESSIONS = ("neutral", "smile", "talk", "concern")
PEOPLE = [
    dict(name="student", hair="#292532", dark="#191D2D", mid="#57404A", lit="#957075", skin="#F4C7AC", outfit="scrubs", trim="#56D7F3", hair_style="messy"),
    dict(name="mentor", hair="#57353A", dark="#302631", mid="#955A5E", lit="#D29283", skin="#F5C7AC", outfit="coat", trim="#56D7F3", hair_style="long"),
    dict(name="receptionist", hair="#634344", dark="#302632", mid="#A16B68", lit="#D9A08C", skin="#F4C7AC", outfit="nurse", trim="#54C7D3", hair_style="bob"),
    dict(name="patient", hair="#263347", dark="#192536", mid="#506781", lit="#8EAFC1", skin="#F1C7AC", outfit="patient", trim="#61C9DE", hair_style="shortcrop"),
    dict(name="elias", hair="#39343B", dark="#252631", mid="#77727A", lit="#C4B7A5", skin="#EFC2A5", outfit="doctor", trim="#4CBBD7", hair_style="sidepart"),
    dict(name="nora", hair="#774536", dark="#392A31", mid="#B46B4C", lit="#E0A06E", skin="#F4C5A7", outfit="engineer", trim="#64E0D3", hair_style="bob"),
    dict(name="luna", hair="#65413D", dark="#3B2A35", mid="#A96860", lit="#DCA18A", skin="#F5C9AA", outfit="librarian", trim="#EAD7AE", hair_style="braid"),
    dict(name="kai", hair="#604339", dark="#302834", mid="#9A6A4F", lit="#D2A079", skin="#F2C5A8", outfit="senior", trim="#E8B95D", hair_style="swept"),
]

def make_portrait(person, expression):
    key = person["name"]
    bg = new_canvas(SIZE, SIZE, name=key + "-" + expression + "-frame")
    bg.rect(0, 0, 96, 96, "#152956")
    bg.rect(3, 3, 90, 90, "#254878")
    bg.rect(7, 7, 82, 82, "#3B6798")
    bg.rect(10, 10, 76, 76, "#4E7EAB")
    bg.rect(10, 10, 76, 5, "#80C9E6")
    bg.rect(10, 81, 76, 5, "#1A365E")
    for x, y in ((12, 13), (78, 13), (12, 78), (78, 78)):
        bg.rect(x, y, 5, 5, "#B1E7F4")

    body = new_canvas(96, 96, name=key + "-" + expression + "-uniform")
    if person["outfit"] == "scrubs":
        body.poly([(13,96),(17,77),(27,68),(39,65),(57,65),(69,69),(79,79),(83,96)], "#17223D")
        body.poly([(17,96),(21,80),(30,71),(41,68),(55,68),(66,72),(75,81),(78,96)], "#2866A6")
        body.poly([(29,72),(42,68),(47,76),(42,91),(33,87)], "#1B477B")
        body.poly([(67,75),(56,69),(50,77),(55,90),(64,87)], "#387FB5")
        body.poly([(39,68),(47,76),(43,81),(36,72)], "#56D7F3")
        body.poly([(57,68),(49,76),(53,81),(61,72)], "#80E9F7")
        body.rect(47, 78, 3, 15, "#A9ECF4")
        body.rect(27, 81, 11, 8, "#3479A8")
        body.rect(29, 83, 7, 1, "#9CE8F3")
        body.rect(59, 81, 10, 8, "#EDF1F4")
        body.rect(60, 82, 8, 2, "#F4B84F")
        body.rect(63, 85, 3, 3, "#4B96BB")
    elif person["outfit"] == "patient":
        body.poly([(12,96),(16,78),(27,68),(39,65),(57,65),(70,69),(81,80),(84,96)], "#17223D")
        body.poly([(16,96),(20,81),(30,72),(41,68),(55,68),(66,72),(77,82),(80,96)], "#B9E5F0")
        body.poly([(28,73),(40,69),(48,76),(43,91),(34,88)], "#78B9CE")
        body.poly([(67,75),(56,69),(50,77),(55,90),(64,87)], "#D4F0F3")
        body.poly([(39,68),(47,76),(44,82),(36,72)], "#F7FAF4")
        body.poly([(57,68),(49,76),(52,82),(62,72)], "#EAF7F4")
        body.rect(47,78,3,15,"#E5F5F4")
        for x,y in ((30,81),(43,84),(58,78),(65,86)):
            body.rect(x,y,3,3,"#69BDD1")
    else:
        body.poly([(12,96),(16,78),(27,68),(39,65),(57,65),(70,69),(81,80),(84,96)], "#17223D")
        body.poly([(16,96),(20,81),(30,72),(41,68),(55,68),(66,72),(77,82),(80,96)], "#EDF1F4")
        body.poly([(27,75),(41,68),(48,76),(42,93),(34,89)], "#FFFFFF")
        body.poly([(69,75),(56,68),(49,76),(56,93),(65,89)], "#D6E1EB")
        body.poly([(40,69),(48,77),(43,87),(36,73)], "#56D7F3")
        body.poly([(57,69),(49,77),(54,87),(61,73)], "#8CE9F3")
        body.rect(47, 79, 3, 14, "#45A6CE")
        body.rect(26, 81, 11, 8, "#DCE7EE")
        body.rect(28, 82, 7, 2, "#5AC4DD")
        body.rect(60, 81, 10, 8, "#D7E3EB")
        if person["outfit"] == "nurse":
            body.rect(62, 82, 6, 2, "#56C6D1")
            body.rect(64, 84, 2, 3, "#F4F7F2")
        if person["outfit"] == "doctor":
            body.poly([(38,68),(47,75),(44,81),(35,72)], "#FFFFFF")
            body.poly([(58,68),(49,75),(53,81),(63,72)], "#D6E2EB")
            body.poly([(46,72),(49,77),(52,72),(52,84),(49,88),(46,84)], "#294365")
            body.rect(59,81,10,8,"#E5EDF0");body.rect(61,82,6,2,"#F4B84F")
        elif person["outfit"] == "engineer":
            body.poly([(19,74),(39,67),(47,77),(42,93),(29,89)], "#185A68")
            body.poly([(60,75),(54,70),(50,78),(56,91),(66,88)], "#267C80")
            body.rect(25,81,13,8,"#267078");body.rect(28,83,8,2,"#A1F0E4")
            body.rect(59,80,11,10,"#E5EEEA");body.rect(61,82,7,2,"#F4B84F")
            body.line(31,92,65,92,"#F4B84F")
            body.poly([(69,73),(82,77),(82,91),(68,88)],"#173D52")
            body.poly([(71,75),(79,78),(79,88),(70,86)],"#E7F0EC")
            body.rect(72,78,5,1,"#64E0D3");body.line(72,81,77,81,"#5B9DA0");body.rect(74,84,2,2,"#F4B84F")
        elif person["outfit"] == "librarian":
            body.poly([(20,76),(39,68),(47,77),(42,92),(31,88)], "#718C78")
            body.poly([(61,75),(54,69),(50,77),(57,92),(68,88)], "#4F6D68")
            body.poly([(38,68),(47,75),(44,81),(36,73)], "#E9E1CC")
            body.poly([(58,69),(49,75),(53,81),(62,73)], "#D9D1BC")
            body.rect(25,81,12,8,"#82978A");body.rect(27,83,8,2,"#EDE2C9")
            body.poly([(68,75),(81,79),(81,92),(68,89)],"#E9E1CC")
            body.poly([(71,77),(78,80),(78,89),(70,87)],"#718C78")
            body.line(74,79,74,88,"#E6D5AA")
        elif person["outfit"] == "senior":
            body.poly([(19,74),(39,68),(47,77),(42,92),(31,88)], "#203C68")
            body.poly([(60,75),(54,69),(50,77),(56,91),(66,88)], "#315B84")
            body.poly([(39,68),(47,75),(44,80),(36,72)], "#F0EBDD")
            body.poly([(58,69),(49,75),(53,80),(62,72)], "#F0EBDD")
            body.rect(25,81,12,8,"#3E7097");body.rect(28,83,7,2,"#F4B84F")
            body.rect(59,80,11,9,"#EAF0ED");body.rect(62,82,6,2,"#F4B84F")
    body.rect(40, 91, 17, 5, "#20365F")

    back = new_canvas(SIZE, SIZE, name=key + "-" + expression + "-hair-back")
    if person["hair_style"] in ("long", "braid"):
        back.poly([(22,43),(22,24),(30,13),(42,9),(56,11),(68,22),(72,42),(70,68),(78,77),(68,82),(62,68),(33,68),(27,82),(17,77),(24,62)], person["dark"])
        back.poly([(26,40),(28,24),(37,15),(52,14),(64,22),(68,41),(65,62),(59,68),(34,66),(28,59)], person["hair"])
        back.poly([(29,27),(39,16),(52,16),(63,23),(54,21),(43,24),(35,30)], person["mid"])
        back.rect(67, 37, 7, 24, person["hair"])
        if person["hair_style"] == "braid":
            back.rect(67,58,8,5,person["mid"]);back.rect(68,63,7,5,person["hair"]);back.rect(69,68,6,5,person["mid"]);back.rect(70,73,5,5,person["hair"]);back.rect(70,78,4,4,"#E4B767")
    else:
        back.poly([(22,43),(22,26),(30,14),(42,9),(56,11),(68,22),(73,43),(69,62),(63,69),(31,69),(24,62)], person["dark"])
        back.poly([(26,40),(28,24),(37,15),(52,14),(64,22),(68,41),(64,59),(58,65),(35,65),(28,58)], person["hair"])
        back.poly([(29,27),(39,16),(52,16),(63,23),(54,21),(43,24),(35,30)], person["mid"])

    face = new_canvas(SIZE, SIZE, name=key + "-" + expression + "-face")
    face.rect(24, 34, 8, 23, "#D69583")
    face.rect(64, 34, 8, 23, "#D69583")
    face.poly([(27,25),(35,18),(60,18),(69,26),(72,42),(68,58),(60,65),(48,68),(36,64),(28,56),(24,42)], "#17223D")
    face.poly([(29,28),(37,21),(58,21),(66,28),(68,42),(64,55),(58,61),(48,64),(38,61),(31,54),(28,42)], person["skin"])
    face.poly([(30,33),(34,29),(37,30),(34,38)], "#FFE0C7")
    face.poly([(62,44),(67,44),(65,52),(61,54)], "#D69583")
    face.rect(31, 43, 6, 7, "#E99B9B")
    face.rect(60, 43, 6, 7, "#E99B9B")
    if expression == "concern":
        face.line(34, 36, 43, 38, "#292532")
        face.line(53, 38, 62, 36, "#292532")
        face.rect(35, 42, 8, 7, "#26395C")
        face.rect(53, 42, 8, 7, "#26395C")
        face.rect(37, 43, 2, 2, "#FFFFFF")
        face.rect(55, 43, 2, 2, "#FFFFFF")
        face.poly([(44,56),(52,56),(50,60),(46,60)], "#9D5360")
    else:
        face.line(34, 38, 43, 38, "#292532")
        face.line(53, 38, 62, 38, "#292532")
        face.poly([(35,39),(43,39),(43,48),(40,51),(35,48)], "#26395C")
        face.poly([(53,39),(61,39),(61,48),(58,51),(53,48)], "#26395C")
        face.rect(36, 40, 3, 3, "#FFFFFF")
        face.rect(54, 40, 3, 3, "#FFFFFF")
        face.rect(40, 47, 2, 3, "#5D91C0")
        face.rect(57, 47, 2, 3, "#5D91C0")
        face.rect(46, 51, 4, 3, "#D69583")
        if expression == "talk":
            face.ellipse(48, 57, 4, 5, "#9D5360")
            face.rect(46, 54, 5, 2, "#FFE0C7")
        elif expression == "smile":
            face.poly([(42,55),(46,57),(50,57),(54,55),(52,60),(48,62),(44,60)], "#A65F6A")
            face.rect(45, 56, 7, 2, "#FFF1DD")
        else:
            face.line(44, 58, 52, 58, "#A65F6A")

    fringe = new_canvas(SIZE, SIZE, name=key + "-" + expression + "-fringe")
    fringe.poly([(22,40),(22,25),(29,14),(41,9),(55,10),(67,18),(73,31),(70,39),(65,35),(60,43),(55,34),(48,42),(43,34),(36,42),(31,35)], person["dark"])
    fringe.poly([(27,28),(35,16),(47,13),(59,17),(67,25),(57,22),(52,29),(46,23),(39,31),(34,26)], person["mid"])
    fringe.line(31, 25, 38, 18, person["lit"])
    fringe.line(48, 18, 54, 19, person["lit"])
    if person["hair_style"] == "bob":
        fringe.poly([(23,36),(21,47),(25,58),(32,62),(34,51),(29,43)], person["hair"])
        fringe.poly([(68,36),(72,47),(68,59),(62,63),(60,51),(65,42)], person["hair"])
        fringe.rect(44, 13, 12, 5, "#F5F5EE")
        fringe.rect(41, 17, 18, 4, "#C6DAE3")
        fringe.rect(49, 13, 3, 8, "#D85C69")
        fringe.rect(47, 15, 7, 3, "#D85C69")
    elif person["hair_style"] in ("long", "braid"):
        fringe.poly([(24,35),(22,48),(25,61),(31,67),(34,54),(29,42)], person["hair"])
        fringe.poly([(67,35),(72,48),(69,63),(63,68),(60,54),(65,42)], person["hair"])
        fringe.rect(67, 30, 6, 5, "#F4B84F")
        if person["hair_style"] == "braid":
            fringe.rect(68,53,7,5,person["mid"]);fringe.rect(69,58,6,5,person["hair"]);fringe.rect(68,63,7,5,person["mid"]);fringe.rect(69,68,5,5,person["hair"]);fringe.rect(70,73,4,4,"#E4B767")
    else:
        fringe.poly([(24,36),(22,46),(25,53),(31,49),(29,41)], person["hair"])
        fringe.poly([(68,35),(72,45),(68,53),(63,49),(65,40)], person["hair"])
    if person["hair_style"] == "sidepart":
        fringe.poly([(24,15),(34,10),(49,9),(62,14),(68,21),(57,18),(48,20),(39,18),(31,22)], person["mid"])
        fringe.line(31,19,45,13,person["lit"])
    elif person["hair_style"] == "swept":
        fringe.poly([(23,19),(31,12),(46,9),(61,12),(69,20),(58,17),(50,20),(43,17),(35,23)], person["mid"])
        fringe.line(31,17,42,12,person["lit"])
    if person["outfit"] == "doctor":
        fringe.rect(29,41,16,2,"#374A62");fringe.rect(29,42,2,10,"#374A62");fringe.rect(43,42,2,10,"#374A62")
        fringe.rect(51,41,16,2,"#374A62");fringe.rect(51,42,2,10,"#374A62");fringe.rect(65,42,2,10,"#374A62")
        fringe.line(45,44,51,44,"#53677B")

    result = flatten([bg, body, back, face, fringe], name=key + "-" + expression + "-portrait")
    output_name = key + "-portrait" if expression == "smile" else key + "-portrait-" + expression
    print(save(output_name, canvas=result, scales=(1, 4)))

for person in PEOPLE:
    for expression in EXPRESSIONS:
        make_portrait(person, expression)
