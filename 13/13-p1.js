const readInput = require('../readInput');

const inputRe = /^(\d+): (\d+)$/;

/**
 * oh my god I know there's a real way to calculate this but I can't figure it out so fuck it
 */
function scannerPosFor(range, seconds) {
  let ascending = true;
  let pos = 0;

  for (let i = 0; i < seconds; i += 1) {
    pos = ascending ? pos + 1 : pos - 1;

    if (pos === range - 1) {
      ascending = false;
    } else if (pos === 0) {
      ascending = true;
    }
  }

  return pos;
}

function tripSeverity(input) {
  const depthToRange = new Map();
  let maxDepth;

  for (let line of input.split('\n')) {
    const [depth, range] = line.match(inputRe).slice(1).map((n) => parseInt(n, 10));
    depthToRange.set(depth, range);
    maxDepth = depth;  // input is sorted by depth so we can be lazy w this
  }

  let severity = 0;
  for (let depth = 0; depth <= maxDepth; depth += 1) {
    if (!depthToRange.has(depth)) {
      continue;
    }

    const range = depthToRange.get(depth);
    const scannerPos = scannerPosFor(range, depth);

    if (scannerPos === 0) {
      severity += depth * range;
    }
  }

  return severity;
}

module.exports = tripSeverity;

if (require.main === module) {
  readInput(tripSeverity, __dirname + '/13-input.txt');
}