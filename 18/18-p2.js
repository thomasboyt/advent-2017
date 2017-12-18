const readInput = require('../readInput');

class Channel {
  constructor() {
    this.programs = new Map();
  }

  register(id, program) {
    this.programs.set(id, program)
  }

  send(originId, value) {
    for (let [id, program] of this.programs.entries()) {
      if (id !== originId) {
        program.onReceive(value);
      }
    }
  }

  checkDeadlock() {
    const deadlocked = [...this.programs.values()].every((program) => {
      return program.waitingOn && program.queue.length === 0;
    });

    if (deadlocked) {
      for (let program of this.programs.values()) {
        program.terminated = true;
      }
    }
  }
}

class Program {
  constructor(id, channel, instructions) {
    this.id = id;
    this.registers = new Map([['p', id]]);

    this.channel = channel;
    this.channel.register(id, this);

    this.queue = [];
    // when we rcv() and don't have a queued value,  we block until another value is received. this
    // stores the register that that value will be placed in
    this.waitingOn = null;

    this.sendCounter = 0;
    this.terminated = false;

    this.instructions = instructions;
    this.currentInstructionIdx = 0;
  }

  next() {
    // console.log(`${this.id} - ${this.currentInstructionIdx}`);
    if (this.waitingOn) {
      return;
    }

    if (this.currentInstructionIdx < 0 || this.currentInstructionIdx >= this.instructions.length) {
      this.terminated = true;
      return;
    }

    const instruction = this.instructions[this.currentInstructionIdx];

    const [op, x, y] = instruction;
    this[op].call(this, x, y);

    if (op !== 'jgz') {
      this.currentInstructionIdx += 1;
    }
  }

  getRegister(register) {
    return this.registers.get(register) || 0;
  }

  getValueOrRegister(valueOrRegister) {
    if (!valueOrRegister) {
      return;
    }

    if (valueOrRegister.match(/^[a-z]+$/)) {
      return this.getRegister(valueOrRegister);
    } else {
      return parseInt(valueOrRegister, 10);
    }
  }

  onReceive(value) {
    this.queue.push(value);
    if (this.waitingOn) {
      this.rcv(this.waitingOn);
    }
  }

  snd(x) {
    this.sendCounter += 1;
    this.channel.send(this.id, this.getValueOrRegister(x));
  }

  rcv(target) {
    if (this.queue.length === 0) {
      this.waitingOn = target;
    } else {
      this.waitingOn = null;
      this.registers.set(target, this.queue.shift());
    }
  }

  set(x, y) {
    this.registers.set(x, this.getValueOrRegister(y));
  }

  add(x, y) {
    this.registers.set(x, this.getRegister(x) + this.getValueOrRegister(y));
  }

  mul(x, y) {
    this.registers.set(x, this.getRegister(x) * this.getValueOrRegister(y));
  }

  mod(x, y) {
    this.registers.set(x, this.getRegister(x) % this.getValueOrRegister(y));
  }

  jgz(x, y) {
    if (this.getValueOrRegister(x) > 0) {
      this.currentInstructionIdx += this.getValueOrRegister(y);
    } else {
      this.currentInstructionIdx += 1;
    }
  }
}

function countOnesSent(input) {
  const instructions = input.split('\n').map((line) => line.split(/\s+/g));

  const channel = new Channel();
  const program0 = new Program(0, channel, instructions);
  const program1 = new Program(1, channel, instructions);

  while (!(program0.terminated && program1.terminated)) {
    program0.next();
    program1.next();
    channel.checkDeadlock();
    cur += 1;
  }

  return program1.sendCounter;
}

module.exports = countOnesSent;

if (require.main === module) {
  readInput(countOnesSent, __dirname + '/18-input.txt');
}