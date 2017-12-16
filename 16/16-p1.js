const _ = require('lodash');
const readInput = require('../readInput');

function dance(input, rounds=1000000000, size=16) {
  const programs = _.range(size).map((n) => String.fromCharCode(97 + n));

  function spin(n) {
    for (let i = 0; i < n; i+= 1) {
      programs.unshift(programs.pop());
    }
  }

  function exchange(a, b) {
    const aProgram = programs[a];
    programs[a] = programs[b];
    programs[b] = aProgram;
  }

  function partner(a, b) {
    const aPos = programs.indexOf(a);
    const bPos = programs.indexOf(b);
    programs[aPos] = b;
    programs[bPos] = a;
  }

  const tokens = input.split(',');

  const ops = [];

  for (let token of tokens) {
    const op = token[0];
    if (op === 's') {
      const n = parseInt(token.slice(1), 10);
      ops.push([op, [n]]);
    } else if (op === 'x') {
      const [a, b] = token.slice(1).split('/').map((n) => parseInt(n, 10));
      ops.push([op, [a, b]]);
    } else if (op === 'p') {
      const [a, b] = token.slice(1).split('/');
      ops.push([op, [a, b]]);
    }
  }

  const seenLists = new Set();
  const listToRound = new Map();

  let skippedLoop = false;

  for (let i = 1; i <= rounds; i += 1) {
    for (let [op, args] of ops) {
      if (op === 's') {
        spin(...args);
      } else if (op === 'x') {
        exchange(...args);
      } else if (op === 'p') {
        partner(...args);
      }
    }

    /*
     * lmaooooooooooooooooooooooooooooooooooooooooooooooooooooooo
     */

    if (!skippedLoop) {
      const serialized = programs.join('');

      if (seenLists.has(serialized)) {
        const loopSize = i - listToRound.get(serialized);
        let j = i;
        while (j < rounds) {
          j += loopSize;
        }
        i = j - loopSize;
        skippedLoop = true;

      } else {
        seenLists.add(serialized);
        listToRound.set(serialized, i);
      }
    }
  }

  return programs.join('');
}

module.exports = dance;

if (require.main === module) {
  readInput(dance, __dirname + '/16-input.txt');
}