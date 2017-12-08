const isValidPassphrase = require('./04-p2');

test('day 04 - part 2', () => {
  expect(isValidPassphrase('abcde fghij')).toEqual(true);
  expect(isValidPassphrase('abcde xyz ecdab')).toEqual(false);
  expect(isValidPassphrase('a ab abc abd abf abj')).toEqual(true);
  expect(isValidPassphrase('iiii oiii ooii oooi oooo')).toEqual(true);
  expect(isValidPassphrase('oiii ioii iioi iiio')).toEqual(false);
});