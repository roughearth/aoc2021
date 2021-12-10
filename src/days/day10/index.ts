import {input} from './input';
import {cleanAndParse} from '../../utils';

export const meta = {};

const charScoresPart1 = new Map<string, number>([
  [')', 3],
  [']', 57],
  ['}', 1197],
  ['>', 25137],
]);

function charScorePart1(c: string) {
  return charScoresPart1.get(c) ?? 0;
}

const charScoresPart2 = new Map<string, number>([
  [')', 1],
  [']', 2],
  ['}', 3],
  ['>', 4],
]);

function charScorePart2(s: string[]) {
  let score = 0;
  for(let c of s) {
    score = (score * 5) + (charScoresPart2.get(c) ?? 0);
  }
  return score;
}

const matches = new Map<string, string>([
  ['(', ')'],
  ['[', ']'],
  ['{', '}'],
  ['<', '>']
]);

function analyseLine(line: string[]) {
  const stack: string[] = [];

  for(let c of line) {
    if (matches.has(c)) {
      stack.push(matches.get(c) as string);
    }
    else {
      const expected = stack.pop();

      if (c !== expected) {
        return {status: 'corrupt', error: c};
      }
    }
  }

  if (stack.length) {
    return {status: 'incomplete', error: stack.reverse()};
  }

  return {status: 'ok'};
}

export function part1() {
  const data = cleanAndParse(input, s => [...s]);

  let total = 0;

  for(let line of data) {
    const {status, error} = analyseLine(line);

    if (status === "corrupt") {
      total += charScorePart1(error as string);
    }
  }

  return total;
}

export function part2() {
  const data = cleanAndParse(input, s => [...s]);

  let scores: number[] = [];

  for(let line of data) {
    const {status, error} = analyseLine(line);

    if (status === "incomplete") {
      scores.push(charScorePart2(error as string[]));
    }
  }

  scores.sort((a, b) => (a - b));

  return scores[Math.floor(scores.length / 2)];
}
