const _ = require('lodash');

const readInput = require('../readInput');

const lineRe = /^(\w+) \((\d+)\)(?: -> (.*))?$/;

function parseInput(input) {
  const lines = input.split('\n');

  const weights = new Map();
  const abovePrograms = new Map();

  for (let line of lines) {
    const tokenized = line.match(lineRe);
    const name = tokenized[1];

    const weight = parseInt(tokenized[2], 10);
    weights.set(name, weight);

    if (tokenized[3]) {
      const above = tokenized[3].split(', ');
      abovePrograms.set(name, above);
    } else {
      abovePrograms.set(name, []);
    }
  }

  return {weights, abovePrograms};
}

function findBottomProgramFromAboveMap(abovePrograms) {
  const names = [...abovePrograms.keys()];
  const allAbovePrograms = [...abovePrograms.values()].reduce((acc, arr) => acc.concat(arr), []);

  // the bottom-most program must not appear in abovePrograms
  return _.difference(names, allAbovePrograms)[0];
}

function getBottomProgram(input) {
  const {abovePrograms} = parseInput(input);
  return findBottomProgramFromAboveMap(abovePrograms);
}

function getFixedWeight(input) {
  const {weights, abovePrograms} = parseInput(input);
  const bottomProgram = findBottomProgramFromAboveMap(abovePrograms);

  // create tree thing, I guess?
  const createLeaf = (name) => {
    const children = abovePrograms.get(name).map((name) => createLeaf(name));
    const weight = weights.get(name);

    return {
      name,
      children,
      weight,
      totalWeight: weight + children.reduce((acc, child) => child.totalWeight + acc, 0),
    };
  };

  const root = createLeaf(bottomProgram);

  const incOrSet = (map, key) => map.has(key) ? map.set(key, map.get(key) + 1) : map.set(key, 1);

  const keyByMinValue = (map) => [...map.entries()].reduce((acc, entry) => !acc || entry[1] < acc[1] ? entry : acc)[0];
  const keyByMaxValue = (map) => [...map.entries()].reduce((acc, entry) => !acc || entry[1] > acc[1] ? entry : acc)[0];

  let fixedWeight;
  const findUnbalancedNode = (node) => {
    node.children.forEach((child) => findUnbalancedNode(child));

    if (fixedWeight) {
      return;
    }

    const childWeightFrequency = node.children
      .reduce((map, child) => incOrSet(map, child.totalWeight), new Map());

    if (childWeightFrequency.size > 1) {
      // first, get the unbalanced one, defined as the one that shows up the least
      const unbalancedWeight = keyByMinValue(childWeightFrequency);
      const balancedWeight = keyByMaxValue(childWeightFrequency);
      const difference = balancedWeight - unbalancedWeight;

      const unbalancedChild = node.children.find((child) => child.totalWeight === unbalancedWeight);
      fixedWeight = unbalancedChild.weight + difference;

    }
  };

  const unbalanced = findUnbalancedNode(root);

  return fixedWeight;
}

module.exports = {getBottomProgram, getFixedWeight};

if (require.main === module) {
  // readInput(getBottomProgram, __dirname + '/07-input.txt');
  readInput(getFixedWeight, __dirname + '/07-input.txt');
}