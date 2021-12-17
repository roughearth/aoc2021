import { SafetyNet } from "../../utils";

export const meta = {};

// const input = [[20, 30], [-10, -5]];  // example
const input = [[70, 96], [-179, -124]];

function sum(n: number) {
  return (n ** 2 + n) / 2;
}

const minX = Math.ceil((Math.sqrt(1 + 8 * input[0][0]) - 1) / 2)

const maxX = input[0][1];
const minY = input[1][0];

function pos(step: number, startX: number, startY: number): [number, number] {
  const xLim = Math.min(startX, step);
  const x = sum(startX) - sum(startX - xLim);


  let y;

  if (startY >= 0) {
    if (step <= startY) {
      y = sum(startY) - sum(startY - step);
    }
    else {
      y = sum(startY) - sum(step - 1 - startY);
    }
  }
  else {
    y = sum(-startY - 1) - sum(step - 1 - startY);
  }

  return [x, y];
}

function inTarget(pos: [number, number]) {
  return (
    pos[0] >= input[0][0] &&
    pos[0] <= input[0][1] &&
    pos[1] >= input[1][0] &&
    pos[1] <= input[1][1]
  );
}

function overshot(pos: [number, number]) {
  return (
    pos[0] > input[0][1] ||
    pos[1] < input[1][0]
  );
}

export function part1() { // 15931
  return sum(- minY - 1);
}

export function part2() { // 2555
  const vels = new Set<string>();

  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= -minY; y++) { // -minY is the value that's used for part 1
      let step = 0;
      let hit = false;
      let p: [number, number];

      do {
        p = pos(step, x, y);
        hit = hit || inTarget(p);

        step++;
      }
      while (!hit && !overshot(p));

      if(hit) {
        vels.add(`${x},${y}`);
      }
    }
  }

  return vels.size;
}
