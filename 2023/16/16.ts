const { readFileSync } = require('fs')

const lines = readFileSync('./16/16.txt')

type Direction = 'north' | 'east' | 'south' | 'west'
type DirectionFunction = 'move' | 'split' | Direction
type Event = {coordinate: Coordinate, direction: Direction}


type EntryDirectionFunction = {
    north: DirectionFunction,
    east: DirectionFunction,
    south: DirectionFunction,
    west: DirectionFunction
}

type Coordinate = {
    x: number,
    y: number
}

const directionAdders = {
    'north': {x: 0, y: -1},
    'east': {x: 1, y: 0},
    'south': {x: 0, y: 1},
    'west': {x: -1, y: 0}
}

const entryDirectionFunctions = {
    '.': {
        north: 'move',
        east: 'move',
        south: 'move',
        west: 'move'
    },
    '-': {
        north: 'split',
        east: 'move',
        south: 'split',
        west: 'move'
    },
    '|': {
        north: 'move',
        east: 'split',
        south: 'move',
        west: 'split'
    },
    '/': {
        north: 'east',
        east: 'north',
        south: 'west',
        west: 'south'
    },
    'f': {
        north: 'west',
        east: 'south',
        south: 'east',
        west: 'north'
    }

}

class Cell {
    coordinate: Coordinate;
    electrified: boolean;
    entryDirectionFunction: EntryDirectionFunction;
    character: string;
    constructor (coordinate: Coordinate, character: string) {
        this.coordinate = coordinate
        this.electrified = false;
        this.character = character;
        this.entryDirectionFunction = entryDirectionFunctions[character]
    }
    get x() {
        return this.coordinate.x
    }
    get y() {
        return this.coordinate.y
    }
}

class Beam {
    coordinate: Coordinate;
    direction: Direction;
    complete: boolean;
    constructor (coordinate: Coordinate, direction: Direction) {
        this.coordinate = coordinate
        this.direction = direction
        beams.push(this)
        this.complete = false
    }
    toString() {
        return `(${this.x}, ${this.y}) going ${this.direction}`
    }
    move() {
        grid[this.y][this.x].electrified = true
        this.coordinate = {
            x: this.coordinate.x + directionAdders[this.direction].x,
            y: this.coordinate.y + directionAdders[this.direction].y
        }
    }
    turn(direction: Direction) {
        this.direction = direction
        this.move()
    }
    split() {
        const splitDirections = {
            'north': ['east', 'west'] as Array<Direction>,
            'east': ['south', 'north'] as Array<Direction>,
            'south': ['west', 'east'] as Array<Direction>,
            'west': ['north', 'south'] as Array<Direction>
        }
        const split = new Beam(this.coordinate, splitDirections[this.direction][1])
        this.direction = splitDirections[this.direction][0]
        this.move()
        split.move()
    }
    equals(b: Beam) {
        return this.x === b.x && this.y === b.y && this.direction === b.direction
    }
    
    
    get x() {
        return this.coordinate.x
    }
    get y() {
        return this.coordinate.y
    }
}

const printGrid = () => {
    console.log()
    grid.map(row => {
        console.log(
            row.map(cell => {
                const cellBeam = beams.find(beam => beam.x === cell.x && beam.y === cell.y)
                if (cellBeam) {
                    return {
                        'north': '^',
                        'east': '>',
                        'south': 'v',
                        'west': '<'
                    }[cellBeam.direction]
                }
                return cell.electrified ? '*' : cell.character
            }).join("")
        )
    })
}

const printBeams = () => {
    beams.map(beam => console.log({x: beam.x, y: beam.y, direction: beam.direction}))
}

let grid: Cell[][] = []
let beams: Beam[] = []
let history: Event[] = []

const loadCells = (file): void => {
    let input = file.toString().toString().split("\n")
    grid = input.map((line, y) => {
        return line.split("").map((character, x) => new Cell({x, y}, character));
    })
}

const solve = () => {
    while(beams.length) {
        beams.map((beam, index) => {
            if (typeof history.find(e => e.coordinate.x === beam.coordinate.x && e.coordinate.y === beam.coordinate.y && e.direction === beam.direction) !== 'undefined') {
                beams[index].complete = true
            } else {
                history.push({
                    coordinate: {x: beam.x, y: beam.y},
                    direction: beam.direction
                })
            }
            const cell = grid[beam.y] ? grid[beam.y][beam.x] : null
            if (cell) {
                const f = cell.entryDirectionFunction[beam.direction]
                if (['north', 'east', 'south', 'west'].indexOf(f) > -1) {
                    beam.turn(f)
                } else {
                    beam[f]()
                }
            } else {
                beams[index].complete = true
            }
        })
        beams = beams.filter(beam => !beam.complete)
    }
    return grid.reduce((ar, row) => ar + row.reduce((ac, cell) => ac + (cell.electrified ? 1 : 0), 0), 0)
}

const solution = (file): number => {
    const firstBeam = new Beam({x: 0, y: 0}, 'east')
    loadCells(file)
    console.clear()
    return solve()
}

const solution2 = (file): number => {
    loadCells(file)
    let startingBeams: {coordinate: Coordinate, direction: Direction}[] = []
    for (let y = 0; y < grid.length; y++) {
        startingBeams.push({coordinate: {x: 0, y}, direction: 'east'})
        startingBeams.push({coordinate: {x: grid[0].length - 1, y}, direction: 'west'})
    }
    for (let x = 0; x < grid[0].length; x++) {
        startingBeams.push({coordinate: {x, y: 0}, direction: 'south'})
        startingBeams.push({coordinate: {x, y: grid.length - 1}, direction: 'north'})
    }
    let max = 0
    startingBeams.map((sBeam, index) => {
        console.log(`startingBeam ${index} of ${startingBeams.length}`)
        loadCells(file)
        beams = []
        history = []
        const beam = new Beam(sBeam.coordinate, sBeam.direction)
        const count = solve()
        if (count > max) {
            console.log(count)
            max = count
        }
    })
    return max
}


console.log(solution(lines))
console.log(solution2(lines))

export default solution