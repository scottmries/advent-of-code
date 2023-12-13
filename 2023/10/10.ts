const { readFileSync } = require('fs')

type Direction = 'N' | 'E' | 'S' | 'W' 
type PipeSymbol = '|' | '-' | 'F' | 'J' | '7' | 'L' | '.' | 'O' | 'I'
type Coordinate = [number, number]
type PathCell = {coordinate: Coordinate, direction: Direction | null, pipeSymbol: PipeSymbol}

const lines = readFileSync('./10/10.txt').toString().split("\n")

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

const getOutsideHandedness = (firstPathCell: PathCell): 'left' | 'right' => {
    if (firstPathCell.pipeSymbol === '|') {
        return firstPathCell.direction === 'S' ? 'right' : 'left'
    }
    if (firstPathCell.pipeSymbol === 'F') {
        return firstPathCell.direction === 'W' || firstPathCell.direction === 'S' ? 'right' : 'left'
    }
    if (firstPathCell.pipeSymbol === 'L') {
        return firstPathCell.direction === 'E' || firstPathCell.direction === 'S' ? 'right' : 'left'
    }
    return 'left'
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
    if (!lines[nextCoordinate[1]]) {
        return null
    }
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
        for (let column = 0; column < grid[row].length; column++) {
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
    let pathOnGround: PathCell[][]= []
    for (let i = 0; i < lines.length; i++) {
        let row: PathCell[] = []
        for (let j = 0; j < lines[i].length; j++) {
            row.push({coordinate: [j, i], direction: null, pipeSymbol: '.'})
        }
        pathOnGround.push(row)
    }
    path.forEach(cell => {
        pathOnGround[cell.coordinate[1]][cell.coordinate[0]] = cell
    })
    
    const firstPathCell = getFirstPathCell(pathOnGround)
    const outsideHandedness = getOutsideHandedness(firstPathCell)
    let outside
    let inside
    if (outsideHandedness === 'right') {
        outside = getRightHandDirection
        inside = getLeftHandDirection
    } else {
        outside = getLeftHandDirection
        inside = getRightHandDirection
    }
    path.forEach(cell => {
        const outsideNeighborCoordinate = addCoordinates(cell.coordinate, directionAdder(outside(cell.direction)))
        const insideNeighborCoordinate = addCoordinates(cell.coordinate, directionAdder(inside(cell.direction)))
        const outsideNeighbor = pathOnGround[outsideNeighborCoordinate[1]] ? pathOnGround[outsideNeighborCoordinate[1]][outsideNeighborCoordinate[0]] : null
        if (outsideNeighbor && outsideNeighbor.pipeSymbol === '.') {
            outsideNeighbor.pipeSymbol = 'O'
        }
        const insideNeighbor = pathOnGround[insideNeighborCoordinate[1]] ? pathOnGround[insideNeighborCoordinate[1]][insideNeighborCoordinate[0]] : null
        if (insideNeighbor && insideNeighbor.pipeSymbol === '.')  {
            insideNeighbor.pipeSymbol = 'I'
        }
    })

    path.reverse();

    [outside, inside] = [inside, outside]

    path.forEach(cell => {
        const outsideNeighborCoordinate = addCoordinates(cell.coordinate, directionAdder(outside(cell.direction)))
        const insideNeighborCoordinate = addCoordinates(cell.coordinate, directionAdder(inside(cell.direction)))
        const outsideNeighbor = pathOnGround[outsideNeighborCoordinate[1]] ? pathOnGround[outsideNeighborCoordinate[1]][outsideNeighborCoordinate[0]] : null
        if (outsideNeighbor && outsideNeighbor.pipeSymbol === '.') {
            outsideNeighbor.pipeSymbol = 'O'
        }
        const insideNeighbor = pathOnGround[insideNeighborCoordinate[1]] ? pathOnGround[insideNeighborCoordinate[1]][insideNeighborCoordinate[0]] : null
        if (insideNeighbor && insideNeighbor.pipeSymbol === '.')  {
            insideNeighbor.pipeSymbol = 'I'
        }
    })

    let toFill = pathOnGround.reduce((acc, row) => acc + row.filter(el => el.pipeSymbol === '.').length, 0)
    while(toFill > 0) {
        if (toFill === 8) {
            toFill = 0
        }
        
        for (let i = 0; i < pathOnGround.length; i++) {
            for (let j = 0; j < pathOnGround[i].length; j++) {
                const cell  = pathOnGround[i][j]
                if(cell.pipeSymbol === 'I' || cell.pipeSymbol === 'O') {
                    (['N', 'E', 'S', 'W']).forEach(direction => {
                        const neighborCoordinate = addCoordinates(cell.coordinate, directionAdder(direction as Direction))
                        const insideNeighbor = pathOnGround[neighborCoordinate[1]] ? pathOnGround[neighborCoordinate[1]][neighborCoordinate[0]] : null
                        if (insideNeighbor && insideNeighbor.pipeSymbol === '.')  {
                            insideNeighbor.pipeSymbol = cell.pipeSymbol
                            toFill--
                        }
                    })
                }
            }
        }
    }
    
    let solution2 = 0
    solution2 = pathOnGround.reduce((acc, row) => {
        return acc + row.filter(el => el.pipeSymbol === 'I').length
    }, 0)
    return {solution1, solution2}
}

// this is very, very close; I guessed upwards and got it
console.log(solution(lines))
export default solution