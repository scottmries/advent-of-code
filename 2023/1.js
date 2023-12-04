const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
});

let sum = 0
let k = 0
rl.on("line", (line) => {
    const digitValue = (s) => {
        const strings = {
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5,
            six: 6,
            seven: 7,
            eight: 8,
            nine: 9
        }
        return strings[s] || s * 1
    }
    const regex = /\d|one|two|three|four|five|six|seven|eight|nine/
    let matches = line.match(regex)
    const first = digitValue(matches[0]) * 10
    let last
    for (let i = 0; i < line.length; i++) {
        matches = line.slice(i).match(regex)
        if (matches) {
            last = digitValue(matches[0])
        }
    }
    sum += first + last
    k++
  // process a line at a time
    process.stdout.write(`${k}: ${ line.slice(0, 64)}, ${matches}, ${first + last}, ${sum}\n`);
});

rl.on("close", function() {
    process.stdout.write(`${sum}`);
})
