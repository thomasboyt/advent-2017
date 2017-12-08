const getLoopCycles = require('./06-p2');

test('day 6 - part 2', () => {
  const blocks = [0, 2, 7, 0];
  expect(getLoopCycles(blocks)).toBe(4);
});