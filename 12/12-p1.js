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

function findConnections(pipeMap, id, seenSet = new Set()) {
  const connections = pipeMap.get(id);

  for (let connection of connections) {
    if (!seenSet.has(connection)) {
      seenSet.add(connection);
      findConnections(pipeMap, connection, seenSet);
    }
  }

  return seenSet;
}

function numberConnectedToZero(input) {
  const pipeMap = parseInput(input);

  const connections = findConnections(pipeMap, 0);

  return connections.size;
}

module.exports = numberConnectedToZero;

if (require.main === module) {
  readInput(numberConnectedToZero, __dirname + '/12-input.txt');
}