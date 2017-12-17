const readInput = require('../readInput');

const inputRe = /^(\d+): (\d+)$/;

/**
 * this trick 100% stolen from RC zulip
 */
function scannerAtZero(range, seconds) {
  return seconds % ((range - 1) * 2) === 0;
}

function isSafeDelay(depthToRange, maxDepth, secondsToDelay) {
  for (let depth = 0; depth <= maxDepth; depth += 1) {
    if (!depthToRange.has(depth)) {
      continue;
    }

    const range = depthToRange.get(depth);

    if (scannerAtZero(range, secondsToDelay + depth)) {
      return false;
    }
  }

  return true;
}

function findMinimumDelay(input) {
  const depthToRange = new Map();
  let maxDepth;

  for (let line of input.split('\n')) {
    const [depth, range] = line.match(inputRe).slice(1).map((n) => parseInt(n, 10));
    depthToRange.set(depth, range);
    maxDepth = depth;  // input is sorted by depth so we can be lazy w this
  }

  let secondsToDelay = 0;
  while (true) {
    if (isSafeDelay(depthToRange, maxDepth, secondsToDelay)) {
      break;
    }

    secondsToDelay += 1;
  }

  return secondsToDelay;
}

module.exports = findMinimumDelay;

if (require.main === module) {
  readInput(findMinimumDelay, __dirname + '/13-input.txt');
}