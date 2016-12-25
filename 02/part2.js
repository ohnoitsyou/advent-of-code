'use strict'

const fs = require('fs')
const q = require('q')

q.nfcall(fs.readFile, 'input', 'utf-8')
.then((data) => {
  let chars = []
  let pad = [
    ['X','X','1','X','X'],
    ['X','2','3','4','X'],
    ['5','6','7','8','9'],
    ['X','A','B','C','X'],
    ['X','X','D','X','X'],
  ]
  let pos = {x: 0, y: 2}
	for(let x of data) {
    switch(x) {
      case 'U':
        pos.y = pos.y > 0 && pad[pos.y - 1][pos.x] != 'X' ? pos.y - 1 : pos.y
        break
      case 'R':
        pos.x = pos.x < 4 && pad[pos.y][pos.x + 1] != 'X' ? pos.x + 1 : pos.x
        break
      case 'D':
        pos.y = pos.y < 4 && pad[pos.y + 1][pos.x] != 'X' ? pos.y + 1 : pos.y
        break
      case 'L':
        pos.x = pos.x > 0 && pad[pos.y][pos.x - 1] != 'X' ? pos.x - 1 : pos.x
        break
      case '\n':
        chars.push(pad[pos.y][pos.x])
        break
    }
  }
  console.log(`${chars}`)
})

/*
 * [0,0],[0,1],[0,2],[0,3],[0,4]
 * [1,0],[1,1],[1,2],[1,3],[1,4]
 * [2,0],[2,1],[2,2],[2,3],[2,4]
 * [3,0],[3,1],[3,2],[3,3],[3,4]
 * [4,0],[4,1],[4,2],[4,3],[4,4]
 */
