const readInput = require('../readInput');

const _registers = new Map();

const registers = {
  get(name) {
    return _registers.get(name) || 0;
  },

  add(name, amnt) {
    _registers.set(name, registers.get(name) + amnt);
  },

  max() {
    return Math.max(..._registers.values());
  }
};

function testCondition(register, operator, amount) {
  amount = parseInt(amount, 10);
  const value = registers.get(register);

  const tests = {
    '==': value == amount,
    '>': value > amount,
    '<': value < amount,
    '>=': value >= amount,
    '<=': value <= amount,
    '!=': value != amount,
  };

  return tests[operator];
}

function getLargestValue(input) {
  const instructions = input.split('\n').map((line) => line.split(/\s+/));

  for (let instruction of instructions) {
    // token 1: register
    // token 2: operation
    // token 3: amount
    // token 4: [if]
    // token 5: condition register
    // token 6: condition operator
    // token 7: condition amount
    const conditionTokens = instruction.slice(4);

    if (testCondition(...conditionTokens)) {
      const name = instruction[0];
      const operation = instruction[1];
      const amount = parseInt(instruction[2], 0);

      if (operation === 'inc') {
        registers.add(name, amount)
      } else if (operation === 'dec') {
        registers.add(name, -amount)
      }
    }
  }

  return registers.max();
}

module.exports = getLargestValue;

if (require.main === module) {
  readInput(getLargestValue, __dirname + '/08-input.txt');
}