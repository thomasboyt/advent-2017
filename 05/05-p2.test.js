const stepsToEscape = require('./05-p2');

test('day 5 - part 2', () => {
  const offsets = [0, 3, 0, 1, -3];
  expect(stepsToEscape(offsets)).toBe(10);
});