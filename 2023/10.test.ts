import { expect, test } from "bun:test";
import solution from './10';

const squareLines = [
    '.....',
    '.S-7.',
    '.|.|.',
    '.L-J.',
    '.....'
]

const complexLines = [
    '..F7.',
    '.FJ|.',
    'SJ.L7',
    '|F--J',
    'LJ...'
]

const p2e1 = [
    '...........',
    '.S-------7.',
    '.|F-----7|.',
    '.||.....||.',
    '.||.....||.',
    '.|L-7.F-J|.',
    '.|..|.|..|.',
    '.L--J.L--J.',
    '...........',
]

const p2e2 = [
    '..........',
    '.S------7.',
    '.|F----7|.',
    '.||OOOO||.',
    '.||OOOO||.',
    '.|L-7F-J|.',
    '.|II||II|.',
    '.L--JL--J.',
    '..........'
]

const p2e3 = [
    '.F----7F7F7F7F-7....',
    '.|F--7||||||||FJ....',
    '.||.FJ||||||||L7....',
    'FJL7L7LJLJ||LJ.L-7..',
    'L--J.L7...LJS7F-7L7.',
    '....F-J..F7FJ|L7L7L7',
    '....L7.F7||L7|.L7L7|',
    '.....|FJLJ|FJ|F7|.LJ',
    '....FJL-7.||.||||...',
    '....L---J.LJ.LJLJ...'
]

const p2e4 = [
    'FF7FSF7F7F7F7F7F---7',
    'L|LJ||||||||||||F--J',
    'FL-7LJLJ||||||LJL-77',
    'F--JF--7||LJLJ7F7FJ-',
    'L---JF-JLJ.||-FJLJJ7',
    '|F|F-JF---7F7-L7L|7|',
    '|FFJF7L7F-JF7|JL---7',
    '7-L-JL7||F7|L7F-7F7|',
    'L.L7LFJ|||||FJL7||LJ',
    'L7JLJL-JLJLJL--JLJ.L',
    ]

test("square example", () => {
    expect(solution(squareLines).solution1).toBe(4);
})

test("more complex example", () => {
    expect(solution(complexLines).solution1).toBe(8);
});

test("part 2 examples", () => {
    expect(solution(p2e1).solution2).toBe(4);
    expect(solution(p2e2).solution2).toBe(4);
    expect(solution(p2e3).solution2).toBe(8);
    expect(solution(p2e4).solution2).toBe(10);
});