const { readFileSync } = require('fs')

const lines = readFileSync('./12/12.txt').toString().split("\n")

export const solve = (line:string): number => {
    let record = line.split(" ")[0]
    let groups = line.split(" ")[1].split(",").map(el => Number(el))
    return getArrangements(record, groups)
}

export const solve2 = (line:string): number => {
    let record = line.split(" ")[0]
    const groupsString = line.split(" ")[1]
    record = Array(5).fill(record).join("?")
    const groups = Array(5).fill(groupsString).join(",").split(",").map(el => Number(el))
    return getArrangements(record, groups)
}

export const getArrangements = (record: string, groups: number[]): number => {
    
    if (record.length === 0) {
        if (groups.length === 0 || (groups.length === 1 && groups[0] === 0)){
            return 1
        }
        return 0
    }
    if (record[0] === '?') {
        return getArrangements('.' + record.substring(1), groups.slice()) +
            getArrangements('#' + record.substring(1), groups.slice())
    }
    if (record[0] === '#') {
        const hashRegex = new RegExp(`^[#?]{${groups[0]}}`)
        const testRegex = /^[#?]{4}/
        hashRegex.test(record)
        if (record.length < groups[0]) {
            return 0
        }
        for (let i = 0; i < groups[0]; i++) {
            if (record[i] === '.') {
                return 0
            }
        }
        record = record.substring(groups[0])
        groups.shift()
        if (record[0] === '#') {
            return 0
        }
        if (record[0] === '?') {
            record = '.' + record.substring(1)
        }
        return getArrangements(record, groups)
    }
    if (record[0] === '.') {
        return getArrangements(record.substring(1), groups)
    }
    return -1
}

export const solution = (input: string[]): {solution1: number, solution2: number} => {
    return {
        solution1: input.reduce((acc, line) => acc + solve(line), 0),
        solution2: input.reduce((acc, line) => acc + solve2(line), 0),
    }
}

// console.log(solution(lines))

export default solution