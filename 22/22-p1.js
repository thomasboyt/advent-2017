const _ = require('lodash');
const readInput = require('../readInput');

class GridMap {
  constructor(startingMap) {
    this._map = new Map();

    const rows = startingMap.split('\n').map((row) => row.split(''));
    const startingSize = rows.length;  // assumes a square grid

    for (let y = 0; y < startingSize; y += 1) {
      for (let x = 0; x < startingSize; x += 1) {
        const val = rows[y][x] === '#' ? true : false;
        this.set(x - ((startingSize - 1) / 2), y - ((startingSize - 1) / 2), val);
      }
    }
  }

  get(x, y) {
    return this._map.get(this._key(x, y));
  }

  set(x, y, value) {
    this._map.set(this._key(x, y), value);
  }

  _key(x, y) {
    return `${x},${y}`;
  }
}

const D_UP = 0;
const D_RIGHT = 1;
const D_DOWN = 2;
const D_LEFT = 3;

const directionVectors = {
  [D_UP]: [0, -1],
  [D_RIGHT]: [1, 0],
  [D_DOWN]: [0, 1],
  [D_LEFT]: [-1, 0],
};

// this is fucking dumb idk there's probably a more elegant way to structure this whole thing?
function turn(curDirection, cw) {
  let nextDirection = curDirection + (cw ? 1 : -1);

  if (nextDirection < 0) {
    nextDirection = D_LEFT;
  }
  if (nextDirection > 3) {
    nextDirection = D_UP;
  }

  return nextDirection;
}

function getNumberInfectingBursts(input, totalBursts) {
  const gridMap = new GridMap(input);

  let infectionCount = 0;
  let curX = 0;
  let curY = 0;
  let direction = D_UP;

  for (let i = 0; i < totalBursts; i += 1) {
    const isInfected = gridMap.get(curX, curY);

    if (isInfected) {
      // turn right
      direction = turn(direction, true);

    } else {
      // turn left
      direction = turn(direction, false);

      // also increment infectionCount since we're about to flip it below
      infectionCount += 1;
    }

    gridMap.set(curX, curY, !isInfected);

    curX += directionVectors[direction][0];
    curY += directionVectors[direction][1];
  }

  return infectionCount;
}

module.exports = {getNumberInfectingBursts};

if (require.main === module) {
  readInput((input) => getNumberInfectingBursts(input, 10000), __dirname + '/22-input.txt');
}