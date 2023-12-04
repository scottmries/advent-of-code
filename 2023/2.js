const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
});

let sum = 0
let k = 0
rl.on("line", (line) => {
    let [id, pulls] = line.split(": ")
    id = id.match(/^Game (\d+)/)[1] * 1
    pulls = pulls.split("; ")
    const minCubeCount = {
      red: 0,
      green: 0,
      blue: 0
    }
    pulls.forEach(pull => {
      const colorSets = pull.split(", ")
      colorSets.forEach(colorSet => {
        const [count, color] = colorSet.split(" ")
        if (minCubeCount[color] < count * 1) {
          minCubeCount[color] = count * 1
        }
      })
    })
    sum += minCubeCount.red * minCubeCount.blue * minCubeCount.green
  // process a line at a time
    k++
    // process.stdout.write(`${k}: ${ line.slice(0, 64)}, ${id}\n`);
    // process.stdout.write(`${id}\n`);

});

rl.on("close", function() {
    process.stdout.write(`${sum}`);
})
