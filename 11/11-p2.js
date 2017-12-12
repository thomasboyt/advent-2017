const readInput = require('../readInput');

const axialDirections = {
  ne: [1, -1],
  se: [1, 0],
  s: [0, 1],
  sw: [-1, 1],
  nw: [-1, 0],
  n: [0, -1],
};

function gridDistance(coords) {
  const xDistance = Math.abs(coords[0]);
  const yDistance = Math.abs(coords[1]);
  const dDistance = Math.abs(coords[1] + coords[0]);
  return Math.max(xDistance, yDistance, dDistance);
}

function getFurthestSteps(input) {
  const steps = input.split(',');

  const coords = [0, 0];
  let furthest = 0;

  for (let step of steps) {
    const direction = axialDirections[step];
    coords[0] += direction[0];
    coords[1] += direction[1];

    const distance = gridDistance(coords);

    if (distance > furthest) {
      furthest = distance;
    }
  }

  return furthest;
}

if (require.main === module) {
  readInput(getFurthestSteps, __dirname + '/11-input.txt');
}