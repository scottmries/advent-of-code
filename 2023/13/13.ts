const { readFileSync } = require('fs')

const lines = readFileSync('./13/13.txt').toString().split("\n")
export const matrices: string[][] = [[]]

for (const line of lines) {
    if (line.length) {
        matrices[matrices.length - 1].push(line)
    } else {
        matrices.push([])
    }
}

// matrices.map(m => {
//     console.log()
//     m.map(el => console.log(el))
// })

matrices[0].map(m => console.log(m))

export const rotate = (matrix: string[]): string[] => {
    let rotated = new Array(matrix[0].length).fill('')
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            rotated[j] += matrix[i][j]
        }
    }
    return rotated
}

const solve = (matrix: string[], reflected = false, multiplier = 100): number => {
    const testReflection = (matrix: string[]): boolean => {
        let i = 0;
        while (i < matrix.length / 2) {
            if (matrix[i] !== matrix[matrix.length - 1 - i]) {
                return false
            }
            i++
        }
        return true
    }
    
    let index = 1
    while (index < matrix.length) {
        if (matrix[index] === matrix[0]) {
            if (testReflection(matrix.slice(1, index))) {
                const offset = reflected ? matrix.length - index : 1
                const width = Math.floor(index / 2) 
                return multiplier * (width + offset)
            }
        }
        index += 1
        if (index === matrix.length - 1) {
            if (!reflected) {
                const reversed = matrix.slice().reverse()
                return solve(reversed, true, multiplier)
            }
        }
    }
    const copy = matrix.slice()
    return solve(rotate(copy), false, 1)
}

export const solution = (matrices: string[][]): number => {
    return matrices.reduce((acc, matrix) => 
    {
        const solution = solve(matrix)
        console.log(solution)
        return acc + solution
    }, 0)
}

console.log(solution(matrices))

export default solve