import {input} from './input';
import {cleanAndParse} from '../../utils';

export const meta = {
  manualStart: true,
  maxMs: 60_000
};

type Pos = [number, number, number];
type Scanner = Pos[];
type OrientedScanner = [Scanner, Scanner];

function parseInput(s: string) {
  const scanners: Scanner[] = [];
  let currentScanner: Scanner;

  cleanAndParse(s, l => {
    if (l.startsWith('--- scanner')) {
      currentScanner = [];
      scanners.push(currentScanner);
    }
    else if (l) {
      const pos = l.split(',').map(Number) as Pos;
      currentScanner.push(pos);
    }
  });

  return scanners;
}

// see readme
// [1st dim, 1st dim direction, 3rd dim 1st adjust]
const XDirections = [
  [0,  1,  1],
  [0, -1, -1],
  [1,  1, -1],
  [1, -1,  1],
  [2,  1,  1],
  [2, -1, -1]
];

// [2nd dim, 2nd dim direction, 3rd din, 2nd adjust]
const XRotations = [
  [1,  1,  1],
  [1, -1, -1],
  [2,  1, -1],
  [2, -1,  1],
];

function* rotateScanner(beacons: Pos[]) {
  for(let i = 0; i < XDirections.length; i++) {
    let [X, Xd, Zi] = XDirections[i];
    const dims = [0, 1, 2];
    dims.splice(dims.indexOf(X), 1);
    dims.unshift(X);

    for (let j = 0; j < XRotations.length; j++) {
      let [Ym, Yd, Zm] = XRotations[j];
      const Y = dims[Ym];
      const Z = dims[3 - Ym];
      const Zd = Zi * Zm;

      yield [beacons, beacons.map(beacon => [
        beacon[X] * Xd,
        beacon[Y] * Yd,
        beacon[Z] * Zd
      ] as Pos)] as OrientedScanner;
    }
  }
}

function ptDiff(candidate: Pos, knownString: string): string {
  const known = knownString.split(",").map(Number) as Pos;
  return `${known[0] - candidate[0]},${known[1] - candidate[1]},${known[2] - candidate[2]}`;
}

export function analyse(srcData: string): [Set<string>, Set<string>] {
  const scanners = parseInput(srcData);
  const unmatchedScanners = new Set<Scanner>(scanners);
  unmatchedScanners.delete(scanners[0]);

  const knownBeacons = new Set<string>();
  scanners[0].forEach(b => {knownBeacons.add(b.join(','))});
  const scannerSet = new Set<string>(['0,0,0']);

  while (unmatchedScanners.size) {
    const allCandidates = Array.from(unmatchedScanners).map(scanner => {
      const rotatedScanner = Array.from(rotateScanner(scanner));

      return rotatedScanner.flatMap(
        (o: OrientedScanner) => {
          const diffMap = new Map<string, number>();

          for(let known of knownBeacons) {
            for(let candidate of o[1]) {
              const diff = ptDiff(candidate, known);
              diffMap.set(diff, (diffMap.get(diff) ?? 0) + 1);
            }
          }

          const enoughMatched = Array.from(diffMap.entries()).filter(([,v]) => (v > 11));

          if (enoughMatched.length === 1) {
            return [[enoughMatched[0][0], o] as [string, OrientedScanner]];
          }

          return [];
        }
      )
    }).filter(c => (c.length === 1));

    allCandidates.forEach(([[offsetString, [srcBeacon, rotatedBeacons]]]) => {
      unmatchedScanners.delete(srcBeacon as Scanner);
      scannerSet.add(offsetString);

      const [a,b,c] = offsetString.split(",").map(Number);

      rotatedBeacons.forEach(([x,y,z]) => {
        const known = `${x+a},${y+b},${z+c}`;
        knownBeacons.add(known);
      });
    });
  }

  return [knownBeacons, scannerSet];
}

export function part1() {
  const [beacons] = analyse(input);
  return beacons.size;
}

export function part2() {
  const [,scanners] = analyse(input);

  let max = 0;

  for (let a of scanners) {
    const [a1, a2, a3] = a.split(",").map(Number);

    for (let b of scanners) {
      const [b1, b2, b3] = b.split(",").map(Number);

      const dist = Math.abs(a1 - b1) + Math.abs(a2 - b2) + Math.abs(a3 - b3);
      max = Math.max(max, dist);
    }
  }

  return max;
}
