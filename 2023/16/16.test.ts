const { readFileSync } = require('fs')

import { describe, expect, test } from "bun:test";
import solution from './16';

const example = readFileSync('./16/16-example.txt')

describe("solution", () => {
    test("is correct for examples", () => {
        expect(solution(example)).toBe(46)
    })
})