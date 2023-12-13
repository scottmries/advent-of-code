const { readFileSync } = require('fs')

const lines = readFileSync('./12/12.txt').toString().split("\n")

export const solve = (line:string): number => {
    console.log('solving', line)
    let record = line.split(" ")[0]
    let groups = line.split(" ")[1].split(",").map(el => Number(el))
    return getArrangements(record, groups)
}

export const solve2 = (line:string): number => {
    let record = line.split(" ")[0]
    const groupsString = line.split(" ")[1]
    record = Array(5).fill(record).join("?")
    const groups = Array(5).fill(groupsString).join(",").split(",").map(el => Number(el))
    console.log('solving', record, groups.join(","))
    return getArrangements(record, groups)
}

export const getArrangements = (record: string, groups: number[]): number => {
    if (groups.length === 0 && record.indexOf('#') > -1) {
        return 0
    }
    if (groups.length === 1 && record.lastIndexOf('#') - record.indexOf('#') > groups[0]) {
        return 0
    }
    const groupsSum = groups.reduce((a, c) => a + c, 0)
    if (groupsSum + groups.length - 1 > record.length) {
        return 0
    }
    if (record.length < groups[0]) {
        return 0
    }
    if (/^\./.test(record)) {
        record = record.substring(1)
    }
    if (record.length === 0) {
        return groups.length === 0 ? 1 : 0
    }
    if (/^#/.test(record)) {
        if (groups.length === 0) {
            return 0
        }
        const groupRegex = new RegExp(`^[#?]{${groups[0]}}`)
        if (groupRegex.test(record)) {
            record = record.substring(groups[0])
            if (/^#/.test(record)) {
                return 0
            }
            groups = groups.slice(1)
            if (record.length) {
                record = '.' + record.substring(1)
            }
        } else {
            return 0
        }
    }
    if (/^\?/.test(record)) {
        return getArrangements('.' + record.substring(1), groups) + getArrangements('#' + record.substring(1), groups)
    }
    return getArrangements(record, groups)
}

export const solution = (input: string[]): {solution1: number, solution2: number} => {
    return {
        solution1: input.reduce((acc, line) => acc + solve(line), 0),
        solution2: input.reduce((acc, line) => acc + solve2(line), 0),
    }
}

console.log(solution(lines))



export default solution