const _ = require('lodash');
const readInput = require('../readInput');

function serializeGrid(grid) {
  return grid.map((row) => row.map((cell) => cell ? '#' : '.').join('')).join('\n')
}

function deserializeGrid(piece) {
  return piece.split('/').map((row) => row.split('').map((char) => char === '#' ? true : false));
}

// rotate a grid by 90 degrees
function rotateGrid(grid) {
  const size = grid.length;

  return grid.map((row, rowIdx) => {
    return row.map((cell, colIdx) => {
      return grid[size - colIdx - 1][rowIdx];
    });
  });
}

// flip grid over x axis
// e.g.
// #. -> .#
// #.    .#
function flipGridX(grid) {
  const size = grid.length;

  return grid.map((row, rowIdx) => {
    return row.map((cell, colIdx) => {
      return grid[size - rowIdx - 1][colIdx];
    });
  });
}

// flip grid over y axis
// e.g.
// #. -> .#
// #.    .#
function flipGridY(grid) {
  const size = grid.length;

  return grid.map((row, rowIdx) => {
    return row.map((cell, colIdx) => {
      return grid[rowIdx][size - colIdx - 1];
    });
  });
}

function rotatedMatches(grid) {
  return [
    grid,
    rotateGrid(grid),
    rotateGrid(rotateGrid(grid)),
    rotateGrid(rotateGrid(rotateGrid(grid))),
  ];
}

function getAllMatches(grid) {
  return [
    ...rotatedMatches(grid),
    ...rotatedMatches(flipGridX(grid)),
    ...rotatedMatches(flipGridY(grid))
  ];
}

function deserializeRules(input) {
  const lines = input.split('\n');

  const rulesMap = new Map();

  for (let line of lines) {
    const [matchRule, resultRule] = line.split(' => ');
    const deserializedMatch = deserializeGrid(matchRule);
    const deserializedResult = deserializeGrid(resultRule);

    const allMatches = getAllMatches(deserializedMatch);

    for (let match of allMatches) {
      rulesMap.set(serializeGrid(match), deserializedResult);
    }
  }

  return rulesMap;
}

function getRuleTransformedGrid(grid, rules) {
  const result = rules.get(serializeGrid(grid));

  if (!result) {
    throw new Error(`no grid found for ${serializeGrid(grid)}`);
  }

  return result;
}


/**
 * WHAT HOW DOES ANY OF THIS EVEN WORK LOL
 */

function divideGrid(grid, n) {
  const dividedGrid = [];

  for (let rowIdx = 0; rowIdx < grid.length; rowIdx += n) {
    const row = [];

    for (let colIdx = 0; colIdx < grid.length; colIdx += n) {
      const segment = [];

      for (let i = 0; i < n; i+= 1) {
        segment[i] = [];

        for (let j = 0; j < n; j += 1) {
          segment[i][j] = grid[rowIdx + i][colIdx + j];
        }
      }

      row.push(segment);
    }

    dividedGrid.push(row);
  }

  return dividedGrid;
}

function combineGrid(grid) {
  const segmentSize = grid[0][0].length;

  const combinedGrid = [];

  for (let i = 0; i < grid.length; i += 1) {
    const rows = _.range(segmentSize).map(() => []);

    for (let j = 0; j < grid.length; j += 1) {
      for (let k = 0; k < segmentSize; k += 1) {
        rows[k] = rows[k].concat(grid[i][j][k]);
      }
    }

    for (let row of rows) {
      combinedGrid.push(row);
    }
  }

  return combinedGrid;
}

function pixelsOn(input, iterations) {
  let grid = deserializeGrid('.#./..#/###');

  const rules = deserializeRules(input);

  for (let i = 0; i < iterations; i += 1) {
    const dividedGrid = divideGrid(grid, grid.length % 2 === 0 ? 2 : 3);

    const transformedGrid = dividedGrid.map((row) => {
      return row.map((square) => {
        return getRuleTransformedGrid(square, rules);
      });
    });

    grid = combineGrid(transformedGrid);
  }

  const pixelsOnCount = _.flatten(grid).filter((cell) => cell).length;

  return pixelsOnCount;
}

module.exports = {pixelsOn, divideGrid, combineGrid};

if (require.main === module) {
  // p1
  // readInput((input) => pixelsOn(input, 5), __dirname + '/21-input.txt');
  readInput((input) => pixelsOn(input, 18), __dirname + '/21-input.txt');
}