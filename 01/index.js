'use strict'

const fs = require('fs')
const q = require('q')

q.nfcall(fs.readFile, 'josh-input', 'utf-8')
  .then((data) => {
    return data.split(',')
  })
  .then((directions) => {
    let pos = {
      x: 0,
      y: 0,
      last: 'N'
    }
    let locations = []
    let crosses = []
    for(let direction of directions) {
      direction = direction.trim()
      let distance = parseInt(direction.substring(1))
      let turn = direction.substring(0,1)
      switch(pos.last) {
        case 'N':
          if(turn == 'L') {
            //console.log(`facing WEST, traveling ${distance} to [${pos.x - distance}, ${pos.y}]`)
            pos.x -= distance
            pos.last = 'W'
            log('WEST', distance, pos)
          } else {
            //console.log(`facing EAST, traveling ${distance} to [${pos.x + distance}, ${pos.y}]`)
            log('EAST', distance, pos)
            pos.x += distance
            pos.last = 'E'
          }
          break;
        case 'E':
          if(turn == 'L') {
            console.log(`facing NORTH, traveling ${distance} to [${pos.x}, ${pos.y + distance}]`)
            pos.y += distance
            pos.last = 'N'
          } else {
            console.log(`facing SOUTH, traveling ${distance} to [${pos.x}, ${pos.y - distance}]`)
            pos.y -= distance
            pos.last = 'S'
          }
          break;
        case 'S':
          if(turn == 'L') {
            console.log(`facing EAST, traveling ${distance} to [${pos.x + distance}, ${pos.y}]`)
            pos.x += distance
            pos.last = 'E'
          } else {
            console.log(`facing WEST, traveling ${distance} to [${pos.x - distance}, ${pos.y}]`)
            pos.x -= distance
            pos.last = 'W'
          }
          break;
        case 'W':
          if(turn == 'L') {
            console.log(`facing SOUTH, traveling ${distance} to [${pos.x}, ${pos.y - distance}]`)
            pos.y -= distance
            pos.last = 'S'
          } else {
            console.log(`facing NORTH, traveling ${distance} to [${pos.x}, ${pos.y + distance}]`)
            pos.last = 'N'
            pos.y += distance
          }
          break;
      }
      if(locations.some((x) => { return x.x == pos.x && x.y == pos.y })) {
        console.log('Already visited this place')
        crosses.push({x: pos.x, y: pos.y})
      }
      locations.push({x: pos.x, y: pos.y})
    }
    return {pos: pos, loc: locations, cross: crosses}
  })
  .then(({pos, loc, cross}) => {
    console.log('final pos:', pos)
    console.log('final distance:', pos.x + pos.y)
    console.log(`Visited ${loc.length} places`)
    console.log(`Visited the same set of coords ${cross.length} times, the first was [${cross[0].x}, ${cross[0].y}], it is ${cross[0].x + cross[0].y} blocks away`)
    console.log('Crosses:', cross)
  })

function log(direction, distance, {x, y}) {
  console.log(`facing ${direction}, traveling ${distance} to [${x}, ${y}]`)
}
