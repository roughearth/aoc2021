export function modular(mod: number) {
  return {
    lpr: (n: number)                => modLpr(n   , mod),
    inv: (n: number)                => modInv(n   , mod),
    add: (a: number, b: number)     => modAdd(a, b, mod),
    mul: (a: number, b: number)     => modMul(a, b, mod),
    pow: (n: number, p: number)     => modPow(n, p, mod),
    log: (b: number) => (n: number) => modLog(n, b, mod),
  }
}

export function modLpr(n: number, mod: number) {
  return ((n % mod) + mod) % mod;
}

export function modInv(n: number, mod: number) {
  return modPow(n, mod - 2, mod);
}

export function modLog(n: number, base: number, mod: number) {
  // From https://en.wikipedia.org/wiki/Baby-step_giant-step
  const map = new Map<number, number>();

  const max = Math.ceil(Math.sqrt(mod));
  const factor = modPow(modInv(base, mod), max, mod);

  for (let i = 0; i <= max; i++) {
    const v = modPow(base, i, mod);
    map.set(v, i);
  }

  let candidate = n;

  for (let i = 0; i <= max; i++) {
    if (map.has(candidate)) {
      const j = <number>map.get(candidate);
      return (i * max) + j;
    }

    candidate = modMul(candidate, factor, mod);
  }

  throw new Error("Not found");
}

export function modAdd(a: number, b: number, mod: number) {
  return modLpr(a + b, mod);
}

export function modDouble(a: number, mod: number) {
  return modAdd(a, a, mod);
}

export function modMul(a: number, b: number, mod: number) {
  if (a === 0 || b === 0) {
    return 0;
  }

  let total = 0;

  let currentFactor = a;
  let currentMultiple = b;

  while (currentFactor > 0) {
    if (currentFactor % 2) {
      total = modAdd(total, currentMultiple, mod);
    }
    currentMultiple = modDouble(currentMultiple, mod);
    currentFactor = Math.floor(currentFactor / 2);
  }

  return total;
}

export function modSquare(a: number, mod: number) {
  return modMul(a, a, mod);
}

export function modPow(n: number, pow: number, mod: number) {
  let total = 1;
  let currentPower = pow;
  let currentSquare = n;

  while (currentPower > 0) {
    if (currentPower % 2) {
      total = modMul(total, currentSquare, mod);
    }
    currentSquare = modSquare(currentSquare, mod);
    currentPower = Math.floor(currentPower / 2);
  }

  return total;
}
