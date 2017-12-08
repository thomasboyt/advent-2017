const checksum = require('./02-p2');

const spreadsheet = `5 9 2 8
9 4 7 3
3 8 6 5`;

test('day 02 part 2', () => {
  expect(checksum(spreadsheet)).toBe(9);
});