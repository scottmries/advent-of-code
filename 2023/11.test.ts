import { describe, expect, test } from "bun:test";
import solution, { distance, expand, findGalaxies, stringsToArray } from './11';

const space = [
    '...#......',
    '.......#..',
    '#.........',
    '..........',
    '......#...',
    '.#........',
    '.........#',
    '..........',
    '.......#..',
    '#...#.....'
    ]

const expandedSpace = stringsToArray([
    '..v#.v..v.',
    '..v..v.#v.',
    '#.v..v..v.',
    'hhxhhxhhxh',
    '..v..v#.v.',
    '.#v..v..v.',
    '..v..v..v#',
    'hhxhhxhhxh',
    '..v..v.#v.',
    '#.v.#v..v.'
    ])

describe("example", () => {
    const expanded = expand(stringsToArray(space))
    test("expands", () => {
        expect(expanded).toEqual(expandedSpace)
    })
    test("measures distance", () => {
        expect(distance([1, 6], [5, 11], stringsToArray(space))).toBe(9)
    })
    test("finds galaxies", () => {
        expect(findGalaxies(expanded).length).toBe(9)
    })
    test("has correct first solution", () => {
        expect(solution(space)).toBe(374);
    })
    test("expands variably", () => {
        expect(solution(space, 9)).toBe(1030);
        expect(solution(space, 99)).toBe(8410);
    })
})