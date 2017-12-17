const tripSeverity = require('./13-p1');

const fixture = `0: 3
1: 2
4: 4
6: 4`;

test('day 13 part 1', () => {
  expect(tripSeverity(fixture)).toEqual(24);
});