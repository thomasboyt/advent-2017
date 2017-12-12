function gridKey(x, y) {
  return `${x},${y}`;
}

function getFirstValueOver(n) {
  const grid = {};
  grid[gridKey(0, 0)] = 1;

  const ccwDirections = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  let currentDirectionIdx = 0;
  let x = 0;
  let y = 0;

  // if the space counter-clockwise to the current orientation is empty, we should turn and fill it
  function maybeTurn() {
    const ccwDirectionIdx = currentDirectionIdx === ccwDirections.length - 1 ? 0 : currentDirectionIdx + 1;
    const ccwDirection = ccwDirections[ccwDirectionIdx];

    const [ax, ay] = ccwDirection;
    const emptyCcwSpace = grid[gridKey(x + ax, y + ay)] === undefined;

    if (emptyCcwSpace) {
      currentDirectionIdx = ccwDirectionIdx;
    }
  }

  function sumAdjacentSpaces(x, y) {
    const adj = [
      [-1, -1],
      [0, -1],
      [1, -1],
      [-1, 0],
      [1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
    ];

    return adj.map(([ax, ay]) => {
      return grid[gridKey(x + ax, y+ ay)];
    }).reduce((acc, n) => acc + (n || 0), 0);
  }

  while (true) {
    maybeTurn();

    const currentDirection = ccwDirections[currentDirectionIdx];

    x += currentDirection[0];
    y += currentDirection[1];

    const val = sumAdjacentSpaces(x, y);
    if (val > n) {
      return val;
    } else {
      grid[gridKey(x, y)] = val;
    }
  }
}

module.exports = getFirstValueOver;

if (require.main === module) {
  console.log(getFirstValueOver(368078));
}