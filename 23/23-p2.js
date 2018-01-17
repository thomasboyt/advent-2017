const readInput = require('../readInput');

const registers = new Map();
registers.set('a', 1);

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

function registerHValue(input) {
  const instructions = input.split('\n').map((line) => line.split(/\s+/g));

  let currentInstruction = 0;

  while (currentInstruction >= 0 && currentInstruction < instructions.length) {
    console.log(currentInstruction + 1);
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
    } else {
      throw new Error(`unrecognized op ${op}`);
    }

    currentInstruction += 1;
  }

  return registers.get('h');
}

if (require.main === module) {
  readInput(registerHValue, __dirname + '/23-input.txt');
}