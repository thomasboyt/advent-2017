const readInput = require('../readInput');

const axialDirections = {
  ne: [1, -1],
  se: [1, 0],
  s: [0, 1],
  sw: [-1, 1],
  nw: [-1, 0],
  n: [0, -1],
};

// return the axial coordinates of steps
function getCoordinatesFromSteps(steps) {
  const coords = [0, 0];

  for (let step of steps) {
    const direction = axialDirections[step];
    coords[0] += direction[0];
    coords[1] += direction[1];
  }

  return coords;
}

function gridDistance(coords) {
  const xDistance = Math.abs(coords[0]);
  const yDistance = Math.abs(coords[1]);
  const dDistance = Math.abs(coords[1] + coords[0]);
  return Math.max(xDistance, yDistance, dDistance);
}

function getFewestSteps(input) {
  const steps = input.split(',');

  const coords = getCoordinatesFromSteps(steps);

  return gridDistance(coords);
}

module.exports = getFewestSteps;

if (require.main === module) {
  readInput(getFewestSteps, __dirname + '/11-input.txt');
}