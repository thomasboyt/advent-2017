const _ = require('lodash');

function wrapIdx(idx, array) {
  return idx >= array.length ? idx - array.length : idx;
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

function knotHashRound(size, lengths) {
  const list = _.range(size);
  let position = 0;
  let skipSize = 0;

  for (let length of lengths) {
    reverseWrapSlice(list, position, length);

    position = wrapIdx(position + length + skipSize, list);
    skipSize += 1;
  }

  return list;
}

module.exports = {knotHash};

if (require.main === module) {
  const list = [76,1,88,148,166,217,130,0,128,254,16,2,130,71,255,229];
  const hashed = knotHash(256, list);
  console.log(hashed[0] * hashed[1]);
}