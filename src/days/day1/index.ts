import {input} from './input';
import {cleanAndParse} from '../../utils';

export const meta = {};

export function part1() {
  const data = cleanAndParse(input, Number);

  const { length } = data;
  let prev = data[0];
  let up = 0;

  for (let i = 1; i < length; i++) {
    if (data[i] > prev) up++;

    prev = data[i];
  }

  return up;
}

function sum3(data: number[], start: number) {
  return data[start] + data[start + 1] + data[start + 2];
}

export function part2() {
  const data = cleanAndParse(input, Number);
  const { length } = data;

  let prev = sum3(data, 0);
  let up = 0;

  for (let i = 1; i < length - 2; i++) {
    const sum = sum3(data, i);

    if (sum > prev) up++;

    prev = sum;
  }

  return up;
}
