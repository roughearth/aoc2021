import {input} from './input';
import {cleanAndParse} from '../../utils';

export const meta = {};

export function part1() {
  const data = cleanAndParse(input, Array.from);

  const gammaArray: string[] = ['0'];
  const epsilonArray: string[] = ['0'];

  const { length: count } = data;
  const { length: bitSize } = data[0];

  for (let i = 0; i < bitSize; i++) {
    let ones = 0;
    for (let j = 0; j < count; j++) {
     if (data[j][i] === '1') {
       ones++;
     }
    }

    console.log({ones, i, bitSize, count})

    if (ones > count / 2) {
      gammaArray[i] = '1';
      epsilonArray[i] = '0';
    }
    else {
      gammaArray[i] = '0';
      epsilonArray[i] = '1';
    }
  }

  const gamma = parseInt(gammaArray.join(""), 2);
  const epsilon = parseInt(epsilonArray.join(""), 2);

  return gamma * epsilon;
}

export function part2() {
  const data = cleanAndParse(input, Array.from);

  let oxygenOptions = [...data];
  let co2Options = [...data];

  const { length: bitSize } = data[0];

  for (let i = 0; i < bitSize; i++) {
    let oxygenOnes = 0;
    let co2Ones = 0;

    for (let j = 0; j < oxygenOptions.length; j++) {
      if (oxygenOptions[j][i] === '1') {
        oxygenOnes++;
      }
    }

    for (let j = 0; j < co2Options.length; j++) {
      if (co2Options[j][i] === '1') {
        co2Ones++;
      }
    }

    if(oxygenOptions.length > 1) {
      if (oxygenOnes >= oxygenOptions.length / 2) {
        oxygenOptions = oxygenOptions.filter(o => o[i] === '1');
      }
      else {
        oxygenOptions = oxygenOptions.filter(o => o[i] === '0');
      }
    }

    if(co2Options.length > 1) {
      if (co2Ones >= co2Options.length / 2) {
        co2Options = co2Options.filter(o => o[i] === '0');
      }
      else {
        co2Options = co2Options.filter(o => o[i] === '1');
      }
    }
  }

  const oxygen = parseInt(oxygenOptions[0].join(""), 2);
  const co2 = parseInt(co2Options[0].join(""), 2);

  return oxygen * co2;
}
