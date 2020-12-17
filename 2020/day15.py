numbers = [1, 20, 8, 12, 0, 14]
# numbers = [0, 3, 6]

target = 2020
while len(numbers) < target:
    if numbers[-1] in numbers[:-1]:
        lastOccurence = len(numbers) - 2 - (numbers[:-1][::-1]).index(numbers[-1])
        numbers.append(len(numbers) - 1 - lastOccurence)
    else:
        numbers.append(0)

print "part 1", numbers[-1]

target = 30000000
numbers = [1, 20, 8, 12, 0, 14]
# i had been using a dictionary, but checking it's keys take O(n) time every time
# instantiating this with invalid indices allows us to only traverse the array once
lastOccurences = [-1] * target
for index, number in enumerate(numbers[:-1]):
    lastOccurences[number] = index

index = len(numbers) - 1
number = numbers[-1]
# no need to actually use this numbers list anymore
while index < target - 1:
    last = lastOccurences[number]
    lastOccurences[number] = index
    if last < 0:
        number = 0
    else:
        number = index - last
    index += 1
    if index % 1000000 == 0:
        print index, number

print "part 2", number