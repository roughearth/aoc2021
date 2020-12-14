// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {input, eg1} from './input';
import {cleanAndParse, coordinates2d} from '../../utils';

export const meta = {
  manualStart: false
};

const EMPTY = "L";
const FULL = "#";
const FLOOR = ".";

export function part1() {
  const grid = toGrid(input);

  return runPart(grid, 4, countAdjacentPart1); // expect 2368 | 37
}

export function part2() {
  const grid = toGrid(input);

  return runPart(grid, 5, countAdjacentPart2); // expect 2124 | 26
}

function runPart(grid: Grid, threshhold: number, countAdjacent: (row: number, column: number, grid: Grid) => number) {
  let prev = toString(grid.map);
  let safetynet = 0;

  do {
    const nextMap: string[][] = [...Array(grid.height)].map(() => []);

    for (const {row, column} of coordinates2d(grid)) {
      const count = countAdjacent(row, column, grid);

      if ((count === 0) && (grid.map[row][column] === EMPTY)) {
        nextMap[row][column] = FULL;
      }
      else if ((count >= threshhold) && (grid.map[row][column] === FULL)) {
        nextMap[row][column] = EMPTY;
      }
      else {
        nextMap[row][column] = grid.map[row][column];
      }
    }

    const next = toString(nextMap);

    if (next === prev) {
      return passengerCount(grid);
    }

    grid.map = nextMap;
    prev = next;
  }
  while (safetynet ++ < 1000)

  return "not found";
}

type Grid = {
  map: string[][];
  width: number;
  height: number;
}

function toGrid(input: string): Grid {
  const map = cleanAndParse<string[]>(input, Array.from);
  const {length: height, 0: {length: width}} = map;
  return {map, width, height};
}

const DIRECTIONS = [
  [-1, -1],
  [-1,  0],
  [-1,  1],
  [ 0, -1],
  [ 0,  1],
  [ 1, -1],
  [ 1,  0],
  [ 1,  1],
];

function countAdjacentPart1(row: number, column: number, grid: Grid) {
  return DIRECTIONS.reduce(
    (
      total: number,
      [down, right]: number[]
    ): number => {
      return total + isOccupied(row + down, column + right, grid);
    },
    0
  );
}

function countAdjacentPart2(row: number, column: number, grid: Grid) {
  return DIRECTIONS.reduce(
    (
      total: number,
      [down, right]: number[]
    ): number => {
      return total + isOccupied(...nextVisible(row, column, down, right, grid), grid);
    },
    0
  );
}

function inBounds(row: number, column: number, {map, width, height}: Grid): boolean {
  if (
    row < 0 || column < 0 ||
    row >= height || column >= width
  ) {
    return false;
  }

  return true;
}


function isOccupied(row: number, column: number, grid: Grid): number {
  if (!inBounds(row, column, grid)) {
    return 0;
  }

  return (grid.map[row][column] === FULL) ? 1 : 0;
}

function nextVisible(row: number, column: number, down: number, right: number, grid: Grid): [number, number] {
  let inGrid: boolean;
  do {
    row += down;
    column += right;
    inGrid = inBounds(row, column, grid);
  }
  while (inGrid && grid.map[row][column] === FLOOR)

  return [row, column]
}

function toString(map: Grid["map"]): string {
  // JSON.stringify is no faster, than this
  return map.map(row => row.join("")).join("\n");
}

function passengerCount({map, ...size}: Grid): number {
  let total = 0;

  for (const {row, column} of coordinates2d(size)) {
    if (map[row][column] === FULL) {
      total += 1;
    }
  }

  return total;
}
