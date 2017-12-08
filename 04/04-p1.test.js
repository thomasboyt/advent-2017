const isValidPassphrase = require('./04-p1');

test('day 04 - part 1', () => {
  expect(isValidPassphrase('aa bb cc dd ee')).toEqual(true);
  expect(isValidPassphrase('aa bb cc dd aa')).toEqual(false);
  expect(isValidPassphrase('aa bb cc dd aaa')).toEqual(true);
});