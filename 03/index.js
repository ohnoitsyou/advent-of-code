'use strict'

const readline = require('readline')
const fs = require('fs')

let valid = 0

const rl = readline.createInterface({
  input: fs.createReadStream('input')
})

rl.on('line', (line) => {
  let split = line
    .trim()
    .split(' ')
    .filter((x) => x != '')
    .map((x) => parseInt(x))
  if(split[0] + split[1] > split[2] && 
     split[1] + split[2] > split[0] &&
     split[2] + split[0] > split[1]) {
    valid++
  }
})

rl.on('close', () => {
  console.log(valid)
})

