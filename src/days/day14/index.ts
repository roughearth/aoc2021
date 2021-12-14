import {input} from './input';
import {cleanAndParse} from '../../utils';

export const meta = {};

/////////////////////////////////////
// Part 1
//

function parseRule(rule: string) {
  const [pair, insert] = cleanAndParse(rule, String, {separator: '->'});
  return {pair, insert};
}
type Rule = ReturnType<typeof parseRule>;

function getScore(polymer: string) {
  const chars = Array.from(polymer);
  const totals: Record<string, number> = {};

  for (let char of chars) {
    totals[char] = (totals[char] ?? 0) + 1;
  }

  const pairs = Object.entries(totals).sort(([,a], [,b]) => (a - b));
  const most = pairs[pairs.length - 1];
  const least = pairs[0];

  return most[1] - least[1];
}

function nextPolymer(current: string, rules: Rule[]) {
  const inserts: [string, number, Rule][] = [];

  for (let rule of rules) {
    let index = current.indexOf(rule.pair);

    while (index !== -1) {
      inserts.push([rule.insert, index, rule]);
      index = current.indexOf(rule.pair, index + 1);
    }
  }

  inserts.sort(([,a], [,b]) => (b - a));

  const polyList = Array.from(current);

  for (let [char, index] of inserts) {
    polyList.splice(index + 1, 0, char);
  }

  const next = polyList.join("");
  return next;
}

export function part1() {
  console.clear()
  const rules = cleanAndParse(input.rules, parseRule);

  let polymer = input.start;

  for (let i = 0; i < 10; i++) {
    polymer = nextPolymer(polymer, rules);
  }

  return getScore(polymer);
}

/////////////////////////////////////
// Part 2
//

type RuleMap = Map<string, string>;

function getCharAndPairCounts(s: string) {
  const { length } = s;
  const charCount = new Map<string, number>();
  const pairCount = new Map<string, number>();

  for (let i = 0; i < length - 1; i++) {
    const char = s.slice(i, i + 1);
    const pair = s.slice(i, i + 2);
    charCount.set(char, (charCount.get(char) ?? 0) + 1);
    pairCount.set(pair, (pairCount.get(pair) ?? 0) + 1);
  }

  const lastChar = s.slice(length - 1, length);
  charCount.set(lastChar, (charCount.get(lastChar) ?? 0) + 1);

  return {charCount, pairCount}
}

export function part2() {
  const rules: RuleMap = new Map(cleanAndParse(input.rules, parseRule).map(r => [r.pair, r.insert]));
  const { charCount, pairCount } = getCharAndPairCounts(input.start);

  // iterate
  for (let i = 0; i < 40; i++) {
    const charChanges = new Map<string, number>();
    const pairChanges = new Map<string, number>();

    // work out what needs to change first
    for (let [pair, insert] of rules) {
      if (pairCount.has(pair)) {
        const numberPairs = pairCount.get(pair) as number;

        charChanges.set(insert, (charChanges.get(insert) ?? 0) + numberPairs);

        const newPair1 = `${pair[0]}${insert}`;
        const newPair2 = `${insert}${pair[1]}`;

        pairChanges.set(pair, (pairChanges.get(pair) ?? 0) - numberPairs);
        pairChanges.set(newPair1, (pairChanges.get(newPair1) ?? 0) + numberPairs);
        pairChanges.set(newPair2, (pairChanges.get(newPair2) ?? 0) + numberPairs);
      }
    }

    // then change it
    for(let [char, change] of charChanges.entries()) {
      charCount.set(char, (charCount.get(char) ?? 0) + change);
    }

    for(let [pair, change] of pairChanges.entries()) {
      const newCount = (pairCount.get(pair) ?? 0) + change;

      if (newCount === 0) {
        pairCount.delete(pair); // to simplify the `has` test above
      }
      else {
        pairCount.set(pair, newCount);
      }
    }
  }

  const counts = Array.from(charCount.values());

  return Math.max(...counts) - Math.min(...counts);
}
