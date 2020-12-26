// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {input} from './input';
import {cleanAndParse} from '../../utils';
import { simpleSafetyLog, SafetyNet } from '..';

const MOD = 20201227;
const BASE = 7;

export function part1() {
  const [card, door] = cleanAndParse(input, Number);

  return modPow(door, modLog(card));
}

export function part2(safetyNet: SafetyNet) {
  while (true) {
    if (safetyNet.fails(simpleSafetyLog)) {
      return "Happy Xmas!";
    }
  }
}

function modLog(n: number) {
  const map = new Map<number, number>();

  const max = Math.ceil(Math.sqrt(MOD));
  const factor = modPow(modInv(BASE), max);

  for (let i = 0; i <= max; i++) {
    const v = modPow(BASE, i);
    map.set(v, i);
  }

  let candidate = n;

  for (let i = 0; i <= max; i++) {
    if (map.has(candidate)) {
      const j = <number>map.get(candidate);
      return (i * max) + j;
    }

    candidate = modMul(candidate, factor);
  }

  throw new Error("Not found");
}

function lpr(a: number) {
  return ((a % MOD) + MOD) % MOD;
}

function modInv(a: number) {
  return modPow(a, MOD - 2);
}

function modMul(a: number, b: number) {
  if (a === 0 || b === 0) {
    return 0;
  }

  let total = 0;

  let currentFactor = a;
  let currentMultiple = b;

  while (currentFactor > 0) {
    if (currentFactor % 2) {
      total = lpr(total + currentMultiple);
    }
    currentMultiple = lpr(currentMultiple * 2);
    currentFactor = Math.floor(currentFactor / 2);
  }

  return total;
}

function modPow(num: number, pow: number) {
  let total = 1;
  let currentPower = pow;
  let currentSquare = num;

  while (currentPower > 0) {
    if (currentPower % 2) {
      total = modMul(total, currentSquare);
    }
    currentSquare = modMul(currentSquare, currentSquare);
    currentPower = Math.floor(currentPower / 2);
  }

  return total;
}

