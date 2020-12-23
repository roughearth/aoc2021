// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {input, eg1} from './input';

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
    const {next, excluded} = extract3(current);
    const after = getNextInsert(current, excluded, index);
    insert3After(next, after);
    current = current.next;
  }

  return getOrder(index, {limit}).slice(1)
}

function getNextInsert(current: Item, excluded: Set<number>, index: Circle['index']) {
  let i = current.value;
  const {size} = index;

  do {
    i = (i + size) % (size + 1);
  }
  while(excluded.has(i) || i === 0);

  return <Item>index.get(i);
}

function extract3(current: Item) {
  const next = current.next;
  const last = current.next.next.next;
  const excluded = new Set([
    current.next.value,
    current.next.next.value,
    current.next.next.next.value
  ]);

  current.next = last.next;
  last.next = next;

  return {next, excluded};
}

function insert3After(insert: Item, after: Item) {
  const next = after.next;
  const last = insert.next.next;

  after.next = insert;
  last.next = next;
}

function getOrder(index: Circle['index'], {start = 1, limit = 10} = {}): number[] {
  let current = <Item>index.get(start);

  let order = [];
  do {
    order.push(current.value);
    current = current.next;
  }
  while(current.value !== start && order.length < limit)

  return order;
}

function createCircle(input: string, length = input.length) {
  const index = new Map<number, Item>();
  const tmp: any = {value: -1};
  tmp.next = tmp;

  const cards: Item[] = Array.from(
    {length},
    (_, i) => {
      let value = i + 1;
      if (i < 9) {
        value = Number(input[i])
      }
      return {value, next: tmp};
    }
  );

  cards.forEach((card, i) => {
    index.set(card.value, card)
    card.next = cards[(i + 1) % length]
  })

  return {current: cards[0], index};
}

type Circle = ReturnType<typeof createCircle>;

type Item = {
  value: number;
  next: Item;
}
