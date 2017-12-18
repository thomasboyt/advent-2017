const firstRecoveredFrequency = require('./18-p1');

const fixture = `set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`;

test('day 18 - part 1', () => {
  expect(firstRecoveredFrequency(fixture)).toBe(4);
});