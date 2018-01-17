const _ = require('lodash');
const readInput = require('../readInput');

const S_INFECTED = 'infected';
const S_WEAKENED = 'weakened';
const S_CLEAN = 'clean';
const S_FLAGGED = 'flagged';

class GridMap {
  constructor(startingMap) {
    this._map = new Map();

    const rows = startingMap.split('\n').map((row) => row.split(''));
    const startingSize = rows.length;  // assumes a square grid

    for (let y = 0; y < startingSize; y += 1) {
      for (let x = 0; x < startingSize; x += 1) {
        const value = rows[y][x] === '#' ? S_INFECTED : S_CLEAN;
        this.set(x - ((startingSize - 1) / 2), y - ((startingSize - 1) / 2), value);
      }
    }
  }

  get(x, y) {
    return this._map.get(this._key(x, y)) || S_CLEAN;
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
    const gridValue = gridMap.get(curX, curY);

    let newValue;

    if (gridValue === S_INFECTED) {
      direction = turn(direction, true);
      newValue = S_FLAGGED;

    } else if (gridValue === S_CLEAN) {
      direction = turn(direction, false);
      newValue = S_WEAKENED;

    } else if (gridValue === S_FLAGGED) {
      direction = turn(turn(direction, false), false);  // reverse
      newValue = S_CLEAN;

    } else if (gridValue === S_WEAKENED) {
      newValue = S_INFECTED;
      infectionCount += 1;
    }

    gridMap.set(curX, curY, newValue);

    curX += directionVectors[direction][0];
    curY += directionVectors[direction][1];
  }

  return infectionCount;
}

module.exports = {getNumberInfectingBursts};

if (require.main === module) {
  readInput((input) => getNumberInfectingBursts(input, 10000000), __dirname + '/22-input.txt');
}