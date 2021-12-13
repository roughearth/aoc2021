import {input} from './input';
import {cleanAndParse} from '../../utils';

export const meta = {};

function parseDot(s: string) {
  return cleanAndParse(s, Number, {separator: ","});
}

function parseFold(s: string): [string, number] {
  const [ax, ln] = s.split("=");
  return [
    ax.slice(-1),
    Number(ln)
  ];
}
type Fold = ReturnType<typeof parseFold>;

function makeGrid(dots: number[][]) {
  const grid: boolean[][] = [];
  for (let [col, row] of dots) {
    grid[row] = grid[row] ?? [];
    grid[row][col] = true;
  }

  const rows = grid.length;
  const cols = Math.max(...grid.map(r => r.length).filter(Boolean));

  return {grid, rows, cols};
}

type Grid = ReturnType<typeof makeGrid>;

function toString({grid, rows, cols}: Grid) {
    let viz = "";

  for(let row = 0; row < rows; row++) {
    for(let col = 0; col < cols; col++) {
      viz += grid[row]?.[col] ? "#" : ".";
    }
    viz += "\n";
  }

  return viz.slice(0, -1);
}

function count({grid, rows, cols}: Grid) {
  let total = 0;

  for(let row = 0; row < rows; row++) {
    for(let col = 0; col < cols; col++) {
      total += grid[row]?.[col] ? 1 : 0;
    }
  }

  return total;
}

function doFold({grid, rows, cols}: Grid, [direction, line]: Fold): Grid {
  const nextGrid: boolean[][] = [];

  const foldLeft = direction === "x";

  const nextRows = foldLeft ? rows : Math.floor(rows / 2);
  const nextCols = foldLeft ? Math.floor(cols / 2) : cols;

  for(let row = 0; row < rows; row++) {
    for(let col = 0; col < cols; col++) {
      const nextRow = (foldLeft || row < line) ? row : 2 * line - row;
      const nextCol = (foldLeft && col > line) ? 2 * line - col : col;

      nextGrid[nextRow] = nextGrid[nextRow] ?? [];
      nextGrid[nextRow][nextCol] = nextGrid[nextRow][nextCol] || grid[row]?.[col];
    }
  }

  return {grid: nextGrid, rows: nextRows, cols: nextCols};
}

export function part1() {
  const dots = cleanAndParse(input.dots, parseDot);
  const folds = cleanAndParse(input.folds, parseFold);

  let grid = makeGrid(dots);

  grid = doFold(grid, folds[0]);

  return count(grid);
}

export function part2() {
  const dots = cleanAndParse(input.dots, parseDot);
  const folds = cleanAndParse(input.folds, parseFold);

  let grid = makeGrid(dots);

  for (let fold of folds) {
    grid = doFold(grid, fold);
  }

  return toString(grid);
}
