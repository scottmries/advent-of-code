const data = require('./day2data.js')

const getLocationProduct = (data) => {
  let position = { x: 0, y: 0}
  data.forEach(move => {
    const [ direction, amount ] = move.split(" ")
    switch(direction) {
      case 'forward':
        position['x'] += parseInt(amount)
        break
      case 'up':
        position['y'] -= parseInt(amount)
        break
      case 'down':
        position['y'] += parseInt(amount)
        break
    }
  })
  return position['x'] * position['y']
}

const getAimProduct = (data) => {
  let position = { x: 0, y: 0}
  let aim = 0
  data.forEach(move => {
    const [ direction, amount ] = move.split(" ")
    switch(direction) {
      case 'forward':
        position['x'] += parseInt(amount)
        position['y'] += aim * parseInt(amount)
        break
      case 'up':
        aim -= parseInt(amount)
        break
      case 'down':
        aim += parseInt(amount)
        break
    }
  })
  return position['x'] * position['y']
}

console.log(getLocationProduct(data))
console.log(getAimProduct(data))
