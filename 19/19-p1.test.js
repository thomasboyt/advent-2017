const fs = require('fs');
const getRoute = require('./19-p1');

const fixture = fs.readFileSync(__dirname + '/19-test-fixture.txt', {encoding: 'utf8'});

test('day 19 - part 1', () => {
  expect(getRoute(fixture)).toEqual('ABCDEF');
});