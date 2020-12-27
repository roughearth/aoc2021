// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {input, eg1, eg2} from './input';
import {cleanAndParse} from '../../utils';

export function part1() {
  const grid = cleanAndParse(input, parsePaths);

  const blackCells = new Set<string>();

  grid.forEach(path => {
    const cell = getCoordinates(path);

    if (blackCells.has(cell)) {
      blackCells.delete(cell);
    }
    else {
      blackCells.add(cell);
    }
  });

  return blackCells.size;
}

export function part2() {
  const grid = cleanAndParse(input, parsePaths);

  let blackCells = new Set<string>();

  grid.forEach(path => {
    const cell = getCoordinates(path);

    if (blackCells.has(cell)) {
      blackCells.delete(cell);
    }
    else {
      blackCells.add(cell);
    }
  });

  let bounds: Bounds = [0, 0, 0, 0];

  for (const c of blackCells) {
    const [x, y]: number[] = fromKey(c);
    bounds = updateBounds(x, y, bounds);
  }

  for (let gen = 1; gen <= 100; gen++) {
    const nextGen = new Set<string>();
    let nextBounds: Bounds = [...bounds];

    for (const [x, y] of hexCoordinates(...bounds)) {
      const k = key(x, y);
      const count = countBlackNeighbours(x, y, blackCells);

      if (blackCells.has(k)) {
        if ([1, 2].includes(count)) {
          nextBounds = updateBounds(x, y, nextBounds);
          nextGen.add(k);
        }
      }
      else { // white
        if (count === 2) {
          nextBounds = updateBounds(x, y, nextBounds);
          nextGen.add(k);
        }
      }
    };

    blackCells = nextGen;
    bounds = [...nextBounds];
  }

  return blackCells.size;
}

type Bounds = [number, number, number, number];

function updateBounds(
  x:number,
  y:number,
  [minx, miny, maxx, maxy]: Bounds
): Bounds {
  return [
    Math.min(minx, x - 1),
    Math.min(miny, y - 1),
    Math.max(maxx, x + 1),
    Math.max(maxy, y + 1)
  ];
}

function countBlackNeighbours(x: number, y: number, blackCells: Set<string>) {
  return Object.values(vectors).filter(
    ([dx, dy]) => {
      const k = key(x + dx, y + dy);
      return blackCells.has(k);
    }
  ).length;
}

function* hexCoordinates(
  minx: number,
  miny: number,
  maxx: number,
  maxy: number,
) {
  for (let y = miny; y <= maxy; y++) {
    for (let x = minx; x <= maxx; x++) {
      yield [x, y];
    }
  }
}

const vectors: Record<string, number[]> = {
  nw: [ 0, -1],
  ne: [ 1, -1],
   w: [-1,  0],
   e: [ 1,  0],
  sw: [-1,  1],
  se: [ 0,  1],
};

function getCoordinates(path: string[]): string {
  let x = 0, y = 0;
  path.forEach((d) => {
    const [dx = 0, dy = 0] = vectors[d];
    x += dx;
    y += dy;
  });
  return key(x, y);
}

function key(x: number, y: number) {
  return [x, y].join(",");
}

function fromKey(key: string) {
  return key.split(",").map(Number);
}

function parsePaths(line: string): string[] {
  const dirs: string[] = [];
  const SN = ["s", "n"];

  for (let i = 0, {length} = line; i < length; i++) {
    if (SN.includes(line[i])) {
      continue;
    }
    else if (SN.includes(line[i - 1])) {
      dirs.push(line.substr(i - 1, 2));
    }
    else {
      dirs.push(line[i]);
    }
  }

  return dirs;
}
