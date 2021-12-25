import {eg0, eg1, input} from './input';
import {ArrayKeyedMap, coordinates, simpleRange} from '../../utils';

export const meta = {};

type Grid = ReturnType<typeof ArrayKeyedMap>;

function visualise(grid: Grid, height: number, width: number) {
  const v: string[][] = [];

  for(let [row, col] of coordinates(simpleRange([height, width]))) {
    v[row] = v[row] ?? [];
    v[row][col] = grid.get([row, col]);
  }

  console.log(v.map(l => l.join("")).join("\n"));
}

function step(grid: Grid, height: number, width: number): [Grid, number] {
  const midGrid = ArrayKeyedMap();
  let moved = 0

  for(let loc of coordinates(simpleRange([height, width]))) {
    const cuc = grid.get(loc);
    const [row, col] = loc;
    const nextLoc = [row, (col + 1) % width];

    if (cuc === '>' && grid.get(nextLoc) === '.') {
      midGrid.set(nextLoc, cuc);
      moved++;
    }
    else if (cuc !== '.') {
      midGrid.set(loc, cuc);
    }
  }

  for(let loc of coordinates(simpleRange([height, width]))) {
    if (!midGrid.get(loc)) {
      midGrid.set(loc, '.');
    }
  }

  const nextGrid = ArrayKeyedMap();

  for(let loc of coordinates(simpleRange([height, width]))) {
    const cuc = midGrid.get(loc);
    const [row, col] = loc;
    const nextLoc = [(row + 1) % height, col];


    if (cuc === 'v' && midGrid.get(nextLoc) === '.') {
      nextGrid.set(nextLoc, cuc);
      moved++;
    }
    else if (cuc !== '.') {
      nextGrid.set(loc, cuc);
    }
  }

  for(let loc of coordinates(simpleRange([height, width]))) {
    if (!nextGrid.get(loc)) {
      nextGrid.set(loc, '.');
    }
  }

  return [nextGrid, moved];
}

export function part1() {
  const rows = input.split("\n");
  const height = rows.length;
  const width = rows[0].length;

  let grid = ArrayKeyedMap();

  for(let [row, col] of coordinates(simpleRange([height, width]))) {
    grid.set([row, col], rows[row][col]);
  }

  let i = 0;
  let moved = -1;

  while (moved !== 0) {
    [grid, moved] = step(grid, height, width);
    i++;
  }

  return i;
}

export function part2() {
  return "Merry Xmas!";
}
