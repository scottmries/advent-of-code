from day13data import timestamp, ids

# first step:
# startingTimestamp = int(timestamp)
# validIds = []
# for id in ids:
#     try:
#         validIds.append(int(id))
#     except Exception:
#         continue
# print validIds

# while True:
#     for busId in validIds:
#         if timestamp % busId == 0:
#             print (timestamp - startingTimestamp) * busId
#             exit()
#     timestamp += 1

timestamp = 0
previousProduct = 1
for busIndex in range(len(ids)):
    bus = ids[busIndex]
    while True:
        if bus == 'x':
            break
        if (timestamp + busIndex) % int(bus) == 0:
            break
        timestamp += previousProduct
    if bus != 'x':
        previousProduct *= int(bus)

print timestamp
