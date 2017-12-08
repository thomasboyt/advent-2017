const readInput = require('../readInput');

const _ = require('lodash');

function rowSum(row) {
  for (let i = 0; i < row.length; i += 1) {
    for (let j = 0; j < row.length; j += 1) {
      if (i !== j && row[i] % row[j] === 0) {
        return row[i] / row[j];
      }
    }
  }
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