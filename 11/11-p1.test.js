const getFewestSteps = require('./11-p1');

test('day 11 part 1', () => {
  expect(getFewestSteps('ne,ne,ne')).toEqual(3);
  expect(getFewestSteps('ne,ne,sw,sw')).toEqual(0);
  expect(getFewestSteps('ne,ne,s,s')).toEqual(2);
  expect(getFewestSteps('se,sw,se,sw,sw')).toEqual(3);
});