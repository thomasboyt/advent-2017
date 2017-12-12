const numberConnectedToZero = require('./12-p1');

const fixture = `0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`;

test('day 12 part 1', () => {
  expect(numberConnectedToZero(fixture)).toEqual(6);
});