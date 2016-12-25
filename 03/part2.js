'use strict'

const fs = require('fs')
const q = require('q')

q.nfcall(fs.readFile, 'input', 'utf-8')
  .then((data) => {
    let lines = []
    for(let line of data.split('\n')) {
      lines.push(line.trim().split(' ').filter(x => x != '').map(x => parseInt(x)))
    }
    return lines.filter(x => x.length > 0)
  })
  .then((lines) => {
    let columns = [[],[],[]]
    for(let [x, y, z] of lines) {
      columns[0].push(x)
      columns[1].push(y)
      columns[2].push(z)
    }
    return [...columns[0], ...columns[1], ...columns[2]] 
  })
  .then((points) => {
    let triangles = []
    let i = 0;
    while(i < points.length) {
      triangles.push(points.slice(i, i + 3))
      i = i + 3
    }
    return triangles
  })
  .then((triangles) => {
    let valid = 0
    for(let t of triangles) {
      if(t[0] + t[1] > t[2] &&
         t[1] + t[2] > t[0] &&
         t[2] + t[0] > t[1]) {
            valid++
      }
    }
    return valid
  })
  .then((valid) => {
    console.log('valid:', valid)
  })
