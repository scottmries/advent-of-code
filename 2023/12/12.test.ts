import { describe, expect, test } from "bun:test";
import solution, { solve } from './12';

const example = [
    '???.### 1,1,3',
    '.??..??...?##. 1,1,3',
    '?#?#?#?#?#?#?#? 1,3,1,6',
    '????.#...#... 4,1,1',
    '????.######..#####. 1,6,5',
    '?###???????? 3,2,1',
    ]

describe("find correct arrangements with", () => {
    test("hashes", () => {
        expect(solve('# 1')).toBe(1);
        expect(solve('# 2')).toBe(0);
        expect(solve('## 2')).toBe(1);
        expect(solve('## 3')).toBe(0);
    })
    test("dots", () => {
        expect(solve('. 1')).toBe(0);
        expect(solve('. 2')).toBe(0);
    })
    test("mixed hashes and dots", () => {
        expect(solve('.# 1')).toBe(1);
        expect(solve('#. 1')).toBe(1);
        expect(solve('## 1')).toBe(0);
        expect(solve('#.# 1,1')).toBe(1);
        expect(solve('#..# 1,1')).toBe(1);
        expect(solve('##.### 2,3')).toBe(1);
    })
    test("only question marks", () => {
        expect(solve('? 1')).toBe(1);
        expect(solve('? 2')).toBe(0);
        expect(solve('?? 1')).toBe(2);
        expect(solve('??? 1')).toBe(3);
        expect(solve('??? 2')).toBe(2);
        expect(solve('??? 1,1')).toBe(1);
    })
})

describe("example", () => {
    ([1, 4, 1, 1, 4, 10]).map((solution, index) => {
        test(`${index}'s arrangements are correct`, () => {
            expect(solve(example[index])).toBe(solution)
        })
    })
    test('solution is correct', () => {
        expect(solution(example).solution1).toBe(21)
        expect(solution(example).solution2).toBe(525152)
    })
})