const readInput = require('../readInput');

function getRoute(input) {
  const grid = input.split('\n').map((line) => line.split(''));

  const getCell = (x, y) => ((y >= grid.length || x >= grid[0].length || x < 0 || y < 0)
                             ? ' '
                             : grid[y][x]);

  // find starting point
  const initialX = grid[0].findIndex((val) => val === '|');

  /*
   * I had a beautiful recursive solution here and it, of course, broke max call stack, and I was
   * too lazy to trampoline, so here we are again
   */
  let x = initialX;
  let y = 0;
  let direction = [0, 1];
  let lettersSeen = [];
  let counter = 0;

  while (true) {
    counter += 1;
    x += direction[0];
    y += direction[1];
    const cell = getCell(x, y);

    if (cell === ' ') {
      // end reached
      // return lettersSeen.join('');
      return counter;

    } else if (cell === '+') {
      // to figure out where to turn: find non-empty neighbor that is NOT in the direction we just
      // came from
      direction = [[1, 0], [-1, 0], [0, 1], [0, -1]]
        .filter(([x, y]) => !(x === -direction[0] && y === -direction[1]))
        .find(([ax, ay]) => {
          const cell = getCell(x + ax, y + ay);
          return cell !== ' ';
        });

    } else if (cell === '|' || cell === '-') {
      // no-op, continue along direction

    } else {
      lettersSeen.push(cell);
    }
  }
}

module.exports = getRoute;

if (require.main === module) {
  readInput(getRoute, __dirname + '/19-input.txt');
}