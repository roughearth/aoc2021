import {input} from './input';
import {cleanAndParse, CoordinateRange, coordinates, neighbours, SafetyNet, simpleRange} from '../../utils';

export const meta = {};

function octopus(energy: string, row: number, column: number) {
  return {
    energy: Number(energy),
    pos: [row, column]
  }
}
type Octopus = ReturnType<typeof octopus>;
type Grid = Octopus[][];

function visualise(data: Grid) {
  const viz = data.map(l => l.map(o => o.energy).join("")).join("\n");
  console.log(viz);
}

function tryFlash(octopus: Octopus, flashed: Set<Octopus>, grid: Grid) {
  if(octopus.energy > 9 && !flashed.has(octopus)) {
    flashed.add(octopus);

    for(let [r, c] of neighbours(octopus.pos)) {
      const neighbour = grid[r]?.[c];
      if (neighbour) {
        neighbour.energy++;

        tryFlash(neighbour, flashed, grid);
      }
    }
  }
}

function oneStep(grid: Grid, size = grid.length) {
  const flashed: Set<Octopus> = new Set();
  const range = simpleRange([size, size]);
  for (let [r, c] of coordinates(range)) {
    grid[r][c].energy++;
  }

  for (let [r, c] of coordinates(range)) {
    const octopus = grid[r][c];
    tryFlash(octopus, flashed, grid);
  }

  for (let octopus of flashed) {
    octopus.energy = 0;
  }

  return flashed.size;
}

export function part1() {
  const data = cleanAndParse(input, (l, row) => Array.from(l).map((e, col) => octopus(e, row, col)));
  let total = 0;
  let runs = 100;

  while(runs--) {
    total += oneStep(data);
  }

  return total;
}

export function part2() {
  const data = cleanAndParse(input, (l, row) => Array.from(l).map((e, col) => octopus(e, row, col)));
  let step = 0;

  while(++step) {
    if(oneStep(data) === 100) {
      return step;
    }
  }

  return -1;
}
