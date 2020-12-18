import {input} from './input';
import {cleanAndParse} from '../../utils';
import { SafetyNet } from '..';

export function part1() {
  const values = cleanAndParse(input, evaluatePart1);

  return values.reduce((a, b) => (a + b));
}

export function part2(safetyNet: SafetyNet) {
  const values = cleanAndParse(input, evaluatePart2);

  return values.reduce((a, b) => (a + b));//
}

const ops: Record<string, (a: number, b: number) => number> = {
  "+": (a, b) => (a + b),
  "*": (a, b) => (a * b)
}

function evaluatePart2(expression: string) {
  let chars = expression.replaceAll(" ", "");
  let nextPlus = chars.indexOf("+");

  while (nextPlus !== -1) {
    let start = nextPlus - 1;
    if (chars[nextPlus - 1] === ")") {
      let match = 1;
      while (match > 0) {
        start--;
        if (chars[start] === ")") {
          match++;
        }
        if(chars[start] === "(") {
          match--
        }
      }
    }

    let end = nextPlus + 2;
    if (chars[nextPlus + 1] === "(") {
      let match = 1;
      while (match > 0) {
        if (chars[end] === "(") {
          match++;
        }
        if(chars[end] === ")") {
          match--
        }
        end++;
      }
      end--;
    }

    const charAray = Array.from(chars);
    charAray.splice(end, 0, ")");
    charAray.splice(start, 0, "(");
    chars = charAray.join("");

    nextPlus = chars.indexOf("+", nextPlus + 2)
  }

  return evaluatePart1(chars);
}

function evaluatePart1(expression: string) {
  const chars = expression.replaceAll(" ", "");
  let cursor = 0;
  let value = 0;
  let op = "+";

  while (cursor < chars.length) {
    const token = chars[cursor];

    switch (token) {
      case "(":
      {
        let end = cursor + 1;
        let match = 1;
        while (match > 0) {
          if (chars[end] === "(") {
            match++;
          }
          if(chars[end] === ")") {
            match--
          }
          end++;
        }

        const sub = chars.substring(cursor + 1, end - 1);
        const v = evaluatePart1(sub);
        value = ops[op](value, v)
        cursor = end - 1;
        break;
      }
      case "+":
      case "*":
      {
        op = token;
        break;
      }
      default: // number
      {
        value = ops[op](value, Number(token))
        break;
      }
    }

    cursor += 1;
  }

  return value;
}
