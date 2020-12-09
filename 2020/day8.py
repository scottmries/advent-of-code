from day8data import lines

visited = []

def parseLine(line):
    global acc, index
    (op, value) = line.split(" ")
    if op == "acc":
        acc += int(value)
        index += 1
    if op == "nop":
        index += 1
    if op == "jmp":
        index += int(value)

# part 1:

# index = 0
# acc = 0

# while index not in visited:
#     visited.append(index)
#     parseLine(lines[index])

# print acc

# part 2:
for lineIndex in range(0, len(lines)):
    acc = 0
    lastIndex = 0
    visited = []
    index = 0
    testLines = lines[:]
    (op, value) = testLines[lineIndex].split(" ")
    if op == "jmp":
        op = "nop"
    elif op == "nop":
        op = "jmp"
    else:
        continue
    testLines[lineIndex] = op + " " + value
    while index not in visited and index < len(lines):
        lastIndex = int(index)
        visited.append(index)
        (op, value) = testLines[index].split(" ")
        if op == "acc":
            acc += int(value)
            index += 1
        if op == "nop":
            index += 1
        if op == "jmp":
            index += int(value)
    if index >= len(lines):
        lines[lineIndex] = testLines[lineIndex]
        break

acc = 0
index = 0
while index < len(lines):
    parseLine(lines[index])
print acc