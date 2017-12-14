const _ = require('lodash');

const {knotHash} = require('../10/10-p2');

const size = 128;

function hexHashToBin(hex) {
  return hex.split('')
    .map((hexChar) => parseInt(hexChar, 16).toString(2).padStart(2, '0'))
    .join('');
}

function countSquares(input) {
  const range = _.range(size);
  const hashes = range.map((n) => knotHash(`${input}-${n}`));
  const binHashes = hashes.map((hash) => hexHashToBin(hash));
  const squareCount = binHashes
    .map((hash) => hash.split('').filter((char) => char === '1').length)
    .reduce((acc, n) => acc + n);
  return squareCount;
}

module.exports = countSquares

if (require.main === module) {
  console.log(countSquares('uugsqrei'));
}