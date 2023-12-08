const { readFileSync } = require('fs')

const lines = readFileSync('8.txt').toString().split("\n")

const instructions = lines[0].split("")
const maps = lines.slice(2).reduce((a, map) => {
    const [start, L, R] = [...map.matchAll(/[A-Z]{3}/g)].map(el => el[0])
    a[start] = {L, R}
    return a
}, {})

let count = 0
let node = 'AAA'
let instructionIndex = 0
while (node !== 'ZZZ') {
    node = maps[node][instructions[instructionIndex]]
    count++
    instructionIndex = (instructionIndex + 1) % instructions.length
}
console.log(count)

let nodes = Object.keys(maps).filter(k => k[2] === 'A')
let loopLengths = nodes.map(node => {
    let count = 0
    let instructionIndex = 0
    while (node[2] !== 'Z') {
        node = maps[node][instructions[instructionIndex]]
        instructionIndex = (instructionIndex + 1) % instructions.length
        count++
    }
    return count
})
loopLengths.sort()
let factor = 2
let mutualFactors = 1
while (factor <= loopLengths[0]) {
    if (loopLengths.every(loopLength => loopLength % factor === 0)) {
        loopLengths = loopLengths.map(loopLength => loopLength / factor)
        mutualFactors *= factor
    } else {
        factor++
    }
}
const result = loopLengths.reduce((a, loopLength) => a * loopLength, 1) * mutualFactors
console.log(result)