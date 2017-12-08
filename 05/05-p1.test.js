const stepsToEscape = require('./05-p1');
test('day 5 - part 1', () => {
  const offsets = [0, 3, 0, 1, -3];
  expect(stepsToEscape(offsets)).toBe(5);
});