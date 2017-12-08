const getLargestValue = require('./08-p1');

const instructions = `b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`;

test('day 8 - part 1', () => {
  expect(getLargestValue(instructions)).toBe(1);
});