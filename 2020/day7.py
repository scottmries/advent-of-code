from day7data import rules
from collections import defaultdict

# key is bag type, value is a list of types of bags in which bag can be contained
canBeContainedIn = defaultdict(list)
innerBagCounts = defaultdict(None)

for rule in rules:
    [container, contents] = rule.split(" bags contain ")
    for bagType in contents.split(", "):
        (quantity, nonQuantity) = bagType.split(" ", 1)
        description = nonQuantity.split(" bag")[0]
        # print "quantity: %s, description: %s" % (quantity, description)
        canBeContainedIn[description].append(container)

bagsThatCanContain = canBeContainedIn["shiny gold"]
setOfBagsThatCanContainShinyGold = set()

while len(bagsThatCanContain) > 0:
    newContainingBags = set()
    for containingBag in bagsThatCanContain:
        if containingBag not in setOfBagsThatCanContainShinyGold:
            print containingBag
            setOfBagsThatCanContainShinyGold.add(containingBag)
            newContainingBags.update(canBeContainedIn[containingBag])
    bagsThatCanContain = list(newContainingBags)

print len(list(setOfBagsThatCanContainShinyGold))

while "shiny gold" not in innerBagCounts.keys():
    nextRules = rules
    for rule in rules:
        [container, contents] = rule.split(" bags contain ")
        print container
        bagCount = 0
        if contents == "no other bags.":
            innerBagCounts[container] = bagCount
            print "%s has no contents" % container
            nextRules.remove(rule)
            continue
        complete = True
        for bagType in contents.split(", "):
            (quantity, nonQuantity) = bagType.split(" ", 1)
            description = nonQuantity.split(" bag")[0]
            print "checking %s" % description
            if description in innerBagCounts.keys():
                bagCount += int(quantity) * (1 + innerBagCounts[description])
            else:
                complete = False
                break
        if complete:
            innerBagCounts[container] = bagCount
        rules = nextRules

print innerBagCounts
print innerBagCounts["shiny gold"]