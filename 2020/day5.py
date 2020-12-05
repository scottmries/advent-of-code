from day5data import values

maximum = 0
seatIds = []

for value in values:
    rowString = value[:7]
    columnString = value[7:]
    print rowString
    print columnString
    binaryRowString = ""
    binaryColumnString = ""
    for c in rowString:
        if c == "F":
            binaryRowString += "0"
        if c == "B":
            binaryRowString += "1"
    row = int(binaryRowString, 2)
    for c in columnString:
        if c == "L":
            binaryColumnString += "0"
        if c == "R":
            binaryColumnString += "1"
    column = int(binaryColumnString, 2)
    seatId = row * 8 + column 
    seatIds.append(seatId)
    if seatId > maximum:
        maximum = seatId


print maximum

seatIds.sort()

print seatIds
for id in seatIds:
    if id + 1 not in seatIds and id + 2 in seatIds:
        print "Your seat: %s" % (id + 1)