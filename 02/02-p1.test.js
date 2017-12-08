const checksum = require('./02-p1');

const spreadsheet = `5 1 9 5
7 5 3
2 4 6 8`;

test('day 02 part 1', () => {
  expect(checksum(spreadsheet)).toBe(18);
});