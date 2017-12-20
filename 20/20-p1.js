const readInput = require('../readInput');

const re = /^[a-z]=<(.*)>/;
function getCoordinate(token) {
  return token.match(re)[1].split(',').map((str) => parseInt(str, 10));
}

function mDistanceToOrigin(point) {
  return Math.abs(point.p[0]) + Math.abs(point.p[1]) + Math.abs(point.p[2]);
}

function particleClosestToOrigin(input) {
  const lines = input.split('\n');

  const points = lines.map((line) => {
    const coordinateTokens = line.split(/\s/g);
    const [p, v, a] = coordinateTokens.map(getCoordinate);
    return {p, v, a};
  });

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
  }

  return points.reduce((curIdx, point, idx) =>
    mDistanceToOrigin(point) < mDistanceToOrigin(points[curIdx]) ? idx : curIdx, 0);
}

module.exports = particleClosestToOrigin;

if (require.main === module) {
  readInput(particleClosestToOrigin, __dirname + '/20-input.txt');
}