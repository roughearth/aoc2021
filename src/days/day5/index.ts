import {input} from './input';
import {cleanAndParse} from '../../utils';

export function part1() {
  const seatList = cleanAndParse(input, toSeatId);

  return Math.max(...seatList);
}

export function part2() {
  const seatList = new Set(cleanAndParse(input, toSeatId));

  for (let i = 0; i < 1024; i++) {
    if (!seatList.has(i) && seatList.has(i + 1) && seatList.has(i - 1)) {
      return i;
    }
  }

  return "Error"
}

function toSeatId(code: string) {
  const b = code.replace(/[FL]/g, "0").replace(/[BR]/g, "1");

  return parseInt(b, 2);
}
