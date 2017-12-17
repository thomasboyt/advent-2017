const findMinimumDelay = require('./13-p2');

const fixture = `0: 3
1: 2
4: 4
6: 4`;

test('day 13 part 2', () => {
  expect(findMinimumDelay(fixture)).toEqual(10);
});