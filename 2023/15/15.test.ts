import { describe, expect, test } from "bun:test";
import solution, { hash, solution2 } from './15';

const examples: [string, number][] = [
    ["rn=1", 30],
    ["cm-", 253],
    ["qp=3", 97],
    ["cm=2", 47],
    ["qp-", 14],
    ["pc=4", 180],
    ["ot=9", 9],
    ["ab=5", 197],
    ["pc-", 48],
    ["pc=6", 214],
    ["ot=7", 231],
]

describe("hash", () => {
    for (let i = 0; i < examples.length; i++) {
        test(`works for example ${i}`, () => {
            expect(hash(examples[i][0])).toBe(examples[i][1])
        })
    }
})

describe("solution", () => {
    test("is correct for examples", () => {
        expect(solution(examples.map(el => el[0]))).toBe(1320)
    })
})

describe("solution 2", () => {
    test("is correct for examples", () => {
        expect(solution2(examples.map(el => el[0]))).toBe(145)
    })
})