type Direction = 'N' | 'E' | 'S' | 'W' 
type PipeSymbol = '|' | '-' | 'F' | 'J' | '7' | 'L' | '.'
type Coordinate = [number, number]
type PathCell = {coordinate: Coordinate, direction: Direction | null, pipeSymbol: PipeSymbol}

const { readFileSync } = require('fs')

const lines = readFileSync('10.txt').toString().split("\n")

const getPipeDirections = (pipe: PipeSymbol): Direction[] => {
    return {
        '|': ['N', 'S'],
        '-': ['E', 'W'],
        'F': ['E', 'S'],
        'J': ['N', 'W'],
        '7': ['W', 'S'],
        'L': ['E', 'N'],
        '.': []
    }[pipe] as Direction[]
}

const getReverseDirection = (direction: Direction): Direction => {
    return {
        'N': 'S',
        'S': 'N',
        'E': 'W',
        'W': 'E'
    }[direction] as Direction
}

const getRightHandDirection = (direction: Direction): Direction => {
    return {
        'N': 'E',
        'S': 'W',
        'E': 'S',
        'W': 'N'
    }[direction] as Direction
}

const getLeftHandDirection = (direction: Direction): Direction => {
    return getReverseDirection(getRightHandDirection(direction))
}

const directionAdder = (direction: Direction): Coordinate => {
    return {
        'N': [0, -1],
        'S': [0, 1],
        'E': [1, 0],
        'W': [-1, 0]
    }[direction] as Coordinate
}

const addCoordinates = (c1: Coordinate, c2: Coordinate): Coordinate => {
    return c1 && c2 && [c1[0] + c2[0], c1[1] + c2[1]] as Coordinate
}

const equalCoordinates = (c1: Coordinate, c2: Coordinate): boolean => {
    return !c1 || !c2 ? false : c1[0] === c2[0] && c1[1] === c2[1]
}

const passThroughPipe = (previous: Direction, current: Coordinate, pipe: PipeSymbol, lines: string[]): {direction: Direction, coordinate: Coordinate, symbol: PipeSymbol} | null=> {
    if (pipe === '.') {
        // ceci n'est pas une pipe
        return null
    }
    const possibleDirections: Direction[] = getPipeDirections(pipe)
    const unavailableDirection: Direction = getReverseDirection(previous)
    const unavailableDirectionIndex: number = possibleDirections.indexOf(unavailableDirection)
    if (unavailableDirectionIndex === -1) {
        // can't enter this pipe from that direction
        return null
    }
    const otherDirection = possibleDirections[unavailableDirectionIndex === 0 ? 1 : 0]
    const nextCoordinate = addCoordinates(current, directionAdder(otherDirection))
    const nextSymbol: PipeSymbol = lines[nextCoordinate[1]][nextCoordinate[0]] as PipeSymbol
    return { coordinate: nextCoordinate, direction: otherDirection, symbol: nextSymbol}
}

const findClosedPath = (lines: string[]): PathCell[] => {
    const start: Coordinate = lines.reduce((a: Coordinate, line: string, index: number) => {
        if (line.indexOf('S') > -1) {
            a = [line.indexOf('S'), index]
        }
        return a
    }, [0, 0]);

    const startPipes: PipeSymbol[] = ['L', 'F', '7', 'J'];

    for (let i = 0; i < startPipes.length; i++) {
        const startPipe = startPipes[i]
        const startDirectionOfEntry = getReverseDirection(getPipeDirections(startPipe)[0])
        lines[start[1]] = lines[start[1]].slice(0, start[0]) + startPipe + lines[start[1]].slice(start[0] + 1)
        let path: PathCell[] = []
        let nextPipe = passThroughPipe(startDirectionOfEntry, start, startPipe, lines)
        while (nextPipe !== null) {
            path.push({ coordinate: nextPipe.coordinate, direction: nextPipe.direction, pipeSymbol: nextPipe.symbol})
            if (equalCoordinates(nextPipe!.coordinate, start)) {
                return path
            }
            nextPipe = passThroughPipe(nextPipe!.direction, nextPipe!.coordinate, nextPipe!.symbol, lines)
        }
        
    }
    return [{coordinate: [0, 0], direction: 'E', pipeSymbol: '.'}]
}

const getFirstPathCell = (grid: PathCell[][]): PathCell => {
    for(let row = 0; row < grid.length; row++) {
        console.log(grid[row])
        for (let column = 0; column < grid[0].length; column++) {
            if (grid[row][column].pipeSymbol !== '.') {
                return grid[row][column]
            }
        }
    }
    return {coordinate: [-1, -1], direction: null, pipeSymbol: '.'}
}

const solution = (lines: string[]): {solution1: number, solution2: number} => {
    const path = findClosedPath(lines)
    const solution1 = Math.ceil(path.length / 2)
    let solution2 = 0
    // let pathOnGround: PathCell[][]= [[]]
    // for (let i = 0; i < lines.length; i++) {
    //     let row: PathCell[] = []
    //     for (let j = 0; j < lines[i].length; j++) {
    //         row.push({coordinate: [j, i], direction: null, pipeSymbol: '.'})
    //     }
    //     pathOnGround.push(row)
    // }
    // path.forEach(cell => {
    //     pathOnGround[cell.coordinate[1]][cell.coordinate[0]] = cell
    // })
    
    // const firstPathCell = getFirstPathCell(pathOnGround)
    // console.log(firstPathCell)
    // pathOnGround.map(row => {
    //     let polarity = 0
    //     let open = false
    //     console.log(row.join(""))
    //     row.map((cell, i) => {
    //         if (cell === '.' && polarity === 1) {
    //                 console.log(`cell ${i} of the row is in`)
    //                 solution2++
    //         }
    //         if (['|', 'F', 'L', 'J', '7'].indexOf(cell) > -1) {
    //             polarity = (polarity + 1) % 2
    //         }
    //     })
    // })
    return {solution1, solution2}
}

// console.log(solution(lines))
export default solution