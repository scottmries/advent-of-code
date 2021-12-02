const data = require('./day1data.js')

const countIncreases = (array) => array.reduce((acc, curr, index) => acc + (curr > array[index - 1] ? 1 : 0), 0)
const increases = data.reduce((acc, curr, index) => acc + (curr > data[index - 1] ? 1 : 0), 0)

console.log(countIncreases(data))

let windowData = []

for(let i = 0; i < data.length - 2; i++) {
  windowData.push(data.slice(i, i + 3).reduce((a, b) => a + b))
}

console.log(countIncreases(windowData))
