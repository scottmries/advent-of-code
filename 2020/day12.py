from day12data import instructions

facingIndex = 1
directions = ["N", "E", "S", "W"]
facing = directions[facingIndex]
location = (0, 0)
movements = {
    "N": lambda (x, y), value : (x, y + value),
    "E": lambda (x, y), value : (x + value, y),
    "S": lambda (x, y), value : (x, y - value),
    "W": lambda (x, y), value : (x - value, y),
}

for instruction in instructions:
    action = instruction[0]
    value = int(instruction[1:])
    if action == "R":
        facingIndex = (facingIndex + (value / 90)) % len(directions)
        continue
    if action == "L":
        facingIndex = ((facingIndex - (value / 90)) + len(directions)) % len(directions)
        continue
    facing = directions[facingIndex]
    if action == "F":
        action = facing
    location = movements[action](location, value)
(x, y) = location
print abs(x) + abs(y)

rotations = {
    "R": lambda (x, y) : (y, -x),
    "L": lambda (x, y) : (-y, x)
}

waypoint = (10, 1)
location = (0, 0)
for instruction in instructions:
    action = instruction[0]
    value = int(instruction[1:])
    if action == "R" or action == "L":
        for rotation in range(value / 90):
            waypoint = rotations[action](waypoint)
    if action in directions:
        waypoint = movements[action](waypoint, value)
    if action == "F":
        for move in range(value):
            (x, y) = location
            location = (x + waypoint[0], y + waypoint[1])
(x, y) = location
print abs(x) + abs(y)
