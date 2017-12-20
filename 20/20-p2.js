const readInput = require('../readInput');

const re = /^[a-z]=<(.*)>/;
function getCoordinate(token) {
  return token.match(re)[1].split(',').map((str) => parseInt(str, 10));
}

function pointEqual(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}

function remainingParticles(input) {
  const lines = input.split('\n');

  let points = lines.map((line) => {
    const coordinateTokens = line.split(/\s/g);
    const [p, v, a] = coordinateTokens.map(getCoordinate);
    return {p, v, a};
  });

  const removeCollisions = () => {
    const collisionIndices = new Set();

    for (let i = 0; i < points.length; i += 1) {
      for (let j = 0; j < points.length; j += 1) {
        if (i !== j && pointEqual(points[i].p, points[j].p)) {
          collisionIndices.add(i);
          collisionIndices.add(j);
        }
      }
    }

    return points.filter((point, idx) => !collisionIndices.has(idx));
  };

  // let's just be lazy and simulate it iunno
  const n = 1000;
  for (let i = 0; i < n; i += 1) {
    for (let point of points) {
      point.v[0] += point.a[0];
      point.v[1] += point.a[1];
      point.v[2] += point.a[2];
      point.p[0] += point.v[0];
      point.p[1] += point.v[1];
      point.p[2] += point.v[2];
    }

    points = removeCollisions();
  }

  return points.length;
}

module.exports = remainingParticles;

if (require.main === module) {
  readInput(remainingParticles, __dirname + '/20-input.txt');
}