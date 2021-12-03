const data = require('./day3data.js')

const countOccurrences = (data) => {
  let occurrences = []
  data[0].split("").forEach(char => occurrences.push({0: 0, 1: 0}))
  data.forEach(string => {
    string.split("").forEach((char, index) => {
      occurrences[index][char] += 1
    })
  })
  return occurrences
}

const getLeastAndMostFrequentBits = (data) => {
  const occurrences = countOccurrences(data)
  let leastFrequentString = ''
  let mostFrequentString = ''
  occurrences.forEach(occurrence => {
    if(occurrence['0'] > occurrence['1']) {
      leastFrequentString += '1'
      mostFrequentString += '0'
    } else  {
      leastFrequentString += '0'
      mostFrequentString += '1'
    }
  })
  return { 'least' : leastFrequentString, 'most' : mostFrequentString }
}

const multiplyBinStringsInDec = (string1, string2) => {
  return parseInt(parseInt(string1, 2)) * parseInt(parseInt(string2, 2))
}

const findMatchingCode = (data, check = 'least', index = 0) => {
  if (data.length == 1) {
    return data[0]
  }
  const occurrence = countOccurrences(data)[index]
  const matchChar = occurrence['0'] <= occurrence['1']
    ?
      check == 'least' ? '0' : '1'
    :
      check == 'least' ? '1' : '0'
  let validCodes = []
  data.forEach(code => {
    if(matchChar == code.split("")[index]) {
      validCodes.push(code)
    }
  })
  return findMatchingCode(validCodes, check, index + 1)
}



const getPartOne = () => {
  const {least, most} = getLeastAndMostFrequentBits(data)
  return multiplyBinStringsInDec(least, most)
}

const getPartTwo = () => {
  const leastMatches = findMatchingCode(data)
  const mostMatches = findMatchingCode(data, 'most')
  return multiplyBinStringsInDec(leastMatches, mostMatches)
}

console.log(getPartOne())
console.log(getPartTwo())
