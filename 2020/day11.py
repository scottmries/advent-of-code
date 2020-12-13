from day11data import seating, testSeating

neighborIndices = [
    {"x": -1, "y": -1},
    {"x": 0, "y": -1},
    {"x": 1, "y": -1},
    {"x": -1, "y": 0},
    {"x": 1, "y": 0},
    {"x": -1, "y": 1},
    {"x": 0, "y": 1},
    {"x": 1, "y": 1}
]

seatingStage = seating[:]
lastSeatingStage = []
while seatingStage != lastSeatingStage:
    lastSeatingStage = seatingStage[:]
    seatingStage = []
    for rowIndex in range(len(lastSeatingStage)):
        row = lastSeatingStage[rowIndex]
        nextRow = row[:]
        for seatIndex in range(len(row)):
            seat = row[seatIndex]
            if seat == ".":
                continue
            occupiedNeighbors = 0
            for neighborIndex in neighborIndices:
                (x, y) = (seatIndex + neighborIndex["x"], rowIndex + neighborIndex["y"])
                if (x < len(row) and x >= 0) and (y < len(lastSeatingStage) and y >= 0):
                    if lastSeatingStage[y][x] == "#":
                        occupiedNeighbors += 1
            if seat == "L" and occupiedNeighbors == 0:
                nextRow = nextRow[:seatIndex] + "#" + nextRow[(seatIndex + 1):]
            elif seat == "#" and occupiedNeighbors >= 4:
                nextRow = nextRow[:seatIndex] + "L" + nextRow[(seatIndex + 1):]
        seatingStage.append(nextRow)

occupiedSeats = 0
for row in seatingStage:
    for seat in row:
        if seat == "#":
            occupiedSeats += 1

print occupiedSeats

seatingStage = seating[:]
lastSeatingStage = []
for row in seatingStage:
        print row
while seatingStage != lastSeatingStage:
    print "-" * len(lastSeatingStage[:-1])
    lastSeatingStage = seatingStage[:]
    seatingStage = []
    for rowIndex in range(len(lastSeatingStage)):
        row = lastSeatingStage[rowIndex]
        nextRow = row[:]
        for seatIndex in range(len(row)):
            seat = row[seatIndex]
            if seat == ".":
                continue
            occupiedNeighbors = 0
            for neighborIndex in neighborIndices:
                (x, y) = (seatIndex, rowIndex)
                while True:
                    (x, y) = (x + neighborIndex["x"], y + neighborIndex["y"])
                    if x < 0 or x >= len(row) or y < 0 or y >= len(lastSeatingStage):
                        break
                    if lastSeatingStage[y][x] == "#":
                        occupiedNeighbors += 1
                        break
                    if lastSeatingStage[y][x] == "L":
                        break
            if seat == "L" and occupiedNeighbors == 0:
                nextRow = nextRow[:seatIndex] + "#" + nextRow[(seatIndex + 1):]
            elif seat == "#" and occupiedNeighbors >= 5:
                nextRow = nextRow[:seatIndex] + "L" + nextRow[(seatIndex + 1):]
        seatingStage.append(nextRow)
    for row in seatingStage:
        print row

occupiedSeats = 0
for row in seatingStage:
    for seat in row:
        if seat == "#":
            occupiedSeats += 1

print occupiedSeats
