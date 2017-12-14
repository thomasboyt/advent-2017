const {knotHash} = require('./10-p2');

test('day 10 - part 2', () => {
  expect(knotHash('')).toEqual('a2582a3a0e66e6e86e3812dcb672a272');
  expect(knotHash('AoC 2017')).toEqual('33efeb34ea91902bb2f59c9920caa6cd');
  expect(knotHash('1,2,3')).toEqual('3efbe78a8d82f29979031a4aa0b16a9d');
  expect(knotHash('1,2,4')).toEqual('63960835bcdc130f0b66d7ff4f6a5a8e');
});