const readInput = require('../readInput');

function firstRecoveredFrequency(input) {
  const instructions = input.split('\n').map((line) => line.split(/\s+/g));

  const registers = new Map();
  let lastFrequency = null;
  let currentInstruction = 0;

  while (currentInstruction >= 0 && currentInstruction < instructions.length) {
    const instruction = instructions[currentInstruction];

    const [op, target, valueOrRegister] = instruction;

    if (!registers.has(target)) {
      registers.set(target, 0);
    }

    let value;
    if (valueOrRegister) {
      if (valueOrRegister.match(/^[a-z]+$/)) {
        value = registers.get(valueOrRegister) || 0;
      } else {
        value = parseInt(valueOrRegister, 10);
      }
    }

    if (op === 'snd') {
      lastFrequency = registers.get(target);

    } else if (op === 'set') {
      registers.set(target, value);

    } else if (op === 'add') {
      registers.set(target, registers.get(target) + value);

    } else if (op === 'mul') {
      registers.set(target, registers.get(target) * value);

    } else if (op === 'mod') {
      registers.set(target, registers.get(target) % value);

    } else if (op === 'rcv') {
      if (registers.get(target) !== 0) {
        return lastFrequency;
      }

    } else if (op === 'jgz') {
      if (registers.get(target) > 0) {
        currentInstruction += value;
        continue;
      }

    } else {
      throw new Error(`unknown op ${op}`);
    }

    currentInstruction += 1;
  }
}

module.exports = firstRecoveredFrequency;

if (require.main === module) {
  readInput(firstRecoveredFrequency, __dirname + '/18-input.txt');
}