import {input} from './input';
import {cleanAndParse} from '../../utils';

export const meta = {};

function parseLine(line: string) {
  const [command, amount] = line.split(" ");
  return {
    command,
    amount: Number(amount)
  };
}

export function part1() {
  const data = cleanAndParse(input, parseLine);

  let pos = 0;
  let depth = 0;

  data.forEach(({command, amount}) => {
    switch (command) {
      case 'up':
        depth -= amount;
        break;
      case 'down':
        depth += amount;
        break;
      case 'forward':
        pos += amount;
        break;
      default:
        console.log(command, "not found")
    }
  })

  return pos * depth;
}

export function part2() {
  const data = cleanAndParse(input, parseLine);
  let pos = 0;
  let depth = 0;
  let aim = 0;

  data.forEach(({command, amount}) => {
    switch (command) {
      case 'up':
        aim -= amount;
        break;
      case 'down':
        aim += amount;
        break;
      case 'forward':
        pos += amount;
        depth += (aim * amount)
        break;
      default:
        console.log(command, "not found")
    }
  })

  return pos * depth;
}
