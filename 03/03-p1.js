function genGrid(n) {
  let x = 0;
  let y = 0;

  for (let i = 0; i < n; i += 1) {
  }
}

function getPosition(number) {
  // okay so the only pattern i found in the spiral is that it goes like 1^2 3^5 5^2 7^2 as you go
  // down-right diagonally
  // the n in n^2 there tells you the size of the "rung" of the spiral, which is enough
  // info to then place it on the spiral, i think?

  // Math.floor() but to the nearest ODD number to get the result
  const roundedSquare = Math.ceil(Math.sqrt(number));
  const size = roundedSquare % 2 === 0 ? roundedSquare + 1 : roundedSquare;

  // start at lower-right corner
  let x = (size - 1) / 2;
  let y = ((size - 1) / 2) - 1;
  const distance =
}

module.exports = function getSteps(gridSpace) {
  // plan:
  // 1. get coordinates
  // 2. compute distance from coordinates
}

if (require.main === module) {
  console.log(getSteps(368078));
}