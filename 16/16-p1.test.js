const dance = require('./16-p1');

test('day 16 - part 1', () => {
  expect(dance('s1,x3/4,pe/b', 5)).toEqual('baedc');
});