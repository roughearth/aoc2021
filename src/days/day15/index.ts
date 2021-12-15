import {eg1, input} from './input';
import {cleanAndParse, orthogonalNeighbours, SafetyNet} from '../../utils';

export const meta = {};

type Node = {
  weight: number,
  total: number,
  row: number,
  col: number,
  neighbours: number[][],
}

function makeGraph(input: string) {
  const stringRows = cleanAndParse(input, String);
  const maxRow = stringRows.length - 1;
  const maxCol = stringRows[0].length - 1;
  const unvisited = new Set<Node>();
  const visited = new Set<Node>();
  const nextSet = new Set<Node>();

  const grid: Node[][] = stringRows.map((r, row) => [...r].map((v, col) => {
    const node: Node = {
      weight: Number(v),
      total: Number.MAX_SAFE_INTEGER,
      row, col,
      neighbours: [...orthogonalNeighbours([row, col])].filter(([r, c]) => (
        (r >= 0) &&
        (r <= maxRow) &&
        (c >= 0) &&
        (c <= maxCol)
      ))
    };

    unvisited.add(node);
    return node;
  }));

  grid[0][0].total = 0;
  const current = grid[0][0];

  return {
    grid, maxCol, maxRow,
    visited, unvisited,
    current, nextSet
  };
}

function getNext(nextSet: Set<Node>) {
  let min = Number.MAX_SAFE_INTEGER;
  let next: Node = [...nextSet][0];

  for(const node of nextSet) {
    if (node.total <= min) {
      min = node.total;
      next = node;
    }
  }

  nextSet.delete(next);

  return next;
}

function run(src: string) {
  let {grid, maxRow, maxCol, visited, unvisited, current, nextSet} = makeGraph(src);

  while (unvisited.size > 0) {
    for (let [row, col] of current.neighbours) {
      const neighbour = grid[row][col];
      if (unvisited.has(neighbour)) {
        const newTotal = Math.min(neighbour.total, current.total + neighbour.weight);
        neighbour.total = newTotal;
        nextSet.add(neighbour);
      }
    }

    visited.add(current);
    unvisited.delete(current);

    const next = getNext(nextSet);

    current = next;
  }

  return grid[maxRow][maxCol].total;
}

function multiply(src: string) {
  const grid: number[][] = [];
  const stringRows = cleanAndParse(src, String);
  const height = stringRows.length;
  const width = stringRows[0].length;

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const n = Number(stringRows[row][col]);
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          const v = (n + i + j) % 9
          const r = row + (height * i);
          const c = col + (width * j);
          grid[r] = grid[r] ?? [];
          grid[r][c] = (v === 0) ? 9 : v;
        }
      }
    }
  }

  return grid.map(r => r.join("")).join("\n");
}

export function part1() {
  return run(input);
}

export function part2() {
  return run(multiply(input));
}
