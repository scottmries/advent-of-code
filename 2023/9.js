const { readFileSync } = require('fs')

const lines = readFileSync('9.txt').toString().split("\n")

const [result1, result2] = lines.reduce((a, line) => {
    line = line.split(" ").map(el => Number(el))
    let lineDifferences = line
    let differences = [lineDifferences]
    while (!lineDifferences.every(difference => difference === 0)) {
        lineDifferences = lineDifferences.reduce((a2, difference, index) => {
            if (index < lineDifferences.length - 1) {
                a2.push(lineDifferences[index + 1] - difference)
            }
            return a2
        }, [])
        differences.push(lineDifferences)
    }
    differences.reverse()
    differences[0].push(0)
    const result = differences.reduce((a2, difference, index) => {
        a2 = difference
        if (differences[index - 1]) {
            const nextLastValue = differences[index - 1][differences[index - 1].length - 1] + a2[a2.length - 1]
            const nextFirstValue = a2[0] - differences[index - 1][0]
            a2.unshift(nextFirstValue)
            a2.push(nextLastValue)
        }
        return a2
    }, [])
    return [a[0] + result[result.length - 1], a[1] + result[0]]
}, [0, 0])

console.log(result1)
console.log(result2)