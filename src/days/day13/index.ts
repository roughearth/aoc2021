// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {input, eg1} from './input';
import {cleanAndParse} from '../../utils';

export const meta = {
  manualStart: false
};

export function part1() {
  const {time, buses} = parseData(input);

  const ids = buses.filter(Boolean);
  const times = ids.map(id => {
    return Math.ceil(time / id) * id;
  });

  const min = Math.min(...times);
  const id = Number(ids[times.indexOf(min)]);
  const diff = min - time;

  return id * diff;
}

export function part2() {
  const {buses} = parseData(input);
  const busesByOffset = buses.flatMap((id, offset) => (
    id ? [{id, offset}] : []
  ));

  let sol = 0, inc = 1;

  for (const {id, offset} of busesByOffset) {
    while(((sol + offset) % id) !== 0) {
      sol += inc;
    }

    inc *= id;
  }

  return sol;
}

function parseData(input: string) {
  const [time, buses] = cleanAndParse(input, String);

  return {
    time: Number(time),
    buses: buses.split(",").map(Number)
  };
}

