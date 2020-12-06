from day6data import values

yesAnswers = []
uniqueSum = 0
for value in values:
    if value == "":
        uniqueSum += len(yesAnswers)
        yesAnswers = []
        continue
    for c in value:
        if not value in yesAnswers:
            yesAnswers.append(c)

uniqueSum += len(yesAnswers)

print uniqueSum

yesAnswers = {}
members = 0
uniqueSum = 0
for value in values:
    if value == "":
        allYesAnswers = 0
        for yeses in yesAnswers.values():
            if yeses == members:
                uniqueSum += 1
        yesAnswers = {}
        members = 0
        continue
    for c in value:
        if yesAnswers.get(c) is None:
            yesAnswers[c] = 1
        else:
            yesAnswers[c] += 1
    members += 1

for yeses in yesAnswers.values():
    if yeses == members:
        uniqueSum += 1

print uniqueSum