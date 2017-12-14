const _ = require('lodash');

function wrapIdx(idx, array) {
  return idx % array.length;
}

function wrapSlice(array, start, length) {
  let slice = [];

  for (let i = 0; i < length; i += 1) {
    const idx = wrapIdx(start + i, array);
    slice.push(array[idx]);
  }

  return slice;
}

function replaceWrapSlice(array, slice, start) {
  for (let i = 0; i < slice.length; i += 1) {
    const idx = wrapIdx(start + i, array);
    array[idx] = slice[i];
  }
}

function reverseWrapSlice(array, start, length) {
  const slice = wrapSlice(array, start, length);
  slice.reverse();
  replaceWrapSlice(array, slice, start);
}

function getSparseHash(lengths, size, rounds) {
  const list = _.range(size);
  let position = 0;
  let skipSize = 0;

  function knotHashRound() {
    for (let length of lengths) {
      reverseWrapSlice(list, position, length);

      position = wrapIdx(position + length + skipSize, list);
      skipSize += 1;
    }
  }

  for (let i = 0; i < 64; i += 1) {
    knotHashRound();
  }

  return list;
}

function getDenseHash(sparseHash) {
  const chunks = _.chunk(sparseHash, 16);
  return chunks.map((chunk) => chunk.reduce((acc, n) => acc ^ n));
}

function toAscii(string) {
  const asciiKeys = [];
  for (var i = 0; i < string.length; i ++) {
    asciiKeys.push(string[i].charCodeAt(0));
  }
  return asciiKeys;
}

const pad = (s) => s.length < 2 ? `0${s}` : s;

function knotHash(input, size=256, rounds=64) {
  const ascii = toAscii(input);
  const withPadding = ascii.concat([17, 31, 73, 47, 23]);
  const sparseHash = getSparseHash(withPadding, size, rounds);
  const denseHash = getDenseHash(sparseHash);
  return denseHash.map((n) => pad(n.toString(16))).join('');
}

module.exports = {knotHash};

if (require.main === module) {
  const input = '76,1,88,148,166,217,130,0,128,254,16,2,130,71,255,229';
  console.log(knotHash(input));
}