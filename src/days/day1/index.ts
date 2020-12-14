import {input} from './input';
import {cleanAndParse} from '../../utils';

export const meta = {
  manualStart: true
};

export function part1() {
  const data = cleanAndParse(input, Number);

  const { length } = data;

  for (let i = 0; i < length - 1; i++) {
    for (let j = i + 1; j < length; j++) {
      if ((data[i] + data[j]) === 2020) {
        return (data[i] * data[j]);
      }
    }
  }

  return "not found"
}

export function part2() {
  const data = cleanAndParse(input, Number);
  const { length } = data;

  for (let i = 0; i < length - 2; i++) {
    for (let j = i + 1; j < length - 1; j++) {
      for (let k = j + 1; k < length; k++) {
        if ((data[i] + data[j] + data[k]) === 2020) {
          return (data[i] * data[j] * data[k]);
        }
      }
    }
  }

  return "not found"
}
