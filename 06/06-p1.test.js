const getLoopCycles = require('./06-p1');

test('day 6 - part 1', () => {
  const blocks = [0, 2, 7, 0];
  expect(getLoopCycles(blocks)).toBe(5);
});