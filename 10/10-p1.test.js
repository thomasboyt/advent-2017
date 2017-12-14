const {knotHash} = require('./10-p1');

test('day 10 - part 1', () => {
  expect(knotHash(5, [3, 4, 1, 5])).toEqual([3, 4, 2, 1, 0]);
});