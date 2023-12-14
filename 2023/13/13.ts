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

const neighbors = (coordinate: [number, number]): [number, number][] => {
    return [coordinate, [coordinate[0], coordinate[1] + 1], [coordinate[0] + 1, coordinate[1]], [coordinate[0] + 1, coordinate[1] + 1]]
}

export const getFlipLocations = (matrix: string[]): [number, number][] => {
    let locations: [number, number][] =[]
    for (let i = 0; i < matrix.length - 1; i++) {
        for (let j = 0; j < matrix[0].length - 1; j++) {
            const neighbors = [matrix[i][j], matrix[i][j + 1], matrix[i + 1][j], matrix[i + 1][j + 1]];
            (['#', '.']).map(c => {
                if (neighbors.filter(el => el === c).length === 3) {
                    locations.push([i, j])
                }
            })
        }
    }
    return locations
}

export const flips = (matrix: string[], location: [number, number]): string[][] => {
    const flip = c => c === '#' ? '.' : '#'
    const toFlips = neighbors([location[0], location[1]])
    let matrices: string[][] = []
    toFlips.map(toFlip => {
        let m = matrix.map(el => el.slice())
        const row = matrix[toFlip[0]]
        const cell = row[toFlip[1]]
        const flippedCell = flip(cell)
        const flippedRow = [...row.slice(0, toFlip[1]), flippedCell, ...row.slice(toFlip[1] + 1)].join("")
        m[toFlip[0]] = flippedRow
        matrices.push(m)
    })
    return matrices
}

export const rotate = (matrix: string[]): string[] => {
    let rotated = new Array(matrix[0].length).fill('')
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            rotated[j] += matrix[i][j]
        }
    }
    return rotated
}

const solve = (matrix: string[], reflected = false, rotated = false, ignore = NaN): number => {
    const multiplier = rotated ? 1 : 100
    const testReflection = (matrix: string[]): boolean => {
        if (matrix.length % 2 === 1) {
            return false
        }
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
                const solution = multiplier * (width + offset)
                if (solution !== ignore) {
                    return solution
                }
            }
        }
        index += 1
        if (index === matrix.length - 1) {
            if (!reflected) {
                const reversed = matrix.slice().reverse()
                return solve(reversed, true, rotated, ignore)
            }
        }
    }
    if (reflected && rotated) {
        return 0
    }
    const copy = matrix.slice()
    return solve(rotate(copy), false, true, ignore)
}

export const solution = (matrices: string[][]): {solution1: number, solution2: number} => {
    let solutions: number[] = []
    const matrices1 = matrices.map(el => el.slice())
    const solution1 = matrices1.reduce((acc, matrix, index) => 
    {
        const solution = solve(matrix.slice())
        solutions[index] = solution
        return acc + solution
    }, 0)

    const matrices2 = matrices.map(el => el.slice())
    const solution2 = matrices2.reduce((acc, matrix, index) => {
        const previousSolution = solutions[index]
        const flipLocations = getFlipLocations(matrix)
        for (const location of flipLocations) {
            for (const flip of flips(matrix.slice(), location)) {
                const s = solve(flip, false, false, previousSolution)
                if (s !== 0) {
                    return acc + s
                }
            }
        }
        return acc
    }, 0)

    return {solution1, solution2}
}

console.log(solution(matrices))

export default solve