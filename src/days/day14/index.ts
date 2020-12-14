// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {input, eg1, eg2} from './input';
import {cleanAndParse} from '../../utils';

export const meta = {
  manualStart: false
};

export function part1() {
  const program = cleanAndParse(input, parseLine);

  const mem: number[] = [];
  let mask: Mask;

  program.forEach(line => {
    if (line.type === "mask") {
      mask = line as Mask;
    }
    else {
      const {address, value} = line as Write;
      mem[address] = applyMaskPart1v2(mask, value);
      // mem[address] = applyMaskPart1v1(mask, value);
    }
  });

  // 6386593869035
  return mem.reduce((t, v) => (t + v));
}

export function part2() {
  const program = cleanAndParse(input, parseLine);

  const mem = new Map<number, number>(); // array is *waaaay* too slow
  let mask: Mask;

  program.forEach(line => {
    if (line.type === "mask") {
      mask = line as Mask;
    }
    else {
      const {address, value} = line as Write;
      const addresses = applyMaskPart2(mask, address);

      addresses.forEach(a => {
        mem.set(a, value);
      })
    }
  });

  // 4288986482164
  return Array.from(mem.values()).reduce((t, v) => (t + v));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function applyMaskPart1v1({bits}: Mask, value: number) {
  const [xsToOnes, xsToZeroes] = transformXs(bits);
  return( value & xsToOnes) | xsToZeroes;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function applyMaskPart1v2({bits}: Mask, value: number) {
  const binary = Array.from(value.toString(2).padStart(36, "0"));

  for (let i = 0; i < 36; i++) {
    const inst = bits[i];

    if (inst !== "X") {
      binary[i] = inst;
    }
  }

  return parseInt(binary.join(""), 2);
}

function applyMaskPart2(mask: Mask, address: number): number[] {
  const part1Masks = getPart1MasksFromPart2Mask(mask);

  return part1Masks.map(bits => applyMaskPart1v2({bits} as Mask, address));
}

function both(before: string, index: number) {
  const start = before.slice(0, index);
  const end = before.slice(index + 1);
  return [
    `${start}1${end}`,
    `${start}0${end}`,
  ];
}

function getPart1MasksFromPart2Mask({bits}: Mask): string[] {
  const mappedZeroes = bits.replaceAll("0", "x");
  let lastFound = mappedZeroes.indexOf("X");
  let part1Masks = [mappedZeroes];

  const mapper = (m: string) => { // sep func to keep eslint happy!
    return both(m, lastFound);
  };

  while (lastFound !== -1) {
    part1Masks = part1Masks.flatMap(mapper)
    lastFound = mappedZeroes.indexOf("X", lastFound + 1);
  }

  return part1Masks.map(m => m.toUpperCase());
}

function transformXs(bits: string) {
  return [
    bits.replaceAll("X", "1"),
    bits.replaceAll("X", "0")
  ].map(s => parseInt(s, 2));
}

function parseMask(line: string) {
  return {
    type: "mask",
    bits: line.slice(7)
  };
}

type Mask = ReturnType<typeof parseMask>;

function parseWrite(line: string) {
  const [address, value] = line
    .match(/^mem\[([0-9]+)\] = ([0-9]+)$/)?.slice(1).map(Number) || [];

  return {
    type: "write",
    address,
    value
  }
}

type Write = ReturnType<typeof parseWrite>;

function parseLine(line: string) {
  if (line.slice(0, 3) === "mem") {
    return parseWrite(line);
  }
  return parseMask(line);
}
