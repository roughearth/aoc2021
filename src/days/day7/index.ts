import {input} from './input';

export const meta = {};

export function part1() {
  const data = input.split(",").map(Number).sort((a, b) => (a - b));
  const {length} = data;

  const median = data[length / 2]; // why? Only because the example was the median

  return data.reduce((t, v) => (t + Math.abs(median - v)), 0);
}

function cost(mean: number, v: number) {
  const diff = Math.abs(mean - v);
  const cost = diff * (diff + 1) / 2;

  return cost;
}

export function part2() {
  const data = input.split(",").map(Number);
  const {length} = data;

  // why? Again only because the example was the mean
  // no idea why floor and not round though
  const mean = Math.floor(data.reduce((t, v) => (t + v)) / length);

  return data.reduce((t, v) => (t + cost(mean, v)), 0);
}
