'use strict'

const fs = require('fs')
const q = require('q')

q.nfcall(fs.readFile, 'input', 'utf-8')
.then((data) => {
  let chars = []
  let pad = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
  ]
  let pos = {x: 1, y: 1}
	for(let x of data) {
    switch(x) {
      case 'U':
        pos.y = pos.y > 0 ? pos.y - 1 : pos.y
        break
      case 'R':
        pos.x = pos.x < 2 ? pos.x + 1 : pos.x
        break
      case 'D':
        pos.y = pos.y < 2 ? pos.y + 1 : pos.y
        break
      case 'L':
        pos.x = pos.x > 0 ? pos.x - 1 : pos.x
        break
      case '\n':
        chars.push(pad[pos.y][pos.x])
        break
    }
  }
  console.log(`${chars}`)
})

/*
 * [0,0],[0,1],[0,2]
 * [1,0],[1,1],[1,2]
 * [2,0],[2,1],[2,2]
 */
