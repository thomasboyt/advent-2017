const countOnesSent = require('./18-p2');

const fixture = `snd 1
snd 2
snd p
rcv a
rcv b
rcv c
rcv d`;

test('day 18 - part 2', () => {
  expect(countOnesSent(fixture)).toBe(3);
});