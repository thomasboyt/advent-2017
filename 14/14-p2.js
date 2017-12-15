const _ = require('lodash');

const {knotHash} = require('../10/10-p2');

const size = 128;

function hexHashToBin(hex) {
  return hex.split('')
    .map((hexChar) => parseInt(hexChar, 16).toString(2).padStart(4, '0'))
    .join('');
}

const adj = [
  [0, -1],
  [-1, 0],
  [1, 0],
  [0, 1],
];

function printGrid(grid) {
  for (let line of grid) {
    console.log(line.join('').replace(/0/g, '.').replace(/1/g, '#'));
  }
}

function countRegions(input) {
  const range = _.range(size);
  const hashes = range.map((n) => knotHash(`${input}-${n}`));
  const binHashes = hashes.map((hash) => hexHashToBin(hash));
  const binGrid = binHashes.map((hash) => hash.split('').map((digit) => parseInt(digit, 10)));

  // count regions strategy
  // select first unseen square
  // if empty, add to seen and skip
  // if full, mark as part of region
  //   recurse

  let numRegions = 0;
  const seenSquares = new Set();

  function scanSquare(x, y) {
    if (x >= binGrid.length || x < 0 || y >= binGrid[0].length || y < 0) {
      return;
    }

    if (seenSquares.has(`${x},${y}`)) {
      // this square has already been seen so skip it!
      return;
    }

    seenSquares.add(`${x},${y}`);

    if (binGrid[y][x]) {
      // recurse into adjacent grid squares
      // console.log(`fanning out ${x}, ${y} (${binGrid[y][x]})`)
      adj.forEach(([ax, ay]) => scanSquare(x + ax, y + ay));
      return true;  // base case indicates this is a new region
    } else {
      return;
    }
  }

  for (let y = 0; y < binGrid.length; y += 1) {
    for (let x = 0; x < binGrid[0].length; x +=1) {
      if (scanSquare(x, y)) {
        numRegions += 1;
      }
    }
  }

  return numRegions;
}

module.exports = countRegions

if (require.main === module) {
  console.log(countRegions('uugsqrei'));
}