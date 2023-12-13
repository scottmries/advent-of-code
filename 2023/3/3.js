const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
});

let sum = 0
let k = 1
const totalLines = 140
let numbers = []
let symbols = []
let asterisks = []
rl.on("line", (line) => {
  const numberMatches = line.matchAll(/(\d)+/g)
  const symbolMatches = line.matchAll(/[^\d.]/g)
  for (const match of numberMatches) {
    const neighbors = []
    for (let x = match.index - 1; x <= match.index + match[0].length; x++) {
      for (const y of [-1, 0, 1]) {
        if (
            (x >= 0 && x < line.length) &&
            (k + y >= 0 && k + y < totalLines) &&
            (!(y === 0 && (x >= match.index && x < match.index + match[0].length)))
          ) 
          {
            neighbors.push([x, k + y])
          }
        }
      }
    numbers.push({
      value: match[0] * 1,
      neighbors
    })
  }
  for (const match of symbolMatches) {
    symbols.push([match.index, k])
    if (match[0] === '*') {
      console.log(match)
      asterisks.push([match.index, k])
    }
  }
  k++
});

rl.on("close", function() {
    let partNumbers = []
    for (const number of numbers) {
      let found = false
      let k = 0
      while (!found && k < symbols.length) {
        const symbol = symbols[k]
        for (const neighbor of number.neighbors) {
          if (neighbor[0] === symbol[0] && neighbor[1] === symbol[1]) {
            found = true
            partNumbers.push(number)
            break
          }
        }
        k++
      }
      if (found) {
        sum += number.value
      }
    }
    process.stdout.write(`part number sum: ${sum}\n`);

    console.log('asterisks', asterisks.length)
    console.log('part numbers', partNumbers.length)

    let asteriskSum = 0
    for (const asterisk of asterisks) {
      let partNumberNeighbors = 0
      let product = 1
      for (const partNumber of partNumbers) {
        let adjacent = false
        for (const neighbor of partNumber.neighbors) {
          if (neighbor[0] === asterisk[0] && neighbor[1] === asterisk[1]) {
            console.log('adjacent', neighbor, asterisk)
            adjacent = true
          }
        }
        if (adjacent) {
          console.log('adjacent number', partNumber.value)
          partNumberNeighbors++
          product *= partNumber.value
        }
      }
      if (partNumberNeighbors === 2) {
        console.log('adding product', product)
        asteriskSum += product
      } else {
        console.log('not adding product', product)
      }
    }
    process.stdout.write(`asterisk sum: ${asteriskSum}`);
})
