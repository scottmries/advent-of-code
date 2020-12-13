from day10data import adapters

adapters.sort()
adapters.append(adapters[-1] + 3)

counts = {
    1: 0,
    2: 0,
    3: 0
}

for index in range(len(adapters) - 1):
    counts[adapters[index + 1] - adapters[index]] += 1

print counts[1] * counts[3]

canConnectTo = {}

for adapter in adapters[:-1]:
    connections = []
    for i in range(1, 4):
        if adapter + i in adapters:
            connections.append(adapter + i)
    canConnectTo[adapter] = connections

reverseAdapters = adapters[:-1]
reverseAdapters.reverse()

adapterTerminations = {}

for adapter in reverseAdapters:
    total = 0
    for connection in canConnectTo[adapter]:
        if connection == adapters[-1]:
            total += 1
        else:
            total += adapterTerminations[connection]
    adapterTerminations[adapter] = total

print adapterTerminations[0]