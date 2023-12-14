import { describe, expect, test } from "bun:test";
import solve, { getFlipLocations, rotate, solution, matrices } from './13';

const example1 = [
    "#.##..##.",
    "..#.##.#.",
    "##......#",
    "##......#",
    "..#.##.#.",
    "..##..##.",
    "#.#.##.#."
]

const example2 = [
    "#...##..#",    
    "#....#..#",    
    "..##..###",    
    "#####.##.",    
    "#####.##.",    
    "..##..###",    
    "#....#..#"
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

const smallExample = [
    "..#.##..",
    ".#....##",
    "..#####."
]

const exampleSet = [
    [
        '#.##..##.',
        '..#.##.#.',
        '##......#',
        '##......#',
        '..#.##.#.',
        '..##..##.',
        '#.#.##.#.'
    ],[
        '#...##..#',
        '#....#..#',
        '..##..###',
        '#####.##.',
        '#####.##.',
        '..##..###',
        '#....#..#'
    ],[
        '.#.##.#.#',
        '.##..##..',
        '.#.##.#..',
        '#......##',
        '#......##',
        '.#.##.#..',
        '.##..##.#',
    ],[
        '#..#....#',
        '###..##..',
        '.##.#####',
        '.##.#####',
        '###..##..',
        '#..#....#',
        '#..##...#'
    ],[
        '#.##..##.',
        '..#.##.#.',
        '##..#...#',
        '##...#..#',
        '..#.##.#.',
        '..##..##.',
        '#.#.##.#.',
    ]
]

const zeroSolution = [
    "#.##..##.",
    "..#.##.#.",
    "##..#...#",
    "##...#..#",
    "..#.##.#.",
    "..##..##.",
    "..#.##.#.",
    ]

describe("find correct mirrors of", () => {
    
    test("example1", () => {
        expect(solve(example1)).toBe(5);
    })
    test("example1 with flips", () => {
        expect(solution([example1]).solution2).toBe(300);
    })
    test("example2", () => {
        expect(solve(example2)).toBe(400)
    })
    test("example2 with flips", () => {
        expect(solution([example2]).solution2).toBe(100);
    })
    test("matrices[0]", () => {
        expect(solve(matrices[0])).toBe(8)
    })
    test("matrices[1]", () => {
        expect(solve(matrices[1])).toBe(6)
    })
    test("matrices[2]", () => {
        expect(solve(matrices[2])).toBe(800)
    })
    test("matrices[matrices.length - 1]", () => {
        expect(solve(matrices[matrices.length - 1])).toBe(200)
    })
})

describe("diagonallyReflect", () => {
    test("works correctly", () => {
        expect(rotate(example1)).toEqual(example1Rotated)
    })
})

describe("getFlipLocations", () => {
    test("works correctly", () => {
        const locations = [
            [0, 0], [0, 2], [0, 3],
            [1, 0], [1, 5], [1, 6]
        ]
        expect(getFlipLocations(smallExample).length).toBe(locations.length)
        locations.map(location => {
            expect(getFlipLocations(smallExample).toString().indexOf(location.toString())).not.toBe(-1)
        })
    })
})

describe("solution", () => {
    test("1 is correct for examples", () => {
        expect(solution([example1, example2]).solution1).toBe(405)
    })
    test("1 is correct for first matrix", () => {
        expect(solution([matrices[0].slice()]).solution1).toBe(8)
    })
    test("2 is correct for examples", () => {
        expect(solution([example1, example2]).solution2).toBe(400)
    })
    test("2 is correct for example set", () => {
        expect(solution(exampleSet).solution2).toBe(1400)
    })
    test("1 is correct for the zero solution", () => {
        expect(solution([zeroSolution]).solution1).toBe(0)
    })
})