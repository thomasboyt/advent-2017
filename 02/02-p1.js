const readInput = require('../readInput');

const _ = require('lodash');

function rowSum(row) {
  const max = _.max(row);
  const min = _.min(row);
  return max - min;
}

function checksum(input) {
  const rows = input.split('\n');
  const sheet = rows.map((row) => row.split(/\s+/).map((item) => parseInt(item, 10)));

  return sheet.reduce((acc, row) => {
    return acc + rowSum(row);
  }, 0);
}

if (require.main === module) {
  readInput(checksum, __dirname + '/02-input.txt');
}

module.exports = checksum;