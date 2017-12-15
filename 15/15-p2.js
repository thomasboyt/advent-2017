const aFactor = 16807;
const bFactor = 48271;
const divisor = 2147483647;

function runGenerator(input, factor) {
  return (input * factor) % divisor;
}

function last16(n) {
  return n % Math.pow(2, 16);
}

const n = 40000000;
function countPairs(aStarting, bStarting) {
  let a = aStarting;
  let b = bStarting;
  let numPairs = 0;

  const aValues = [];
  const bValues = [];

  for (let i = 0; i < n; i += 1) {
    a = runGenerator(a, aFactor);
    b = runGenerator(b, bFactor);

    if (a % 4 === 0) {
      aValues.push(a);
    }
    if (b % 8 === 0) {
      bValues.push(b);
    }
  }

  const len = aValues.length > bValues.length ? aValues.length : bValues.length;
  for (let i = 0; i < len; i += 1) {
    const a = aValues[i];
    const b = bValues[i];
    if (last16(a) === last16(b)) {
      numPairs += 1;
    }
  }

  return numPairs;
}

module.exports = countPairs;

if (require.main === module) {
  console.log(countPairs(618, 814));
}
