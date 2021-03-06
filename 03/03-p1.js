function gridKey(x, y) {
  return `${x},${y}`;
}

function getPosition(n) {
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

  for (let i = 2; i <= n; i += 1) {
    maybeTurn();

    const currentDirection = ccwDirections[currentDirectionIdx];

    x += currentDirection[0];
    y += currentDirection[1];

    grid[gridKey(x, y)] = i;
  }

  return [x, y];
}

function getSteps(gridSpace) {
  const coordinates = getPosition(gridSpace);
  return Math.abs(coordinates[0]) + Math.abs(coordinates[1]);
}

module.exports = getSteps;

if (require.main === module) {
  console.log(getSteps(368078));
}