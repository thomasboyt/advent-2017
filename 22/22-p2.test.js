const {getNumberInfectingBursts} = require('./22-p2');

const fixture = `..#
#..
...`;

test('day 22 - part 2', () => {
  expect(getNumberInfectingBursts(fixture, 7)).toBe(1);
  expect(getNumberInfectingBursts(fixture, 100)).toBe(26);
  expect(getNumberInfectingBursts(fixture, 10000000)).toBe(2511944);
});
