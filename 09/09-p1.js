"use strict";

const readInput = require('../readInput');

const defaultState = {
  groupLevel: 0,
  inGarbage: false,
  score: 0,
  garbageCount: 0,
};

/**
 * This could have been a nice recursive thing if Node supported TCO but instead, no.
 */
function readNext(tokens, prevState=defaultState) {
  const state = {...prevState};

  const [t, ...rest] = tokens;

  if (state.inGarbage) {
    if (t === '!') {
      // skip next token
      return [rest.slice(1), state];
    } else if (t === '>') {
      // exit garbage
      state.inGarbage = false;
    } else {
      state.garbageCount += 1;
    }

  } else {
    if (t === '<') {
      // begin garbage
      state.inGarbage = true;
    } else if (t === '{') {
      // enter group
      state.groupLevel += 1;
    } else if (t === '}') {
      // exit group, score group
      state.score += state.groupLevel;
      state.groupLevel -= 1;
    }
  }

  return [rest, state];
}

function parse(input) {
  const tokens = input.split('');

  let state = defaultState;
  let rest = tokens;

  for (let i = 0; i < tokens.length; i+= 1) {
    [rest, state] = readNext(rest, state);
  }

  const {score, garbageCount} = state;
  return {score, garbageCount};
}

// part 1
function score(input) {
  return parse(input).score;
}

module.exports = score;

// part 2
function garbageCount(input) {
  return parse(input).garbageCount;
}

if (require.main === module) {
  readInput(garbageCount, __dirname + '/09-input.txt');
}