function wrappedIndex(array, idx) {
  return idx % array.length;
}

function getSpinlockValueAfter2017(steps) {
  const buf = [0];
  let pos = 0;

  for (let i = 1; i < 2018; i += 1) {
    pos = wrappedIndex(buf, pos + steps);
    buf.splice(pos, 0, i);
    pos = wrappedIndex(buf, pos + 1);
  }

  console.log(buf);
  return buf[pos];
}

module.exports = getSpinlockValueAfter2017;

if (require.main === module) {
  console.log(getSpinlockValueAfter2017(314));
}