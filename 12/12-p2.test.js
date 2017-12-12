const numberGroups = require('./12-p2');

const fixture = `0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`;

test('day 12 part 2', () => {
  expect(numberGroups(fixture)).toEqual(2);
});