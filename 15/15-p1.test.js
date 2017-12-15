const countPairs = require('./15-p1');

test('day 15 - part 1', () => {
  expect(countPairs(65, 8921)).toEqual(588);
});