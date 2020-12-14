import {input} from './input';
import {cleanAndParse, pairs} from '../../utils';

export const meta = {
  manualStart: false
};

export function part1() {
  const list = cleanAndParse(input, Number);

  const P = 25;
  const {length} = list;

  for (let i = P; i < length; i++) {
    if (!check(i, list, P)) {
      return list[i];
    }
  }

  return "Not found";
}

// algorithm proved below
export function part2() {
  const list = cleanAndParse(input, Number);
  const sums = cumulativeSum(list);
  const T = 675280050;
  const {length} = sums;

  let i = 0, j = 2;
  let sum;

  do {
    sum = sums[j] - sums[i];

    if (sum === T) {
      const p = list.slice(i, j);
      return Math.min(...p) + Math.max(...p);
    }

    if (sum < T) {
      j += 1;
    }
    else {
      i += 1;

      if (j - i < 2) { // untested by input data
        j++;
      }
    }
  }
  while (j < length && i < j);

  return "Not found";
}

export function part2_original() { // this version took about 20ms
  const list = cleanAndParse(input, Number);
  const sums = cumulativeSum(list);
  const T = 675280050;
  const {length} = sums;

  for (const [i, j] of pairs(length, {gap: 2})) {
    if (sums[j] - sums[i] === T) {
      const p = list.slice(i, j);
      return Math.min(...p) + Math.max(...p)
    }
  }

  return "Not found";
}

function check(n: number, list: number[], P: number): boolean {
  for (const [i, j] of pairs(n, {start: n - P})) {
    if (list[i] + list[j] === list[n]) {
      return true;
    }
  }

  return false;
}

function cumulativeSum(list: number[]): number[] {
  let sum = 0;

  return [0, ...list.map((n: number) => {
    sum += n;
    return sum;
  })]
}

/*

If at any time when checking the size of (x .. y) it is correct, sucessfully exit the algorthm.

[part 1]
If the list is shorter that the minSize of a subset, exit the agorithm with a fail code.

(0 .. minSize) is too big
So any super set of it is also too big, in particular this means any large enough set that includes the first element is too big, so we can discard  element zero, and restart.


[part 2]
(0 .. minSize) is too small (because we've passed through [part 1])

keep incrementing y while(0 .. y) is too small

If y exceded the end of the list, exit the agorithm with a fail code.

but then (0 .. n) is too small, and (0 .. n + 1) is too big

So any (x .. y) is too small where y <= n, because they are all subsets of (0 .. n) <-------------- (A)

(1 .. n + 1) is too big
...
either...
  (m .. n + 1) is too big
  (m + 1 .. n + 1) is too small <-------------- (B)

  So any (x .. y) is too big where x <= m; y >= n + 1, because (m .. n + 1) is a subset <-------------- (C1)

...or...
  m "catches up" with n and the set is still to big

  So (x .. y) is too big where y >= n + 1 because (n + 1 - minSize .. n + 1) is a subset <-------------- (C2)


Thus any (x .. y) that intersects (0 .. m) is either too small if y <= n, by (A), or too big if y >= n + 1, by (C1) or (C2).

Hence we can discard up to element m and restart. If (B) was hit, [part 1] will be skipped, so it's possible, but not essential, to restart at [part 2]

*/