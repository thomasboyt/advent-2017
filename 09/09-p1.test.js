const score = require('./09-p1');

test('day 9 - part 1', () => {
  expect(score('{}')).toEqual(1);
  expect(score('{{{}}}')).toEqual(6);
  expect(score('{{},{}}')).toEqual(5);
  expect(score('{{{},{},{{}}}}')).toEqual(16);
  expect(score('{<a>,<a>,<a>,<a>}')).toEqual(1);
  expect(score('{{<ab>},{<ab>},{<ab>},{<ab>}}')).toEqual(9);
  expect(score('{{<!!>},{<!!>},{<!!>},{<!!>}}')).toEqual(9);
  expect(score('{{<a!>},{<a!>},{<a!>},{<ab>}}')).toEqual(3);
});