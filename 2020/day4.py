from day4data import values
validPassports = 0

for passport in values:
    requiredFields = ["byr","iyr","eyr","hgt","hcl","ecl","pid"]
    for line in passport:
        key = line.split(":")[0]
        if key in requiredFields:
            requiredFields.remove(key)
    if len(requiredFields) == 0:
        validPassports += 1

print validPassports

def isnumeric(s):
    try:
        int(s)
    except:
        return False
    else:
        return True

def byr(s):
    return isnumeric(s) and int(s) > 1919 and int(s) < 2003

def iyr(s):
    return isnumeric(s) and int(s) > 2009 and int(s) < 2021

def eyr(s):
    return isnumeric(s) and int(s) > 2019 and int(s) < 2031

def hgt(s):
    if s.find("cm") > -1:
        measure = s.split("cm")[0]
        return isnumeric(measure) and int(measure) > 149 and int(measure) < 194
    if s.find("in") > -1:
        measure = s.split("in")[0]
        return isnumeric(measure) and int(measure) > 58 and int(measure) < 77
    return False

def hcl(s):
    if s[0] == "#" and len(s) == 7:
        try:
            hex = int(s[1:], 16)
            
        except:
            return False
        else:
            return True
    return False

def ecl(s):
    return s in ["amb","blu","brn","gry","grn","hzl","oth"]

def pid(s):
    if not len(s) == 9:
        return False
    for c in s:
        if not isnumeric(c):
            return False
    return True

validators = {
    "byr": byr,
    "iyr": iyr,
    "eyr": eyr,
    "hgt": hgt,
    "hcl": hcl,
    "ecl": ecl,
    "pid": pid
}

validPassports = 0
for passport in values:
    requiredFields = ["byr","iyr","eyr","hgt","hcl","ecl","pid"]
    for line in passport:
        [key, value] = line.split(":")
        if key in requiredFields and validators[key](value):
            requiredFields.remove(key)
    if len(requiredFields) == 0:
        validPassports += 1
print validPassports