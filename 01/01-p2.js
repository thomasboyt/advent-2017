function captcha(digitsString) {
  let inc = 0;

  for (let idx = 0; idx < digitsString.length; idx += 1) {
    let nextIndex = idx + digitsString.length / 2;

    if (nextIndex >= digitsString.length) {
      nextIndex = nextIndex - digitsString.length;
    }

    if (digitsString[idx] === digitsString[nextIndex]) {
      inc += parseInt(digitsString[idx], 10);
    }
  }

  return inc;
}

module.exports = captcha;

if (require.main === module) {
  const fs = require('fs');
  const input = fs.readFileSync('./01-input.txt', {encoding: 'utf8'});
  console.log(captcha(input));
}