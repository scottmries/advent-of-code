const { readFileSync } = require('fs')

const lines = readFileSync('5.txt').toString().split("\n")
const seeds = lines[0].split(" ").slice(1).map(el => Number(el))
const maps = [
    lines.slice(3, 18),
    lines.slice(20, 33),
    lines.slice(35, 66),
    lines.slice(68, 90),
    lines.slice(92, 125),
    lines.slice(127, 171),
    lines.slice(173),
].map(map => {
    map = map.map(el => {
        [destination, source, range] = el.split(" ").map(el => Number(el))
        return { source, destination, range }
    })
    map = map.sort((el1, el2) => el1.source - el2.source)
    return map
    }
)

const getNextValue = (value, maps) => {
    if (maps.length === 0) {
        return value
    }
    for (let map of maps[0]) {
        if (value >= map.source && value < map.source + map.range) {
            return getNextValue(value - map.source + map.destination, maps.slice(1))
        }
    }
    return getNextValue(value, maps.slice(1))
}

let closestLocation = seeds.reduce((acc, seed) => {
    const location = getNextValue(seed, maps)
    if (location < acc || acc === null) {
        acc = location
    }
    return acc
}, null)

// 484023871
console.log(closestLocation)

let closestLocation2 = seeds.reduce((acc, seed, index) => {
    if (index % 2 === 0) {
        const range = seeds[index + 1]
        console.log(seed, range)
        for (let i = 0; i < range; i++) {
            const value = getNextValue(seed + i, maps)
            if (acc === null || value < acc) {
                acc = value
                console.log(acc)
            }
        }
    }
    return acc
}, null)

console.log(closestLocation2)

// sketch of a more efficient method:
// // given a map x->y and y->z, returns a map x->z
// const ingestMapIntoMap = (map1, map2) => {
//     let result = []
//     map1.forEach(el1 => {
//         const outputs = map2.filter(el2 => {
//             return (el1.destination >= el2.source && el1.destination < el2.source + el2.range) ||
//                 ((el1.destination + el1.range) >= el2.source && (el1.destination + el1.range) < (el2.source + el2.range)) 
//         })
//         outputs.map(el2 => {
//             let difference
//             let source
//             let destination
//             let range
//             if (el1.destination > el2.source) {
//                 difference = el1.destination - el2.source
//                 source = el1.source + difference
//                 destination = el2.destination + difference
//                 range = Math.min(el1.range - difference, el2.range - difference)
//             } else if (el1.destination <= el2.source) {
//                 difference = el2.source - el1.destination
//                 source = el1.source
//                 destination = el2.destination + difference
//                 range = Math.min(el1.range - difference, el2.range - difference)
//             }
//             result.push({ source, destination, range })
//         })
//     })
//     return result
// }

// console.log(ingestMapIntoMap(maps[0], maps[1]))