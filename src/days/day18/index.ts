import {input} from './input';
import {cleanAndParse} from '../../utils';

export const meta = {};

type SFN = [SFNElmt, SFNElmt];
type SFNElmt = SFN | number;

function isSFN(s: any): s is SFN {
  return Array.isArray(s);
}

function clone(s: SFN): SFN {
  return JSON.parse(JSON.stringify(s));
}

function add(a: SFN, b: SFN): SFN {
  return [clone(a), clone(b)];
}

function reduce(sfn: SFN) {
  const reduceExplode = (s: SFN, depth: number): boolean => {
    const step = (i: number) => {
      let found: boolean = false;

      if (depth >= 3 && isSFN(s[i])) {
        found = true;
        const [l, r] = s[i] as [number, number];
        s[i] = 0;
        addNumber(sfn, index - 1, l);
        addNumber(sfn, index + 1, r);

      }

      if (!found && typeof s[i] === "number") {
        index++;
      }

      if (!found && isSFN(s[i])) {
        found = reduceExplode(s[i] as SFN, depth + 1);
      }

      return found;
    }

    return step(0) || step(1);
  }

  const reduceSplit = (s: SFN): boolean => {
    const step = (i: number) => {
      let found: boolean = false;

      if (!found && typeof s[i] === "number") {
        const n = s[i] as number;
        found = n >= 10;
        if (found) {
          s[i] = [Math.floor(n / 2), Math.ceil(n / 2)];
        }
        index++;
      }

      if (!found && isSFN(s[i])) {
        found = reduceSplit(s[i] as SFN);
      }

      return found;
    }

    return step(0) || step(1);
  }

  let unReduced = true;
  let index: number;

  do {
    index = 0;
    unReduced = reduceExplode(sfn, 0) || reduceSplit(sfn);
  }
  while (unReduced);

  return sfn;
}

function addNumber(s: SFN, i: number, v: number) {
  let index = 0;

  const walk = (s: SFN) => {
    if (isSFN(s[0])) {
      walk(s[0]);
    }
    else {
      if (index === i) {
        s[0] += v;
      }
      index++;
    }

    if (isSFN(s[1])) {
      walk(s[1]);
    }
    else {
      if (index === i) {
        s[1] += v;
      }
      index++;
    }
  }

  walk(s);
}

function magnitude(e: SFNElmt): number {
  if (isSFN(e)) {
    return 3 * magnitude(e[0]) + 2 * magnitude(e[1]);
  }
  return e;
}

export function part1() {
  const data = cleanAndParse(input, n => JSON.parse(n));

  let s = data[0];

  for (let i = 1; i < data.length; i++) {
    s = add(s, data[i]);
    reduce(s);
  }

  return magnitude(s);
}

export function part2() {
  const data = cleanAndParse(input, n => JSON.parse(n));

  const {length} = data;
  let mag = 0;

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (i !== j) {
        mag = Math.max(mag, magnitude(reduce(add(data[i], data[j]))));
        mag = Math.max(mag, magnitude(reduce(add(data[j], data[i]))));
      }
    }
  }

  return mag;
}
