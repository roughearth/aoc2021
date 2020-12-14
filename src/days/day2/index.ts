import {input} from './input';
import {cleanAndParse} from '../../utils';

type Row = {
  min: number;
  max: number;
  target: string;
  pw: string
}

export function part1() {
  return cleanAndParse(input, parseLine).filter(passPart1).length;
}

export function part2() {
  return cleanAndParse(input, parseLine).filter(passPart2).length;
}

function passPart1({min, max, target, pw}: Row){
  const {length} = Array.from(pw).filter(c => (c === target));
  return (length >= min) && (length <= max);
}

function passPart2({min, max, target, pw}: Row){
  const {length} = [pw[min - 1], pw[max - 1]].filter(c => (c === target));
  return length === 1;
}

function parseLine(line: string): Row {
  const [, minS, maxS, target, pw] = line.match(/([0-9]+)-([0-9]+) ([a-z]): ([a-z]+)/) ?? [];

  return {
    min: Number(minS),
    max: Number(maxS),
    target,
    pw
  };
}

