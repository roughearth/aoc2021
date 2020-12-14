// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {input, eg1} from './input';
import {cleanAndParse} from '../../utils';

export function part1() {
  const list = cleanAndParse(input, parseInstruction);

  return manhattan(runListPart1(list));
}

export function part2() {
  const list = cleanAndParse(input, parseInstruction);

  return manhattan(runListPart2(list));
}

type Instruction = {
  command: string;
  arg: number;
}

function parseInstruction(line: string): Instruction {
  return {
    command: line[0],
    arg: Number(line.slice(1))
  };
}

const turnMapPart1: Record<string, Record<number, Record<string, string>>> = {
  R: {
    90:  {N: "E", E: "S", S: "W", W: "N"},
    180: {N: "S", E: "W", S: "N", W: "E"},
    270: {N: "W", E: "N", S: "E", W: "S"}
  },
  L: {
    90:  {N: "W", E: "N", S: "E", W: "S"},
    180: {N: "S", E: "W", S: "N", W: "E"},
    270: {N: "E", E: "S", S: "W", W: "N"}
  }
};

function manhattan({e, s}: {e: number, s: number}) {
  return Math.abs(e) + Math.abs(s);
}

function runListPart1(list: Instruction[]) {
  let e = 0, s = 0;
  let facing = "E";

  list.forEach(({command, arg}: Instruction) => {
    switch (command) {
      case "R":
      case "L": {
        facing = turnMapPart1[command][arg][facing]
        break;
      }
      case "N":
      case "W":
      case "S":
      case "E":
      case "F": {
        let dir = (command === "F") ? facing : command;

        switch (dir) {
          case "N": {
            s -= arg;
            break;
          }
          case "E": {
            e += arg
            break;
          }
          case "S": {
            s += arg;
            break;
          }
          case "W": {
            e -= arg;
            break;
          }
        }

        break;
      }
    }
  });

  return {e, s, facing};
}

const turnMapPart2: Record<string, Record<number, (x: number, y: number) => number[]>> = {
  R: {
    90:  (x, y) => [-y,  x],
    180: (x, y) => [-x, -y],
    270: (x, y) => [ y, -x]
  },
  L: {
    90:  (x, y) => [ y, -x],
    180: (x, y) => [-x, -y],
    270: (x, y) => [-y,  x]
  }
};

function runListPart2(list: Instruction[]) {
  let x = 10, y = -1; // waypoint rel x, y
  let s = 0, e = 0;

  list.forEach(({command, arg}: Instruction) => {
    switch (command) {
      case "R":
      case "L": {
        [x, y] = turnMapPart2[command][arg](x, y);
        break;
      }
      case "F": {
        e += arg * x;
        s += arg * y;
        break;
      }
      case "N": {
        y -= arg;
        break;
      }
      case "E": {
        x += arg
        break;
      }
      case "S": {
        y += arg;
        break;
      }
      case "W": {
        x -= arg;
        break;
      }
    }
  });

  return {e, s};
}