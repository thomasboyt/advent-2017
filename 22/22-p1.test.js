const {getNumberInfectingBursts} = require('./22-p1');

const fixture = `..#
#..
...`;

test('day 22 - part 1', () => {
  expect(getNumberInfectingBursts(fixture, 7)).toBe(5);
  expect(getNumberInfectingBursts(fixture, 70)).toBe(41);
  expect(getNumberInfectingBursts(fixture, 10000)).toBe(5587);
});
