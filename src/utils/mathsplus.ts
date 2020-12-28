import { modPow } from "./mod";

// return value [[factor, power], ...] eg 90 -> [[2, 1], [3, 2], [5, 1]]
export function primeFactorise(n: number) {
  const components: [number, number][] = [];

  const check = (c: number): void => {
    let pwr = 0;

    while (!(n % c)) {
      pwr++;
      n /= c;
    }

    if (pwr) {
      components.push([c, pwr]);
    }
  }

  check(2);
  check(3);

  let candidate = 5;

  while ((candidate * candidate) <= n) {
    check(candidate);
    candidate += (candidate % 6 === 5) ? 2 : 4 // flips between 6n-1 and 6n+1
  }

  if (n > 1) {
    check(n)
  }

  return components;
}

export function isPrime(n: number) {
  const [[q]] = primeFactorise(n);
  return q === n;
}

export function allFactors(n: number) {
  const primitives = primeFactorise(n).flatMap(
    ([q, p]) => Array(p).fill(q)
  );

  let factors = Array.from(
    {length: (1 << primitives.length) - 1},
    (_, i) => {
      const mask = i + 1;

      return primitives.reduce(
        (t, p, i) => {
          if (mask & (1 << i)) {
            return t * p;
          }
          return t;
        },
        1
      );
    }
  );

  const factorSet = new Set(factors);

  return Array.from(factorSet).sort((a, b) => (a - b));
}

export function isGenerator(gen: number, mod: number) {
  if(!isPrime(mod)) {
    throw new Error("mod isn't prime");
  }

  const testPowers = allFactors(mod - 1);
  const max = testPowers.pop();

  if(modPow(gen, max, mod) !== 1) {
    return false;
  }

  for (const p of testPowers) {
    if(modPow(gen, p, mod) === 1) {
      return false;
    }
  }

  return true;
}