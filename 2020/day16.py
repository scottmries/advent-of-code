from day16data import rules, myTicket, nearbyTickets, testRules, testMyTicket, testNearbyTickets

# rules = testRules
# myTicket = testMyTicket
# nearbyTickets = testNearbyTickets

globalRange = []
for rule in rules:
    (_, rest) = rule.split(": ")
    for fieldRange in rest.split(" or "):
        (minimum, maximum) = map(lambda x: int(x), fieldRange.split("-"))
        for value in range(minimum, maximum + 1):
            globalRange.append(value)
    globalRange = list(set(globalRange))

invalidsTotal = 0
for ticket in nearbyTickets:
    for value in ticket:
        if value not in globalRange:
            invalidsTotal += value

print "part 1 ", invalidsTotal

validTickets = []
for ticket in nearbyTickets:
    valid = True
    for value in ticket:
        if value not in globalRange:
            valid = False
    if valid:
        validTickets.append(ticket)

fieldsToRanges = {}

for rule in rules:
    (field, rest) = rule.split(": ")
    fieldsToRanges[field] = []
    for fieldRange in rest.split(" or "):
        (minimum, maximum) = map(lambda x: int(x), fieldRange.split("-"))
        for value in range(minimum, maximum + 1):
            fieldsToRanges[field].append(value)

fieldsToDetermine = fieldsToRanges.keys()
fieldOrder = [None] * len(fieldsToDetermine)

print fieldsToDetermine

while len(fieldsToDetermine) > 0:
    possibleFieldOrders = []
    for _ in range(len(fieldOrder)):
        possibleFieldOrders.append(list(fieldsToDetermine))
    for field in fieldsToDetermine:
        for ticket in validTickets:
            for (ticketValueIndex, ticketValue) in enumerate(ticket):
                if ticketValue not in fieldsToRanges[field]:
                    if field in possibleFieldOrders[ticketValueIndex]:
                        possibleFieldOrders[ticketValueIndex].remove(field)
    for (index, fields) in enumerate(possibleFieldOrders):
        if len(fields) == 1:
            field = fields[0]
            fieldOrder[index] = field
            fieldsToDetermine.remove(field)
    print fieldOrder

result = 1
for (index, field) in enumerate(fieldOrder):
    if "departure" in field:
        result *= myTicket[index]
print "part 2", result

