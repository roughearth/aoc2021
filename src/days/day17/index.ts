// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {input, eg1} from './input';
import {
  getIntKey,
  neighbours,
  coordinates,

  cleanAndParse,
  simpleRange
} from '../../utils';

export const meta = {
  manualStart: true
};

export function part1() {
  //301
  return runPart(input, 3);
}

export function part2() {
  //2424
  return runPart(input, 4);
}

function runPart(input: string, dims: number) {
  let space = getSpace(input, dims);

  for (let g = 0; g < 6; g++) {
    space = getNextSpace(space, dims);
  }

  return countActive(space);
}

function countActive(space: Space): number {
  return Array.from(space.cubes.values()).filter(v => !!v).length;
}

function getNextSpace(space: Space, dims: number): Space {
  const cubes = new Map();
  const range: [number, number][] = space.range.map(
    ([min, max]) => [min - 1, max + 1]
  );

  for (const coord of coordinates(range)) {
    const ct = countActiveNeighbours(coord, space.cubes, dims);
    const k = getIntKey(coord);
    const state = !!space.cubes.get(k);

    if (state && [2, 3].includes(ct)) {
      cubes.set(k, true);
    }
    else if (!state && ct === 3) {
      cubes.set(k, true);
    }
  }

  return {
    cubes,
    range
  }
}

function countActiveNeighbours(coord: number[], cubes: Space['cubes'], dims: number) {
  let t = 0;

  for (const neighbour of neighbours(coord)) {
    const k = getIntKey(neighbour);

    if (cubes.get(k) === true) {
      t++;
    }
  }

  return t;
}

function getSpace(input: string, dims: number) {
  const data = cleanAndParse(input, l => Array.from(l));
  const cubes = new Map<number, boolean>();

  const {length: height, 0: {length: width}} = data;

  const range = simpleRange([width, height], dims);

  for (const [x, y, ...rest] of coordinates(range)) {
    cubes.set(getIntKey([x, y, ...rest]), data[y][x] === "#")
  }

  return {
    cubes,
    range
  }
}

type Space = ReturnType<typeof getSpace>;
