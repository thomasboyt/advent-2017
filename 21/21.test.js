const {pixelsOn, divideGrid, combineGrid} = require('./21');

const fixture = `../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#`;

test('day 21 - grid splitting', () => {
  const grid = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15]
  ];

  const result =[
    [
      [
        [0, 1],
        [4, 5]
      ],
      [
        [2, 3],
        [6, 7]
      ]
    ],
    [
      [
        [8, 9],
        [12, 13]
      ],
      [
        [10, 11],
        [14, 15]
      ]
    ],
  ]

  expect(divideGrid(grid, 2)).toEqual(result);

  expect(combineGrid(result)).toEqual(grid);
})

test('day 21 - pixels on', () => {
  expect(pixelsOn(fixture, 2)).toBe(12);
});
