from day9data import values

for i in range(25, len(values) - 25):
    previous = values[i - 25:i]
    target = values[i]
    found = False
    for j in range(len(previous) - 1):
        for k in range(j + 1, len(previous)):
            if previous[j] + previous[k] == target:
                found = True
    if not found:
        print target
        break

for i in range(len(values)):
    j = i + 1
    contiguousDigits = values[i:j]
    while sum(contiguousDigits) < target and j <= len(values):
        j += 1
        contiguousDigits = values[i:j]
    if sum(contiguousDigits) == target:
        print min(contiguousDigits) + max(contiguousDigits)
        break