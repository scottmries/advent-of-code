const { readFileSync } = require('fs')

const cards = readFileSync('4.txt').toString().split("\n")
let matchCount = {}

const result = cards.reduce((acc, card) => {
    let score = 0
    const id = card.match(/^Card\s+(\d+)\:/)[1]
    const values = card.match(/\:[ 0-9]+\|/)[0].match(/[0-9]+/g)
    const winners = card.match(/\|[ 0-9]+$/)[0].match(/[0-9]+/g)
    for (value of values) {
        if (winners.indexOf(value) > -1) {
            score++
        }
        // side effect for solution 2
        matchCount[id] = {count: 1, score}
    }
    return acc + (score === 0 ? 0 : 2 ** (score - 1))
}, 0)

console.log(result)

Object.entries(matchCount).forEach(([key, value]) => {
    const id = Number(key)
    for (let i = id + 1; i <= id + value.score; i++) {
        matchCount[i].count = matchCount[i].count + value.count
    }
})

const result2 = Object.values(matchCount).reduce((acc, match) => acc + match.count, 0)

console.log(result2)