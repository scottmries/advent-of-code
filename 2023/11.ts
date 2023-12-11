const { readFileSync } = require('fs')

const lines = readFileSync('11.txt').toString().split("\n")

export const distance = (c1: [number, number], c2: [number, number], galaxy: string[][], expansion = 1): number => {
    const [minX, maxX] = [Math.min(c1[0], c2[0]), Math.max(c1[0], c2[0])]
    const [minY, maxY] = [Math.min(c1[1], c2[1]), Math.max(c1[1], c2[1])]
    let distance = 0
    const cellDistance = (cell: string) : number => {
        if (cell === 'h' || cell === 'v') {
            return expansion + 1
        }
        if (cell === 'x') {
            return (expansion + 1) * 2
        }
        return 1
    }
    for (let i = minX + 1; i <= maxX; i++) {
        distance += cellDistance(galaxy[i][minY])
    }
    for (let i = minY + 1; i <= maxY; i++) {
        distance += cellDistance(galaxy[maxX][i])
    }
    return distance
}
export const expand = (galaxy: string[][]): string[][] => {
    const expandRows = (galaxy: string[][], symbol = 'h', prevSymbol = 'h'): string[][] => {
        let rowsToExpand = galaxy.reduce((acc, row, index) => {
            if (row.every(el => el !== '#')) {
                acc.push(index)
            }
            return acc
        }, <number[]>[])
        while (rowsToExpand.length) {
            const row = rowsToExpand[0]
            galaxy[row] = galaxy[row].map(el => el === prevSymbol ? 'x' : symbol)
            rowsToExpand.shift()
        }
        return galaxy
    }
    const rotate = (galaxy: string[][]): string[][] => {
        let rotated: string[][] = []
        for (let i = 0; i < galaxy[0].length; i++) {
            rotated.push([])
            for (let j = 0; j < galaxy.length; j++) {
                rotated[i].push('')
            }
        }
        for (let i = 0; i < galaxy.length; i++) {
            for (let j = 0; j < galaxy[0].length; j++) {
                rotated[j][i] = galaxy[i][j]
            }
        }
        return rotated
    }
    galaxy = expandRows(galaxy)
    galaxy = rotate(galaxy)
    galaxy = expandRows(galaxy, 'v')
    galaxy = rotate(galaxy)
    return galaxy
}

export const stringsToArray = (strings: string[]): string[][] => {
    return strings.map(string => string.split(""))
}

export const findGalaxies = (space: string[][]): [number, number][] => {
    let galaxies: [number, number][] = []
    for (let i = 0; i < space.length; i++) {
        for (let j = 0; j < space[0].length; j++) {
            if (space[i][j] === '#') {
                galaxies.push([i, j])
            }
        }
    }
    return galaxies
}

const solution = (lines: string[], expansion = 1): number => {
    let solution1 = 0
    let space = expand(stringsToArray(lines))
    const galaxies = findGalaxies(space)
    for (let i = 0; i < galaxies.length; i++) {
        for (let j = i + 1; j < galaxies.length; j++) {
            solution1 += distance(galaxies[i], galaxies[j], space, expansion)
        }
    }
    return solution1
}

console.log(solution(lines))
console.log(solution(lines, 999999))

export default solution