export function cleanAndParse<T = string>(
  input: string,
  parse: (s: string) => T = (s) => (s as unknown as T),
  {separator = "\n"}: {separator?: string} = {}
) {
  return input
    .trim()
    .split(separator)
    .map(
      line => parse(line.trim())
    );
}

export function indexify<T>(
  items: T[],
  key: (i: T) => string
): Record<string, T> {
  return items.reduce((o, b) => {
    o[key(b)] = b; // need to be fast for large arrays
    return o;
  }, {} as Record<string, T>);
}


export function timeAndRun<T extends string | number>(fn: () => T ): [result: T, duration: number] {
  const then = performance.now();
  const result = fn();
  const now = performance.now();

  return [
    result,
    Number((now - then).toFixed(2))
  ];
}

export function* pairs(
  length: number,
  {
    start = 0,
    gap = 1
  } = {}
) {
  let i = start;

  do {
    let j = i + gap

    do {
      yield [i, j];
      j += 1;
    }
    while (j < length)

    i += 1;
  }
  while (i < length - gap)
}

export function* coordinates2d({
  height,
  width
}: {
  height: number,
  width: number
}) {
  for (let row = 0; row < height; row++) {
    for (let column = 0; column < width; column++) {
      yield {row, column};
    }
  }
}

export function* coordinates3d(
  minx: number,
  maxx: number,
  miny: number,
  maxy: number,
  minz: number,
  maxz: number,
) {
  for (let z = minz; z <= maxz; z++) {
    for (let y = miny; y <= maxy; y++) {
      for (let x = minx; x <= maxx; x++) {
        yield [x, y, z];
      }
    }
  }
}

export function* coordinates4d(
  minx: number,
  maxx: number,
  miny: number,
  maxy: number,
  minz: number,
  maxz: number,
  minw: number,
  maxw: number,
) {
  for (let w = minw; w <= maxw; w++) {
    for (let z = minz; z <= maxz; z++) {
      for (let y = miny; y <= maxy; y++) {
        for (let x = minx; x <= maxx; x++) {
          yield [x, y, z, w];
        }
      }
    }
  }
}

export function* neighbours3d(
  cx: number,
  cy: number,
  cz: number
) {
  for (const [x, y, z] of coordinates3d(
    cx - 1, cx + 1,
    cy - 1, cy + 1,
    cz - 1, cz + 1
  )) {
    if (x === cx && y === cy && z === cz) {
      continue;
    }
    yield [x, y, z];
  }
}

export function* neighbours4d(
  cx: number,
  cy: number,
  cz: number,
  cw: number
) {
  for (const [x, y, z, w] of coordinates4d(
    cx - 1, cx + 1,
    cy - 1, cy + 1,
    cz - 1, cz + 1,
    cw - 1, cw + 1
  )) {
    if (x === cx && y === cy && z === cz && w === cw) {
      continue;
    }
    yield [x, y, z, w];
  }
}