import { describe, expect, test } from "bun:test";
import solve, { rotate, solution, matrices } from './13';

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

describe("find correct mirrors of", () => {
    
    test("example1", () => {
        expect(solve(example1)).toBe(5);
    })
    test("example2", () => {
        expect(solve(example2)).toBe(400)
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

describe("solution", () => {
    test("is correct for examples", () => {
        expect(solution([example1, example2])).toBe(405)
    })
    test("is correct for first matrix", () => {
        expect(solution([matrices[0].slice()])).toBe(8)
    })
})