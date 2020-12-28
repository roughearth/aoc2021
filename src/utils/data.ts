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
    o[key(b)] = b;
    return o;
  }, {} as Record<string, T>);
}

export function indexifyAsMap<T, S>(
  items: T[],
  key: (i: T) => S
): Map<S, T> {
  return items.reduce((o, b) => {
    o.set(key(b), b);
    return o;
  }, new Map<S, T>());
}

export function generateArray<T>(length: number, generate: (i: number) => T): T[] {
  return Array.from(
    {length},
    (_, i) => generate(i)
  );
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
