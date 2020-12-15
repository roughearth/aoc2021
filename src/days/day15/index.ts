// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {input, eg1} from './input';

export function runPart(nth = 2020) {
  const starting = input.split(",").map(Number);
  const lastSaid = new Map<number, number>();

  starting.slice(0, -1).forEach((n, i) => {
    lastSaid.set(n, i);
  });

  let [saidLastTurn] = starting.slice(-1);

  for (let i = starting.length; i < nth; i++) {
    const lastTurn = i - 1;
    const previousTurnSaid = lastSaid.get(saidLastTurn);
    let say = (previousTurnSaid !== undefined) ? (lastTurn- previousTurnSaid) : 0;
    lastSaid.set(saidLastTurn, lastTurn);
    saidLastTurn = say;
  }

  return saidLastTurn;
}

export function part1() {
  return runPart(2020);
}

export function part2() {
  return runPart(30_000_000);
}

