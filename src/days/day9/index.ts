import {input} from './input';
import {cleanAndParse, coordinates, orthogonalNeighbours, simpleRange} from '../../utils';

export const meta = {};

function parseLine(line: string, row: number) {
  return line.split("").map((n, column) => ({value: Number(n), visited: false, coords: [row, column]}));
}

type Row = ReturnType<typeof parseLine>;
type Cell = Row[number];
type Grid = Row[];

function getCell(c:number[], grid: Grid) {
  return grid[c[0]]?.[c[1]];
}

export function getLowPoints() {
  const grid = cleanAndParse(input, parseLine);

  const range = simpleRange([grid.length, grid[0].length]);

  let totalRisk = 0;
  const lowPoints = [];

  for(let cell of coordinates(range)) {
    const centerValue = getCell(cell, grid).value;
    let low = true;

    for(let neighbour of orthogonalNeighbours(cell)) {
      const nCell = getCell(neighbour, grid);
      if (nCell) {
        low = low && (nCell.value > centerValue);
      }
    }

    if (low) {
      totalRisk += (1 + centerValue);
      lowPoints.push(cell);
    }
  }

  return {totalRisk, lowPoints, grid, range};
}

function walkNeighbours(pt: number[], grid: Grid, basin: Set<Cell>) {
  const centre = getCell(pt, grid)
  for(let neighbour of orthogonalNeighbours(pt)) {
    const cell = getCell(neighbour, grid);
    if (cell && !cell.visited && cell.value > centre.value && cell.value < 9) {
      basin.add(cell);
      cell.visited = true;
      walkNeighbours(cell.coords, grid, basin);
    }
  }
}

export function part1() {
  return getLowPoints().totalRisk;
}

export function part2() {
  const { lowPoints, grid } = getLowPoints();
  const sizes = lowPoints.map(lowPoint => {
    let basin: Set<Cell> = new Set();

    walkNeighbours(lowPoint, grid, basin);

    return basin.size + 1;
  });

  return sizes.sort((a, b) => (b - a)).slice(0, 3).reduce((a, b) => a * b);
}
