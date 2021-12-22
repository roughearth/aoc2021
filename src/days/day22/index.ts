import {input} from './input';
import {cleanAndParse} from '../../utils';

export const meta = {
  maxLoops: 1e10,
  maxMs: 600_000
};

type DimRange = [number, number];
type Cuboid = [DimRange, DimRange, DimRange];
type Instruction = [Cuboid, boolean, boolean];
type Optional<T> = T | undefined;

const X = 0;
const Y = 1;
const Z = 2;

const BELOW = 0;
const INSIDE = 1;
const ABOVE = 2;

const SEGMENTS = [BELOW, INSIDE, ABOVE];

const FROM = 0;
const TO = 1;

const CUBOID = 0;

function parseLine(s: string): Instruction {
  const [onOff, cuboid] = s.split(" ");

  const state = onOff === 'on';

  let large = false;

  const dims = cuboid.split(",")
    .map(d => d.split("="))
    .map(([d, c]) => c.split('..').map(s => {
      const n = Number(s);
      large = large || Math.abs(n) > 50;
      return n;
    }) as DimRange) as Cuboid;

  return [dims, state, large];
}

function ifValidDimRange(rFrom: number, rTo: number): DimRange | undefined {
  if (rFrom <= rTo) {
    return [rFrom, rTo];
  }
}

function splitDim(a: Cuboid, b: Cuboid, dim: number): Optional<DimRange>[] {
  const below = ifValidDimRange(
    Math.min(a[dim][FROM], b[dim][FROM]),
    Math.max(a[dim][FROM], b[dim][FROM]) - 1
  );

  const inside = ifValidDimRange(
    Math.max(a[dim][FROM], b[dim][FROM]),
    Math.min(a[dim][TO], b[dim][TO])
  );

  const above = ifValidDimRange(
    Math.min(a[dim][TO], b[dim][TO]) + 1,
    Math.max(a[dim][TO], b[dim][TO])
  );

  return [below, inside, above];
}

function intersects(a: Cuboid, b: Cuboid) {
  return (
    a[X][FROM] <= b[X][TO] && b[X][FROM] <= a[X][TO] &&
    a[Y][FROM] <= b[Y][TO] && b[Y][FROM] <= a[Y][TO] &&
    a[Z][FROM] <= b[Z][TO] && b[Z][FROM] <= a[Z][TO]
  );
}

function contains(a: Cuboid, b: Cuboid) {
  return (
    a[X][FROM] <= b[X][FROM] && a[X][TO] >= b[X][TO] &&
    a[Y][FROM] <= b[Y][FROM] && a[Y][TO] >= b[Y][TO] &&
    a[Z][FROM] <= b[Z][FROM] && a[Z][TO] >= b[Z][TO]
  );
}

function isValidCuboid(cuboid: Cuboid): boolean {
  return cuboid.reduce(
    (t:boolean, dimRange: DimRange) => (t && Boolean(dimRange)),
    true
  );
}

function sizeOfCuboid(cuboid: Cuboid): number {
  return cuboid.reduce(
    (t:number, dimRange: DimRange) => (t * (dimRange[TO] - dimRange[FROM] + 1)),
    1
  );
}

function subtract(take: Cuboid, from: Cuboid): Cuboid[] {
  // divide `from` in to the 27 segments of `take` Union `from` centred on `take` intersection `from`
  // return only those segments that are in `from`

  return split(from, take)[0];
}

function split(a: Cuboid, b: Cuboid): [Cuboid[], Cuboid[], Cuboid[]] {
  const aOnly: Cuboid[] = [];
  const both: Cuboid[] = [];
  const bOnly: Cuboid[] = [];

  /*
  for each x, y, z
  [below, inside, above]

  DimRange[x|y|z][below|inside|above]
  */
  const newRanges = [X, Y, Z].map(
    (d: number) => splitDim(a, b, d)
  );

  for (let segmentX of SEGMENTS) {
    for (let segmentY of SEGMENTS) {
      for (let segmentZ of SEGMENTS) {
        const candidateCubeoid = [
          newRanges[X][segmentX],
          newRanges[Y][segmentY],
          newRanges[Z][segmentZ],
        ] as Cuboid;

        const isValid = isValidCuboid(candidateCubeoid)

        const inA = isValid && contains(a, candidateCubeoid);
        const inB = isValid && contains(b, candidateCubeoid);

        if (inA && inB) {
          both.push(candidateCubeoid);
        }
        else if (inA) {
          aOnly.push(candidateCubeoid);
        }
        else if (inB) {
          bOnly.push(candidateCubeoid);
        }
      }
    }
  }

  return [aOnly, both, bOnly];
}

function totalSize(cuboids: Set<Cuboid>) {
  let total = 0;

  for (let cuboid of cuboids.values()) {
    total += sizeOfCuboid(cuboid);
  }

  return total;
}

function runPart(src: string, smallOnly: boolean) {
  let data = cleanAndParse(src, parseLine);

  if (smallOnly) {
    data = data.filter(([,,large]) => !large);
  }

  const first = data[0][CUBOID];

  const onCuboids = new Set<Cuboid>([first]);

  for (let [newCuboid, setToOn] of data.slice(1)) {
    // remove the overlapped parts of already on cuboids
    for (let onCuboid of onCuboids) {
      if (intersects(onCuboid, newCuboid)) {
        const difference = subtract(newCuboid, onCuboid);

        onCuboids.delete(onCuboid);
        difference.forEach(c => onCuboids.add(c));
      }
    }

    if (setToOn) {
      onCuboids.add(newCuboid);
    }
  }

  return totalSize(onCuboids);
}

export function part1() {
  return runPart(input, true);
}

export function part2() {
  return runPart(input, false);
}
