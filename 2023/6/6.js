const { readFileSync } = require('fs')

const lines = readFileSync('6.txt').toString().split("\n")
const times = lines[0].split(/\s+/).slice(1).map(el => Number(el))
const records = lines[1].split(/\s+/).slice(1).map(el => Number(el))

const result = times.reduce((acc, time, index) => {
    let count = 0
    const record = records[index]
    for (let i = 0; i <= time; i++) {
        const distance = i * (time - i)
        if (distance > record) {
            count++
        }
    }
    return acc * count
}, 1)

console.log(result)

const singleTime = Number(times.join(""))

const singleRecord = Number(records.join(""))

let result2 = 0
for (let i = 0; i <= singleTime; i++) {
    const distance = i * (singleTime - i)
    if (distance > singleRecord) {
        result2++
    }
}

console.log(result2)