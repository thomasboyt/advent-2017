const captcha = require ('./01-p2');

test('01 part 2', () => {
  expect(captcha('1212')).toBe(6);
  expect(captcha('1221')).toBe(0);
  expect(captcha('123425')).toBe(4);
  expect(captcha('123123')).toBe(12);
  expect(captcha('12131415')).toBe(4);
});