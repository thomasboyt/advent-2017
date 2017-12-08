const getSteps = require('./03-p1');

test('day 03 - part 1', () => {
  expect(getSteps(1)).toEqual(0);
  expect(getSteps(12)).toEqual(3);
  expect(getSteps(23)).toEqual(2);
  expect(getSteps(1024)).toEqual(31);
});