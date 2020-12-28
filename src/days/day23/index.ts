// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {input, eg1} from './input';
import { generateArray } from '../../utils';

export const meta = {
  manualStart: true
};

export function part1() {
  const order = runGame(input, 9, 100, 9);

  // 76385429
  return order.join("");
}

export function part2() {
  const [a, b] = runGame(input, 1e6, 1e7, 3);

  // 12621748849
  return a * b;
}

function runGame(startPack: string, packSize: number, gameLength: number, limit: number) {
  let {current, index} = createCircle(startPack, packSize);

  for (let ct = 0; ct < gameLength; ct++) {
    const excluded = extract3(current, index);
    const after = getNextInsert(current, excluded, index);
    insert3(excluded, after, index);
    current = index[current];
  }

  return getOrder(index, {limit}).slice(1);
}

function getNextInsert(current: number, excluded: number[], index: Circle['index']) {
  const ex = new Set(excluded);
  const {length} = index;
  let safe = length;

  do {
    if (!--safe) {
      throw new Error("Unsafe");
    }
    current -= 1;
    if (current === 0) {
      current = length - 1;
    }
  }
  while(ex.has(current));

  return current;
}

function extract3(after: number, index: Circle['index']) {
  const first = index[after];
  const middle = index[first];
  const last = index[middle];
  const post = index[last];

  const excluded = [
    first, middle, last
  ];

  index[after] = post;

  return excluded;
}

function insert3([first, middle, last]: number[], after: number, index: number[]) {
  const post = index[after];
  index[after] = first;
  index[first] = middle;
  index[middle] = last;
  index[last] = post;
}

function getOrder(index: Circle['index'], {start = 1, limit = 10} = {}): number[] {
  let current = index[start];

  let order = [start];
  do {
    order.push(current);
    current = index[current];
  }
  while(current !== start && order.length < limit)

  return order;
}

function createCircle(input: string, length = input.length) {
  const cups: number[] = generateArray(
    length,
    i => {
      if (i >= 9) {
        return i + 1;
      }
      return Number(input[i]);
    }
  );

  const index: number[] = generateArray(
    length + 1,
    i => {
      if (i === 0) {
        return 0;
      }
      if (i <= 10) {
        return cups[(cups.indexOf(i) + 1) % length]
      }
      if (i === length) {
        return cups[0]
      }
      return i + 1;
    }
  );

  return {current: cups[0], index};
}

type Circle = ReturnType<typeof createCircle>;
