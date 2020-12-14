import {input} from './input';
import {cleanAndParse} from '../../utils';

export function part1() {
  const diffs: Array<number> = [];

  const list = adapters(input);
  const {length} = list;

  for(let i = 1; i < length; i++) {
    const {[i - 1]: v1 = 0, [i]: v2} = list;
    const d = v2 - v1;
    const {[d]: t = 0} = diffs;
    diffs[d] = t + 1;
  }

  return diffs[1] * diffs[3];
}

export function part2() {
  const list = adapters(input);

  return list.slice(1)
    .map((v: number, i: number) => (v - list[i])) // array of diffs
    .join("") // to enable split
    .split(/3+/) // an array of the consecutive "1"s
    .filter(i => i) // there are some ""
    .map(s => s.length) // lengths of the consecutive "1" sequences
    .map(combos) // now it's an array of how many ways of traversing each sequence of 1s
    .reduce((t, n) => (t * n), 1); // mulitply them all together
}

const comboMap: number[] = [];

function combos(len: number) {
  /*
  1 -> 1
  2 -> 2
  3 -> 4
  4 -> 7

  My input only goes to 4 (others went to 5, apparently (-> 13), so my original had the above
  hard coded (after hand calculation). This is more generic.

  It could bemade faster using the Tribonacci sequence apparently, but I haven't seen a proof of that.
  Certainly, this function appears to generate the Tribonnaci.
  https://oeis.org/A000073

  */
  if (!comboMap[len]){
    const f = Math.pow(2, len - 1);

    // make it a stringified bitmask - a fixed length binary where 1 means selected
    const v = Array(f).fill(1).map((_, i) => i.toString(2).padStart(len - 1, "0"));

    comboMap[len] =  v.filter(b => {
      // disregard any with 3 or more consective unselected - too large a gap to jump
      return !/000/.test(b);
    }).length;
  }

  return comboMap[len];
}

function adapters(input: string) {
  const list = cleanAndParse(input, Number).sort((a, b) => (a - b));
  const max = Math.max(...list);
  return [0, ...list, max + 3];
}

