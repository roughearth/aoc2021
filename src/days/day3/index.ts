import {input} from './input';
import {cleanAndParse} from '../../utils';

export function part1() {
  const grid = cleanAndParse<string[]>(input, Array.from);

  return check(grid, 3, 1);
}

export function part2() {
  const grid = cleanAndParse<string[]>(input, Array.from);
  return [
    check(grid, 1, 1),
    check(grid, 3, 1),
    check(grid, 5, 1),
    check(grid, 7, 1),
    check(grid, 1, 2)
  ].reduce((a, b) => (a * b))
}

export function check(grid: string[][], right = 3, down = 1) {
  const {
    length: height,
    0: {length: width}
  } = grid;

  let row = 0, col = 0;
  let total = 0;

  while (row < height) {
    if (grid[row][col] === "#") {
      total++;
    }

    row += down;
    col = (col + right) % width;
  }

  return total;
}
