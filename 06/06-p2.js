const readInput = require('../readInput');

function updateBanks(banks) {
  // get the index of the largest bank
  const maxIndex = banks.reduce((maxIndex, bank, idx) => bank > banks[maxIndex] ? idx : maxIndex, 0);

  let amountToRedistribute = banks[maxIndex];
  banks[maxIndex] = 0;

  let currentIndex = maxIndex;

  while (amountToRedistribute > 0) {
    currentIndex += 1;
    if (currentIndex === banks.length) {
      currentIndex = 0;
    }

    banks[currentIndex] += 1
    amountToRedistribute -= 1;
  }
}

function getLoopCycles(banks) {
  const states = new Map();  // map of state to which cycle a state was seen on
  let cycles = 0;

  while (true) {
    cycles += 1;

    if (cycles > 200000) {
      throw new Error('too many cycles!!')
    }

    updateBanks(banks);

    const serializedBanks = banks.join(',');

    if (states.has(serializedBanks)) {
      return cycles - states.get(serializedBanks);
    }

    states.set(serializedBanks, cycles);
  }
}

module.exports = getLoopCycles;

function readInputSteps(input) {
  return getLoopCycles(input.split('\t').map((bank) => parseInt(bank, 10)));
}

if (require.main === module) {
  readInput(readInputSteps, __dirname + '/06-input.txt');
}