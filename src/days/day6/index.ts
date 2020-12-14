import {input} from './input';
import {cleanAndParse} from '../../utils';

export function part1() {
  const grid = cleanAndParse(input, parsePart1, {separator: "\n\n"});

  return grid.reduce((a, b) => (a + b));
}

export function part2() {
  const grid = cleanAndParse(input, parsePart2, {separator: "\n\n"});

  return grid.reduce((a, b) => (a + b));
}

function parsePart1(group: string) {
  const s = new Set(group);
  s.delete("\n");
  return s.size;
}

function parsePart2(group: string) {
  const people = group.split("\n");
  const groupSize = people.length;
  const qs: Map<string, number> = new Map();

  people.forEach(person => {
    Array.from(person).forEach(q => {
      const v = qs.get(q) || 0;
      qs.set(q, v + 1);
    })
  });

  return Array.from(qs.values()).filter(v => v === groupSize).length;
}
