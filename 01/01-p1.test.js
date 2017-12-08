const captcha = require ('./01-p1');

test('01 part 1', () => {
  expect(captcha('1122')).toBe(3);
  expect(captcha('1111')).toBe(4);
  expect(captcha('1234')).toBe(0);
  expect(captcha('91212129')).toBe(9);
});