// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {input} from './input';
import {cleanAndParse, modular} from '../../utils';


export function part1() {
  const [card, door] = cleanAndParse(input, Number);
  const {log, pow} = modular(20201227);

  const cardSecret =  log(7)(card);

  return pow(door, cardSecret);
}

export function part2() {
  return "Merry Xmas!";
}

