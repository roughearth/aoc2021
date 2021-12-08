import {input} from './input';
import {cleanAndParse} from '../../utils';

export const meta = {};

function parseLine(line: string) {
  const [unique, numbers] = line.split("|")
    .map(
      s => s.trim().split(" ").map(
        n => n.split("").sort().join("")
      )
    );

  return {unique, numbers};
}

// <----------------------------------------------------------->
// <-- PART 1 ------------------------------------------------->
// <----------------------------------------------------------->

export function part1() {
  const data = cleanAndParse(input, parseLine);

  let total = 0;

  for (let {numbers} of data) {
    total += numbers.filter(n => [2,3,4,7].includes(n.length)).length;
  }

  return total;
}

// <----------------------------------------------------------->
// <-- PART 2 ------------------------------------------------->
// <----------------------------------------------------------->

function deriveNumbers(patterns: string[]) {
  const eliminationMap: Record<string, Set<string>> = {
    A: new Set(),
    B: new Set(["a", "b", "c", "d", "e", "f", "g"]),
    C: new Set(),
    D: new Set(["a", "b", "c", "d", "e", "f", "g"]),
    E: new Set(["a", "b", "c", "d", "e", "f", "g"]),
    F: new Set(),
    G: new Set(["a", "b", "c", "d", "e", "f", "g"])
  };

  const patternsByLength: Record<number, string[][]> = {
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: []
  };

  for(let pattern of patterns) {
    patternsByLength[pattern.length].push(pattern.split(""));
  }

  /*
      A
     B C
      D
     E F
      G

  0 -> ABCEFG
  1 -> CF
  2 -> ACDEG
  3 -> ACDFG
  4 -> BCDF
  5 -> ABDFG
  6 -> ABDEFG
  7 -> ACF
  8 -> ABCDEFG
  9 -> ABCDFG

   */

  // A is letter in pattern(3), but not pattern(2)
  const setA = new Set(patternsByLength[3][0]);
  for(let L of patternsByLength[2][0]) {
    setA.delete(L);
  }
  const valA = Array.from(setA)[0];

  eliminationMap.A.add(valA);

  for(let l of ["B", "C", "D", "E", "F", "G"]) {
    eliminationMap[l].delete(valA);
  }

  // C & F are the values in pattern(2)
  for(let l of patternsByLength[2][0]) {
    eliminationMap.C.add(l);
    eliminationMap.F.add(l);

    for(let L of ["B", "D", "E", "G"]) {
      eliminationMap[L].delete(l);
    }
  }

  // B & D are the value in pattern(4), but not pattern(2)
  // which leaves E & G
  const setBD = new Set(patternsByLength[4][0]);
  for(let L of patternsByLength[2][0]) {
    setBD.delete(L);
  }

  for(let l of setBD) {
    eliminationMap.E.delete(l);
    eliminationMap.G.delete(l);
  }

  for(let l of eliminationMap.E) {
    eliminationMap.B.delete(l);
    eliminationMap.D.delete(l);
  }


  // A, D & G are the only ones in each of pattern(5), but we already know A
  // remove (A,) D, G from map.B and map.E
  // then remove map.B from map.D and map.E from map.G
  const setADG = new Set(patternsByLength[5][0]);

  for (let p of patternsByLength[5].slice(1)) {
    for (let l of setADG) {
      if (!p.includes(l)) {
        setADG.delete(l);
      }
    }
  }

  for (let l of setADG) {
    eliminationMap.B.delete(l);
    eliminationMap.E.delete(l);
  }

  for (let l of eliminationMap.B) {
    eliminationMap.D.delete(l);
  }

  for (let l of eliminationMap.E) {
    eliminationMap.G.delete(l);
  }

  // F is the only one of C and F, that occurs all of pattern(6)
  // remove F from map.C
  // remove map.C from map.F
  const setCF = new Set(patternsByLength[6][0]);

  for (let p of patternsByLength[6].slice(1)) {
    for (let l of setCF) {
      if (!p.includes(l)) {
        setCF.delete(l);
      }
    }
  }

  for (let l of setCF) {
    eliminationMap.C.delete(l);
  }

  for (let l of eliminationMap.C) {
    eliminationMap.F.delete(l);
  }

  // eliminationMap now is now U -> [l]

  const segmentMap = Object.fromEntries(
    Object.entries(eliminationMap).map(
      ([k, v]: [string, Set<string>]) => [k, Array.from(v)[0]]
    )
  );

  const numberMap = Object.fromEntries([
    'ABCEFG',
    'CF',
    'ACDEG',
    'ACDFG',
    'BCDF',
    'ABDFG',
    'ABDEFG',
    'ACF',
    'ABCDEFG',
    'ABCDFG'
  ].map((s, n) => {
    const p = s.split("").map(c => segmentMap[c]).sort().join("");

    return [p, n];
  }));

  return numberMap;
}

function parseNumber(map: ReturnType<typeof deriveNumbers>, numbers: string[]) {
  return parseInt(numbers.map(n => map[n]).join(""), 10);
}

export function part2() {
  const data = cleanAndParse(input, parseLine);

  let total = 0;

  for (let {unique, numbers} of data) {
    const numberMap = deriveNumbers(unique);
    total += parseNumber(numberMap, numbers);
  }

  return total;
}
