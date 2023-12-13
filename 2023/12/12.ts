const { readFileSync } = require('fs')

const lines = readFileSync('./12/12.txt').toString().split("\n")

let solved = {}

export const solve1 = (line:string): number => {
    let record = line.split(" ")[0]
    let groups = line.split(" ")[1].split(",").map(el => Number(el))
    return getArrangements({record, groups})
}

export const solve2 = (line:string): number => {
    let record = line.split(" ")[0]
    const groupsString = line.split(" ")[1]
    record = Array(5).fill(record).join("?")
    const groups = Array(5).fill(groupsString).join(",").split(",").map(el => Number(el))
    return getArrangements({record, groups})
}

export const getArrangements = (line: {record:string, groups:number[]}): number => {
    const lineString = (record:string, groups:number[]): string => [record, groups.join(",")].join(" ")
    let count = 0
    let lines = [line]
    

    const solve = (record: string, groups: number[]): number => {
        if (typeof solved[lineString(record, groups)] !== 'undefined') {
            return solved[lineString(record, groups)]
        }
        if (record.length < groups.reduce((a, c) => a + c, 0) + groups.length - 1) {
            solved[lineString(record, groups)] = 0
            return 0
        }
        while (record[0] === '.') {
            if (typeof solved[lineString(record.substring(1), groups)] !== 'undefined') {
                solved[lineString(record, groups)] = solved[lineString(record.substring(1), groups)]
            }
            record = record.substring(1)
        }
        if (record.length === 0) {
            let result = 0
            if (groups.length === 0) {
                result = 1
            }
            solved[lineString(record, groups)] = result
            return result
        }
        const hashRe = new RegExp(`^#[#?]{${groups[0] - 1}}`)
        if (record[0] === '#'){
            if(hashRe.test(record)) {
                let nextRecord = record.substring(groups[0])
                if (nextRecord[0] === '#') {
                    solved[lineString(record, groups)] = 0
                    return 0
                }
                const nextSolve = solve(nextRecord.substring(1), groups.slice(1))
                solved[lineString(record, groups)] = nextSolve
                return nextSolve
            }
            solved[lineString(record, groups)] = 0
            return solved[lineString(record, groups)]
        }
        if (record[0] === '?') {
            const nextSolve = solve('.' + record.substring(1), groups) + solve('#' + record.substring(1), groups)
            solved[lineString(record, groups)] = nextSolve
            return nextSolve
        }
        return -1
    }
    const {record, groups} = line
    count = solve(record, groups)
    
    return count
}

export const solution = (input: string[]): {solution1: number, solution2: number} => {
    return {
        solution1: input.reduce((acc, line) => acc + solve1(line), 0),
        solution2: input.reduce((acc, line) => acc + solve2(line), 0),
    }
}

console.log(solution(lines))



export default solution