// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {input, eg1} from './input';
import {cleanAndParse} from '../../utils';
import { SafetyNet } from '..';

export const meta = {
  // manualStart: true,
  // maxLoops: 1e3,
  // maxMs: 1000,
};


export function part1() {
  const list = cleanAndParse(input);

  return list.length;
}

export function part2(safetyNet: SafetyNet) {
  while (true) {
    if (safetyNet.fails()) {
      return safetyNet.reason;
    }
  }
}

