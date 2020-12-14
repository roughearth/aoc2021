import { cleanAndParse } from '../../utils';
import {input} from './input';

const Required = [
  "byr",
  "iyr",
  "eyr",
  "hgt",
  "hcl",
  "ecl",
  "pid"
  // "cid" optional
] as const;
type Required = (typeof Required)[number];

type Passport = Record<Required, string>;

function minMax(min: number, max: number, v: string): boolean {
  const n = Number(v);
  return (n >= min) && (n <= max);
}

const rules: Record<Required, (v: string) => boolean> = {
  byr(v: string) {
    return minMax(1920, 2020, v);
  },
  iyr(v: string) {
    return minMax(2010, 2020, v);
  },
  eyr(v: string) {
    return minMax(2020, 2030, v);
  },
  hgt(v: string) {
    if (v.endsWith("cm")) {
      return minMax(150, 193, v.slice(0, -2));
    }
    return minMax(59, 76, v.slice(0, -2));
  },
  hcl(v: string) {
    return /^#[0-9a-f]{6}$/.test(v);
  },
  ecl(v: string) {
    return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(v);
  },
  pid(v: string) {
    return /^[0-9]{9}$/.test(v);
  }
  // "cid" optional
};

export function part1() {
  const list = cleanAndParse(input, toPassport, {separator: "\n\n"}).filter(part1pass);

  return list.length;
}

export function part2() {
  const list = cleanAndParse(input, toPassport, {separator: "\n\n"}).filter(part2pass);

  return list.length;
}

function part1pass(passport: Passport): boolean {
  return Required.reduce(
    (b: boolean, k: string): boolean => (b && (passport.hasOwnProperty(k))),
    true
  )
}

function part2pass(passport: Passport): boolean {
  const validPassport = Required.reduce(
    (b: boolean, k: Required): boolean => {
      const hasKey = passport.hasOwnProperty(k);

      if (b && hasKey) {
        const isValid = rules[k](passport[k])
        return isValid;
      }

      return false;
    },
    true
  );

  return validPassport;
}

function toPassport(passport: string) {
  return Object.fromEntries(passport.trim().split(/\s/).map(pair => pair.split(":")));
}