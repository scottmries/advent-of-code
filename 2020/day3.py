from day3data import paths
trees = 0
start = 0
for path in paths:
    if path[start] == "#":
        trees += 1
    start = (start + 3) % len(path)
print trees

slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]
treesProd = 1
for slope in slopes:
    trees = 0
    start = 0
    for i in range(0, len(paths), slope[1]):
        path = paths[i]
        if path[start] == "#":
            trees += 1
        start = (start + slope[0]) % len(path)
    treesProd *= trees
print treesProd