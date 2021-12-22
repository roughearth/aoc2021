import {eg0, eg1, input} from './input';
import {ArrayKeyedMap, cleanAndParse, CoordinateRange, coordinates, SafetyNet} from '../../utils';

export const meta = {
  maxLoops: 1e10,
  maxMs: 600_000
};

function consoleLog(...msg: any[]) {
  // console.log(...msg);
}

type DimRange = [number, number];
type Cuboid = [DimRange, DimRange, DimRange];
type Instruction = [Cuboid, boolean, boolean];
type Optional<T> = T | undefined;

const X = 0;
const Y = 1;
const Z = 2;

const DIMS = [X, Y, Z];

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

function getRange(d: DimRange[]): CoordinateRange {
  return d;
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

function totalSize(cuboids: Map<string, Cuboid>) {
  let total = 0;

  for (let cuboid of cuboids.values()) {
    total += sizeOfCuboid(cuboid);
  }

  return total;
}

export function part1(safetyNet: SafetyNet) {
  console.clear();
  // console.log("start");
  const unfiltered = cleanAndParse(eg1, parseLine);
  const data = unfiltered.filter(([,,large]) => !large);

  const onCuboids = new Map<string, Cuboid>([
    [JSON.stringify(data[0][CUBOID]), data[0][CUBOID]]
  ]);

  console.log(
    "start",
    unfiltered.length,
    data.length,
    sizeOfCuboid(data[0][CUBOID]),
    totalSize(onCuboids),
    Array.from(onCuboids).map(c => JSON.stringify(c))
  );

  let iteration = [0, 0];
  for (let [newCuboid, setToOn] of data.slice(1)) {
    let used = false;
    // iteration[0]++;
    // iteration[1] = 0;
    // if (iteration[0] > 7) console.log("iteration", iteration.join("."), onCuboids.size, JSON.stringify(newCuboid));

    for (let [currentlyOnKey, currentlyOn] of (new Map(onCuboids))) {
      if (safetyNet.fails()) {
        throw new Error(safetyNet.reason);
      }
      // iteration[1]++
      // if (iteration[0] > 7) console.log("iteration", iteration.join("."));


      if (intersects(currentlyOn, newCuboid)) {
        if (contains(currentlyOn, newCuboid) && setToOn) {
          consoleLog("on contains new and 'on'");
          used = true;
        }
        else if(contains(newCuboid, currentlyOn) && !setToOn) {
          consoleLog("new contains on and 'off'");

          onCuboids.delete(currentlyOnKey);
          used = true;
        }
        else {
          const [existing,, additions] = split(currentlyOn, newCuboid);

          if (setToOn) {
            consoleLog("split and 'on' so adding", additions.length);

            used = true;
            for (let add of additions) {
              onCuboids.set(JSON.stringify(add), add);
            }
          }
          else {
            onCuboids.delete(currentlyOnKey);
            consoleLog("split and 'off', so replacing", currentlyOn, "with", existing.length);

            used = true;
            for (let add of existing) {
              onCuboids.set(JSON.stringify(add), add);
            }
          }
        }
      }
    }

    if (!used) {
      consoleLog("not used so adding", newCuboid);

      onCuboids.set(JSON.stringify(newCuboid), newCuboid);
    }

    consoleLog(
      setToOn,
      sizeOfCuboid(newCuboid),
      totalSize(onCuboids),
      Array.from(onCuboids).map(c => JSON.stringify(c))
    );
  }

  console.log("end")
  return totalSize(onCuboids);
}

export function part2() {
  const data = cleanAndParse(input, Number);
  return `{data}`;
}
