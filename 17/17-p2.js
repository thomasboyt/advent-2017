function wrappedIndex(length, idx) {
  return idx % length;
}

function getSpinlockValue(steps) {
  let pos = 0;
  let bufLen = 1;
  let valAfterZero;
  let posOfZero = 0;

  const n = 50000000;

  for (let i = 1; i < n; i+= 1) {
    pos = wrappedIndex(bufLen, pos + steps);

    if (pos < posOfZero) {
      // "inserting" at < position of zero, so need to inc
      posOfZero += 1;
    } else if (pos === posOfZero) {
      // displacing the value after zero
      valAfterZero = i;
    }

    bufLen += 1;

    pos = wrappedIndex(bufLen, pos + 1);
  }

  return valAfterZero;
}

module.exports = getSpinlockValue;

if (require.main === module) {
  console.log(getSpinlockValue(314));
}