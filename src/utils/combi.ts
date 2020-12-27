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
