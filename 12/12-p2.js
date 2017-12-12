const readInput = require('../readInput');

const lineRe = /^(\d+) <-> (.*)$/;

function concatSet(setA, setB) {
  for (let item of setB) {
    setA.add(item);
  }
}

function parseInput(input) {
  const lines = input.split('\n');

  const pipeMap = new Map();

  for (let line of lines) {
    const match = line.match(lineRe);
    const id = parseInt(match[1], 10);
    const connections = match[2].split(', ').map((token) => parseInt(token, 10));
    pipeMap.set(id, connections);
  }

  return pipeMap;
}

function findConnections(pipeMap, id, seenSet=new Set()) {
  const connections = pipeMap.get(id);

  for (let connection of connections) {
    if (!seenSet.has(connection)) {
      seenSet.add(connection);
      findConnections(pipeMap, connection, seenSet);
    }
  }

  return seenSet;
}

function findGroups(pipeMap) {
  const groups = [];
  const seenSet = new Set();

  for (let id of pipeMap.keys()) {
    if (seenSet.has(id)) {
      // since this id has been seen, it's already in a group, and we can skip it
      continue;
    }

    const group = findConnections(pipeMap, id);
    groups.push(group);
    concatSet(seenSet, group);
  }

  return groups;
}

function numberGroups(input) {
  const pipeMap = parseInput(input);
  const groups = findGroups(pipeMap);
  return groups.length;
}

module.exports = numberGroups;

if (require.main === module) {
  readInput(numberGroups, __dirname + '/12-input.txt');
}