import {input} from './input';
import {cleanAndParse} from '../../utils';

export function part1() {
  const code = cleanAndParse(input, parseLine);

  return run(code).accumulator;
}

export function part2() {
  const code = cleanAndParse(input, parseLine);

  let next = -1;

  do {
    const {clone, index} = changeNext(code, next);

    if(!clone) {
      return "Tried em all";
    }

    next = index;

    const {looped, accumulator} = run(clone);

    if (!looped) {
      return accumulator;
    }

  } while(next <= code.length)

  return "Error";
}

type Command = {
  cmd: string;
  arg: number;
}

function parseLine(l: string): Command {
  const [cmd, n] = l.split(" ");
  return {
    cmd,
    arg: Number(n)
  };
}

function changeNext(code: Command[], index: number) {
  let cmd, arg;
  do {
    index += 1;

    if (index >= code.length) {
      return {index};
    }

    ({cmd, arg} = code[index]);
  } while (cmd === "acc");

  const clone = [...code];
  clone[index] = {
    cmd: cmd === "nop" ? "jmp" : "nop",
    arg
  }

  return {clone, index};
}

type Exit = {
  looped: boolean;
  accumulator: number;
}

function run(code: Command[]): Exit{
  let cursor = 0;
  let accumulator = 0;
  const visited = new Set();

  const commands: Record<string, (n: number) => void> = {
    nop() {
      cursor += 1;
    },
    jmp(n) {
      cursor += n;
    },
    acc(n) {
      cursor += 1;
      accumulator += n;
    }
  }

  while(!visited.has(cursor)) {
    visited.add(cursor);
    const {cmd, arg} = code[cursor];
    commands[cmd](arg);

    if (cursor >= code.length) {
      return {
        looped: false,
        accumulator
      };
    }
  }

  return {
    looped: true,
    accumulator
  };
}

