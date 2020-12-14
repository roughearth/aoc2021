import {input} from './input';
import {cleanAndParse, indexify} from '../../utils';

const SHINY_GOLD = "shiny gold";

export function part1() {
  const bags = cleanAndParse(input, parseBag);
  const index = indexify(bags, bagKey);

  const filtered = bags.filter(b => containsShinyGold(b, index));

  return filtered.length;
}

export function part2() {
  const bags = cleanAndParse(input, parseBag);
  const index = indexify(bags, bagKey);

  return numberOfBags(SHINY_GOLD, index) - 1;
}

function numberOfBags(name: string, index: BagIndex): number {
  const {contains} = index[name];

  if (contains) {
    const e = Object.entries(contains);
    return e.reduce(
      (t, [id, ct]) => {
        return t + (ct * numberOfBags(id, index));
      },
      1
    )
  }

  return 1;
}

function containsShinyGold({contains}: Bag, index: BagIndex): boolean {
  if (!contains) {
    return false;
  }

  if (contains[SHINY_GOLD]) {
    return true;
  }

  const r = Object.keys(contains).reduce(
    (result, name) => (result || containsShinyGold(index[name], index)),
    false
  )

  return r;
}

type Bag = {
  name: string;
  contains?: Record<string, number>
}

type BagIndex = Record<string, Bag>;

function bagKey(bag: Bag): string {
  return bag.name;
}

function parseBag(bag: string): Bag {
  const [name, c] = bag.slice(0, -1).split(" bags contain ");

  if (c === "no other bags") {
    return {name};
  }

  const contains: Record<string, number> = {};

  c.split(", ").forEach(
    inner => {
      const matches = inner.match(/([0-9]*) ([a-z ]*) bag/);

      if (!matches) {
        throw new Error(`${bag} doesn't parse`);
      }

      const [, n, c] = matches;

      contains[c.trim()] = Number(n);
    }
  );

  return {name, contains};
}
