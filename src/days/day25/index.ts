// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {input, eg1} from './input';
import {cleanAndParse} from '../../utils';
import { simpleSafetyLog, SafetyNet } from '..';

export const meta = {
  // manualStart: true,
  // maxLoops: 998,
  // maxMs: 100,
  logLoopInterval: 0, // zero blocks logging
};


export function part1() {
  const list = cleanAndParse(input);

  return list.length;
}

export function part2(safetyNet: SafetyNet) {
  while (true) {
    if (safetyNet.fails(simpleSafetyLog)) {
      return safetyNet.reason;
    }
  }
}

