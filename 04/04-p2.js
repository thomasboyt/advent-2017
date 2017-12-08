const readInput = require('../readInput');

function sortWord(word) {
  return word.split('').sort((a, b) => a > b ? 1 : -1).join('');
}

function isValid(phrase) {
  const words = phrase.split(/\s+/);
  const sortedWords = words.map(sortWord);

  const wordsHash = {};

  for (let word of sortedWords) {
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