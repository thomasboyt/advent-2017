function readInput(fn, inputPath) {
  const fs = require('fs');
  const input = fs.readFileSync(inputPath, {encoding: 'utf8'});
  console.log(fn(input));
}

module.exports = readInput;