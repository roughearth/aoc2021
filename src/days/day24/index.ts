import {eg1, eg2, eg3, input} from './input';
import {cleanAndParse} from '../../utils';

export const meta = {};

function parseLine(l: string) {
  const [cmd, a, b] = l.split(" ");

  return {
    cmd,
    a,
    b
  }
}
type Instruction = ReturnType<typeof parseLine>;

function parseProg(src: string): Instruction[] {
  return cleanAndParse(src, parseLine);
}

type SubRoutine = {push: boolean, B: number, C: number, diff: number, lines: Instruction[]};

function getSubroutines(prog: Instruction[]) {
  const subroutines: SubRoutine[] = [];

  for (let i = 0; i < 14; i++) {
    const lines = prog.slice(i * 18, i * 18 + 18);
    const push = lines[4].b === '1';
    const B = Number(lines[5].b);
    const C = Number(lines[15].b);
    const diff = push ? C : Math.abs(B)
    subroutines[i] = {lines, push, B, C, diff};
  }

  return subroutines;
}

type State = Record<string, number>;

function value(a: string, state: State): number {
  if (a in state) {
    return state[a];
  }
  return Number(a);
}

function executeLine({cmd, a, b}: Instruction, state: State, input: number[]) {
  // console.log(cmd, a, b, state.z, value(a, state), value(b, state), input);
  switch (cmd) {
    case 'inp': {
      // console.log("<-------------------------->", state.z);
      state[a] = input.shift() as number;
      break;
    }
    case 'add': {
      state[a] = value(a, state) + value(b, state);
      break;
    }
    case 'mul': {
      state[a] = value(a, state) * value(b, state);
      break;
    }
    case 'div': {
      const div = value(a, state) / value(b, state);
      state[a] = Math.floor(Math.abs(div)) * Math.sign(div);
      break;
    }
    case 'mod': {
      state[a] = value(a, state) % value(b, state);
      break;
    }
    case 'eql': {
      state[a] = value(a, state) === value(b, state) ? 1 : 0;
      break;
    }
  }
  // console.log(`${cmd}, ${a}, ${b ?? '-'}`.padEnd(10, ' '), '->', state);
}

function runRoutine(prog: Instruction[], inputBuffer: number[], state: State = {w: 0, x: 0, y: 0, z: 0}) {
  for (let line of prog) {
    executeLine(line, state, inputBuffer);
  }

  return state;
}

function getDiffPairs(src: string): [number[][][], Instruction[]] {
  const prog = parseProg(input);
  const subs = getSubroutines(prog);

  let pair = 0;
  const pairs: number[] = [];
  let match: number;

  let diffPairs: number[][][] = [[], [], [], [], [], [], []];

  for (let i = 0; i < subs.length; i++) {
    let {push, diff} = subs[i];

    if (push) {
      match = pair;
      pairs.push(pair);
      pair++;
    }
    else {
      match = pairs.pop() as number;
    }

    const action = push ? 0 : 1;

    diffPairs[match][action] = [i, diff];
  }

  return [diffPairs, prog];
}

export function part1() {
  const [diffPairs, prog] = getDiffPairs(input);

  const inputBuffer: number[] = []

  for (let [[pushIndex, pushOffset], [popIndex, popOffset]] of diffPairs) {
    if (pushOffset < popOffset) {
      inputBuffer[pushIndex] = 9
      inputBuffer[popIndex] = 9 + pushOffset - popOffset;
    }
    else {
      inputBuffer[pushIndex] = 9 - pushOffset + popOffset
      inputBuffer[popIndex] = 9;
    }
  }

  const checkValue = runRoutine(prog, [...inputBuffer]).z;
  if (checkValue !== 0) {
    throw new Error(`Part 1 doesn't checkout (${checkValue})`);
  }

  return inputBuffer.join("");
}

export function part2() {
  const [diffPairs, prog] = getDiffPairs(input);

  const inputBuffer: number[] = []

  for (let [[pushIndex, pushOffset], [popIndex, popOffset]] of diffPairs) {
    if (pushOffset < popOffset) {
      inputBuffer[pushIndex] = 1 - pushOffset + popOffset
      inputBuffer[popIndex] = 1;
    }
    else {
      inputBuffer[pushIndex] = 1
      inputBuffer[popIndex] = 1 + pushOffset - popOffset;
    }
  }

  const checkValue = runRoutine(prog, [...inputBuffer]).z;
  if (checkValue !== 0) {
    throw new Error(`Part 2 doesn't checkout (${checkValue})`);
  }

  return inputBuffer.join("");
}
