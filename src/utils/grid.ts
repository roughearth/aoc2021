export type CoordinateRange = [number, number][];

/**
 * Return a `CoordinateRange` from 0 with the given count of coordinates in each dimension
 * @param sizes array of the size in each dimension. Range is 0...(size - 1)
 * @param dims number of dimensions required, defaults to the number of `sizes` given
 */
export function simpleRange(sizes: number[], dims = sizes.length): CoordinateRange {
  const range: CoordinateRange = sizes.map(m => [0, m - 1]);
  validateRange(range);

  while (range.length < dims) {
    range.push([0, 0]);
  }

  return range;
}

/**
 * Returns a new range that's more expansive in every direction by the given amount
 * @param range
 * @param by
 */
export function growRange(range: CoordinateRange, by = 1): CoordinateRange {
  return range.map(([min, max]) => [min - by, max + by]);
}

function validateRange(range: CoordinateRange) {
  range.forEach(([min, max], i) => {
    if (min > max) {
      throw new Error(`Range is invalid at dimension ${i + 1}, ${min} > ${max}`)
    }
  });

  return true;
}

/**
 * Generate all possible tuples of coordinates in the given `CoordinateRange`
 * @param limits
 */
export function* coordinates(limits: CoordinateRange) {
  validateRange(limits);
  const current: number[] = limits.map(([min]) => min); // start at all the mins
  const lastDim = limits.length - 1;

  outer:
  while (true) { // will break when there are no more coords to yeild
    // (re)set to changing the "right-most" dimension
    let i = lastDim;
    let [min, max] = limits[lastDim];

    // copy it to avoid accidental mutation;
    yield [...current];

    while (true) { // increment, moving "left" until wrapping is uncessessary
      const next = current[i] + 1;

      if (next > max) { // can't go higher in this dimension
        if (i === 0) {
          // moving "left" isn't possible, so stop
          break outer;
        }

        current[i] = min; // back to the beginning
        i -= 1; // "left" a dimension
        [min, max] = limits[i]; // read the limits
      }
      else {
        current[i] = next;
        break;
      }
    }
  }
}

/**
 * Generate *all* the neighbours of the given coordinate, even "diagonals".
 * (ie all the coordinates that differ by 1 in 1 or more dimensions)
 * @param center
 */
export function* neighbours(center: number[]) {
  const limits: CoordinateRange = center.map(c => [c - 1, c + 1]);

  for (const neighbour of coordinates(limits)) {
    if (neighbour.reduce((b, c, i) => (b && c === center[i]), true)) {
      continue;
    }
    yield neighbour;
  }
}

/**
 * Generate all the orthogonal neighbours of the given coordinate.
 * (ie all the coordinates that differ by 1 in exactly 1 dimension)
 * @param center
 */
export function* orthogonalNeighbours(center: number[]) {
  let dim = center.length;
  const diffs = [-1, 1];

  while (dim--) {
    for (const d of diffs) {
      const neighbour = [...center];
      neighbour[dim] += d;
      yield neighbour;
    }
  }
}

const HEX_DIFFS = [
  [-1,  0],
  [ 0, -1],
  [-1,  1],
  [ 1, -1],
  [ 0,  1],
  [ 1,  0]
]

// with this choice, all 3 planes are identically hexagonal
const FCC_DIFFS = [
  [ 0,  0, -1],
  [ 0,  1, -1],
  [ 1,  0, -1],

  ...HEX_DIFFS.map(d => [...d, 0]),

  [-1,  0,  1],
  [ 0, -1,  1],
  [ 0,  0,  1],
];

export function* hexagonalNeighbors([x, y]: number[]) {
  for(const [dx, dy] of HEX_DIFFS) {
    yield [x + dx, y + dy];
  }
}

export function* faceCentredCubicNeighbors([x, y, z]: number[]) {
  for(const [dx, dy, dz] of FCC_DIFFS) {
    yield [x + dx, y + dy, z + dz];
  }
}

/**
 * Pad a coordinate with trailing zeros to match the given dimension count
 * @param coords
 * @param dims
 */
export function padCoordinate(coords: number[], dims: number) {
  return Object.assign(Array(dims).fill(0), coords);
}

/**
 * Turn a coordinate in to a key suitable for a map
 * @param coords
 */
export function getKey(coords: number[]): string {
  return coords.join();
}

/**
 * Parse a key created by `getKey` in to coordinates
 * @param key
 */
export function parseKey(key: string): number[] {
  return key.split(",").map(Number);
}
