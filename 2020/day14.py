from day14data import program

mask = ''
memory = {}

for line in program:
    if line[:4] == 'mask':
        mask = line[7:]
        print "mask ", mask
    else:
        decValue = int(line.split(" = ")[1])
        value = bin(decValue).split("0b")[1].zfill(36)
        print "decimal value: ", decValue
        print "binary value: ", value
        memIndex = line.split("[")[1].split("]")[0]
        result = ''
        for index in range(len(value)):
            valueBit = value[index]
            maskBit = mask[index]
            if maskBit == "X":
                resultBit = valueBit
            else:
                resultBit = maskBit
            result += resultBit 
        print "result ", result
        memory[memIndex] = int(result, 2)
        print "memIndex ", memIndex
        print "memory value ", memory[memIndex]
total = 0
print memory
for value in memory.values():
    total += value
print "part 1: ", total

mask = ''
memory = {}

def resolveFs(addresses):
    fsRemain = False
    for addressIndex in range(len(addresses)):
        address = addresses[addressIndex]
        if "f" in address:
            fsRemain = True
            break
    if fsRemain:
        firstAddressWithF = address + ""
        addresses.remove(firstAddressWithF)
        fIndex = firstAddressWithF.index("f")
        for floatingValue in ["0", "1"]:
            addresses.append(address[:fIndex] + floatingValue + address[(fIndex + 1):])
        return resolveFs(addresses)
    else:
        return addresses

for line in program:
    if line[:4] == 'mask':
        mask = line[7:]
    else:
        decValue = int(line.split(" = ")[1])
        memIndex = int(line.split("[")[1].split("]")[0])
        binMemIndex = bin(memIndex).split("0b")[1].zfill(36)
        result = ''
        for index in range(len(binMemIndex)):
            memBit = binMemIndex[index]
            maskBit = mask[index]
            if maskBit == "0":
                resultBit = memBit
            elif maskBit == "1":
                resultBit = "1"
            else:
                resultBit = "f"
            result += resultBit
        addresses = resolveFs([result])
        resolvedFloatingValues = False

        for address in addresses:
            decAddress = int(address, 2)
            memory[decAddress] = decValue
total = 0
for value in memory.values():
    total += value
print "part 2: ", total