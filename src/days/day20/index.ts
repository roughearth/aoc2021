import {input} from './input';
import {cleanAndParse, CoordinateRange, coordinates, growRange, simpleRange, MapValueOf} from '../../utils';

export const meta = {};

function parseInput(src: string) {
  const rows = cleanAndParse(src, l => Array.from(l).map(s => s === '#' ? 1 : 0));
  const grid = new Map(rows.slice(2).map((row, i) => [i, new Map(row.map((v, j) => [j, v]))]));
  const algorithm = rows[0];

  const range = simpleRange([grid.size, grid.get(0)?.size || 0]);

  return {algorithm, grid, range};
}

type Parsed = ReturnType<typeof parseInput>;
type Grid = Parsed['grid'];
type GridRow = MapValueOf<Grid>;
type Algorithm = Parsed['algorithm'];

function getVal(grid: Grid, row: number, col: number, defaultValue: number) {
  const read = grid.get(row)?.get(col);
  return read ?? defaultValue;
}

function setVal(grid: Grid, row: number, col: number, val: number) {
  let rowMap: GridRow;
  if (grid.has(row)) {
    rowMap = grid.get(row) as GridRow;
  }
  else {
    rowMap = new Map();
    grid.set(row, rowMap);
  }

  rowMap.set(col, val);
}

function getNumber(grid: Grid, algorithm: Algorithm, row: number, col: number, defaultValue: number) {
  const bin: number[] = [];

  for (let r = -1; r <= 1; r++) {
    for (let c = -1; c <= 1; c++) {
      bin.push(getVal(grid, row + r, col + c, defaultValue));
    }
  }

  const dec = parseInt(bin.join(''), 2);

  return algorithm[dec];
}

function step(grid: Grid, algorithm: Algorithm, range: CoordinateRange, stepCount: number) {
  let nextRange = growRange(range);
  let nextGrid: Grid = new Map();
  let nextStep = stepCount + 1;

  const defaultValue = (algorithm[0] * stepCount) % 2;

  for (let [row, col] of coordinates(nextRange)) {
    setVal(nextGrid, row, col, getNumber(grid, algorithm, row, col, defaultValue));
  }

  return [nextGrid, nextRange, nextStep] as [Grid, CoordinateRange, number];
}

function countLights(grid: Grid) {
  let lights = 0;
  for (let row of grid.values()) {
    for (let col of row.values()) {
      lights += col;
    }
  }

  return lights;
}

function run(n: number) {
  const {algorithm, grid, range} = parseInput(input);

  let g = grid;
  let r = range;
  let s = 0;

  while(n--) {
    [g, r, s] = step(g, algorithm, r, s);
  }

  return countLights(g);
}

export function part1() {
  return run(2);
}

export function part2() {
  return run(50);
}
