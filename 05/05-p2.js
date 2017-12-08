const readInput = require('../readInput');

function stepsToEscape(offsets) {
  let current = 0;
  let counter = 0;

  while (true) {
    counter += 1;

    const jump = offsets[current];

    if (offsets[current] >= 3) {
      offsets[current] -= 1;
    } else {
      offsets[current] += 1;
    }

    current += jump;

    if (current < 0 || current >= offsets.length) {
      return counter;
    }
  }
}

module.exports = stepsToEscape;

function readInputSteps(input) {
  return stepsToEscape(input.split('\n').map((step) => parseInt(step, 10)));
}

if (require.main === module) {
  readInput(readInputSteps, __dirname + '/05-input.txt');
}