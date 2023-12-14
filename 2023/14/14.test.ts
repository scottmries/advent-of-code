import { describe, expect, test } from "bun:test";
import solution, { cycle, rotateClockwise, solution2, sum, tiltNorth, to2D } from './14';

const example1 = [
    "O....#....",
    "O.OO#....#",
    ".....##...",
    "OO.#O....O",
    ".O.....O#.",
    "O.#..O.#.#",
    "..O..#O..O",
    ".......O..",
    "#....###..",
    "#OO..#....",
    ]

const solved1 = [
    "OOOO.#.O..",
    "OO..#....#",
    "OO..O##..O",
    "O..#.OO...",
    "........#.",
    "..#....#.#",
    "..O..#.O.O",
    "..O.......",
    "#....###..",
    "#....#....",
]

const example1Rotated = [
    "#.##..#",
    "..##...",
    "##..###",
    "#....#.",
    ".#..#.#",
    ".#..#.#",
    "#....#.",
    "##..###",
    "..##...",
]

const basicExample = [
    '.#.',
    '#..',
    'OOO',
    'O.O',
    '.OO'
]

const basicNorth = [
    '.#O',
    '#OO',
    'OOO',
    'O..',
    '...'
]

const primitive = [
    'O.#',
    '#O.'
]

const primitiveRotated = [
    '#O',
    'O.',
    '.#'
]

const oneCycle = [
    '.....#....',
    '....#...O#',
    '...OO##...',
    '.OO#......',
    '.....OOO#.',
    '.O#...O#.#',
    '....O#....',
    '......OOOO',
    '#...O###..',
    '#..OO#....',
    ]

const twoCycles = [
    '.....#....',
    '....#...O#',
    '.....##...',
    '..O#......',
    '.....OOO#.',
    '.O#...O#.#',
    '....O#...O',
    '.......OOO',
    '#..OO###..',
    '#.OOO#...O',
    ]

    const threeCycles = [
        '.....#....',
        '....#...O#',
        '.....##...',
        '..O#......',
        '.....OOO#.',
        '.O#...O#.#',
        '....O#...O',
        '.......OOO',
        '#...O###.O',
        '#.OOO#...O']

describe("tiltNorth", () => {
    test("gives the correct result", () => {
        expect(tiltNorth(to2D(basicExample))).toEqual(to2D(basicNorth))
    })
})

describe("sum", () => {
    test("of basicNorth", () => {
        expect(sum(to2D(basicNorth))).toBe(24)
    })    
})

describe("rotateClockwise", () => {
    test("works", () => {
        expect(rotateClockwise(to2D(primitive))).toEqual(to2D(primitiveRotated))
    })
    test("four times is unchanged", () => {
        let matrix = to2D(primitive)
        for (let i = 0; i < 4; i++) {
            matrix = rotateClockwise(matrix)
        }
        expect(matrix).toEqual(to2D(primitive))
    })
})

describe("cycling works", () => {
    let matrix
    test("once", () => {
        matrix = cycle(to2D(example1))
        expect(matrix).toEqual(to2D(oneCycle))
    })
    test("twice", () => {
        matrix = cycle(matrix)
        expect(matrix).toEqual(to2D(twoCycles))
    })
    test("three", () => {
        matrix = cycle(matrix)
        expect(matrix).toEqual(to2D(threeCycles))
    })
})

describe("solution", () => {
    test("of example1 is correct", () => {
        expect(solution(example1)).toBe(136)
    })
})

describe("solution2", () => {
    test("of example1 is correct", () => {
        expect(solution2(to2D(example1))).toBe(64)
    })
})