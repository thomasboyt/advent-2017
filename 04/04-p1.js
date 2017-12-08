const readInput = require('../readInput');

function isValid(phrase) {
  const words = phrase.split(/\s+/);
  const wordsHash = {};

  for (let word of words) {
    if (wordsHash[word]) {
      return false;
    }
    wordsHash[word] = true;
  }

  return true;
}

module.exports = isValid;

function countValidPassphrases(input) {
  const passphrases = input.split('\n');
  return passphrases.filter(isValid).length;
}

if (require.main === module) {
  readInput(countValidPassphrases, __dirname + '/04-input.txt');
}