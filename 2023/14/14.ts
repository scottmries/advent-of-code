const { readFileSync } = require('fs')

const lines = readFileSync('./14/14.txt').toString().split("\n")

const toString = (matrix: string[][]): string => matrix.map(el => el.join("")).join("")

export const cycle = (matrix: string[][]): string[][] => {
    for (let i = 0; i < 4; i++) {
        matrix = rotateClockwise(tiltNorth(matrix))
    }
    return matrix
}

export const rotateClockwise = (matrix: string[][]): string[][] => {
    const rotated: string[][] = []
    for (let y = 0; y < matrix[0].length; y++) {
        rotated.push(new Array(matrix.length).fill('x'))
    }
    
    for (let y = matrix.length - 1; y >= 0; y--) {
        for (let x = 0; x < matrix[y].length; x++) {
            const nextX = y
            const nextY = x
            rotated[x][y] = matrix[matrix.length - 1 - y][x]
        }
    }
    return rotated
}

export const to2D = (matrix: string[]): string[][] => matrix.slice().map(el => el.split(""))

export const tiltNorth = (matrix: string[][]): string[][] => {
    let moved = true
    while (moved) {
        moved = false
        matrix.map((row, rowIndex) => {
            if (rowIndex > 0) {
                row.map((cell, cellIndex) => {
                    if (cell === 'O' && matrix[rowIndex - 1][cellIndex] === '.') {
                        moved = true
                        matrix[rowIndex][cellIndex] = '.'
                        matrix[rowIndex - 1][cellIndex] = 'O'
                    }
                })
            }
        })
    }
    return matrix
}

export const sum = (matrix: string[][]): number => {
    return matrix.reduce((acc, row, rowIndex) => {
        return acc + row.reduce((cellAcc, cell) => {
            return cellAcc + (cell === 'O' ? matrix.length - rowIndex : 0)
        }, 0)
    }, 0)
}

const solution = (matrix: string[]): number => {
    return sum(tiltNorth(to2D(matrix)))
}

export const solution2 = (matrix: string[][]): number => {
    let previousMatrices = [toString(matrix)]
    let cycleOffset
    let sums = [sum(matrix)]
    while (true) {
        let found = false
        matrix = cycle(matrix)
        for (let previousIndex = 0; previousIndex < previousMatrices.length; previousIndex++) {
            if ((toString(matrix) === previousMatrices[previousIndex])) {
                cycleOffset = previousIndex
                found = true
                break
            }
        }
        if (found) {
            break
        }
        previousMatrices.push(toString(matrix))
        sums.push(sum(matrix))
    }
    let cycles = 1000000000 - cycleOffset
    sums = sums.slice(cycleOffset)
    return sums[cycles % (sums.length)]
}

console.log(solution(lines))
console.log(solution2(to2D(lines)))

export default solution