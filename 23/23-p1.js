const readInput = require('../readInput');

const registers = new Map();

function getRegister(name) {
  return registers.get(name) || 0;
}

function getValueOrRegister(valueOrRegister) {
  if (!valueOrRegister) {
    return;
  }

  if (valueOrRegister.match(/^[a-z]+$/)) {
    return getRegister(valueOrRegister);
  } else {
    return parseInt(valueOrRegister, 10);
  }
}

function countMulInvoked(input) {
  const instructions = input.split('\n').map((line) => line.split(/\s+/g));

  let currentInstruction = 0;
  let mulCount = 0;

  while (currentInstruction >= 0 && currentInstruction < instructions.length) {
    const instruction = instructions[currentInstruction];

    const [op, x, y] = instruction;

    const xValue = getValueOrRegister(x);
    const yValue = getValueOrRegister(y);

    if (op === 'jnz') {
      if (xValue !== 0) {
        currentInstruction += yValue;
        continue;
      }

    } else if (op === 'set') {
      registers.set(x, yValue);
    } else if (op === 'sub') {
      registers.set(x, xValue - yValue);
    } else if (op === 'mul') {
      registers.set(x, xValue * yValue);
      mulCount += 1;
    } else {
      throw new Error(`unrecognized op ${op}`);
    }

    currentInstruction += 1;
  }

  return mulCount;
}

if (require.main === module) {
  readInput(countMulInvoked, __dirname + '/23-input.txt');
}