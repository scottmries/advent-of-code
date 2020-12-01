from day1data import values

for index, item in enumerate(values):
    for item2 in values[(index + 1):]:
        if item + item2 == 2020:
            print item * item2

for index, item in enumerate(values):
    for index2, item2 in enumerate(values[(index + 1):]):
        for item3 in values[(index + 2):]:
            if item + item2 + item3 == 2020:
                print item * item2 * item3