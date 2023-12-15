const { readFileSync } = require('fs')

const lines = readFileSync('./15/15.txt').toString().split(",")

export const hash = (input: string): number => {
    return input.split("").reduce((a, char): number => ((a + char.charCodeAt(0)) * 17) % 256, 0)
}

const solution = (input: string[]): number => input.reduce((a, word) => a + hash(word), 0)

export const solution2 = (input: string[]): number => {
    const boxes: {label: string, focalLength: number}[][] = [...Array(256)].map(() => [])
    input.map(word => {
        (['=', '-']).map(separator => {
            if (word.indexOf(separator) > -1) {
                const [label] = word.split(separator)
                const index = hash(label)
                const existingIndex = boxes[index].findIndex(el => el.label === label)
                if (separator === '=') {
                    const focalLength = Number(word.split('=')[1])
                    if (existingIndex > -1) {
                        boxes[index][existingIndex] = {label, focalLength}
                    } else {
                        boxes[index].push({label, focalLength})
                    }
                }
                if (separator === '-') {
                    if (existingIndex > -1) {
                        boxes[index] = [...boxes[index].slice(0, existingIndex), ...boxes[index].slice(existingIndex + 1)]
                    }
                }
            }
        })
    })

    return boxes.reduce((a, box, index) => {
        return a + box.reduce((a2, slot, slotIndex) => {
            return a2 + (index + 1) * (slotIndex + 1) * slot.focalLength
        }, 0)
    }, 0)
}

console.log(solution(lines))
console.log(solution2(lines))

export default solution