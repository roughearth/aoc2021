import {input} from './input';
import {cleanAndParse} from '../../utils';

export const meta = {};

function parseLine(line: string) {
  const [start, end] = line.split('->').map(xy => xy.trim().split(',').map(Number));

  const isHorizontal = start[1] === end[1];
  const isVertical = start[0] === end[0];
  const isPerpendicular = isHorizontal || isVertical;

  return {start, end, isPerpendicular, isHorizontal, isVertical};
}
type Line = ReturnType<typeof parseLine>;

function* lineCoords(line: Line) {
  if (line.isHorizontal) {
    const y = line.start[1];
    const [start, end] = [line.start[0], line.end[0]].sort((a, b) => (a - b));
    for (let x = start; x <= end; x++) {
      yield [x, y];
    }
  }
  else if (line.isVertical) {
    const x = line.start[0];
    const [start, end] = [line.start[1], line.end[1]].sort((a, b) => (a - b));
    for (let y = start; y <= end; y++) {
      yield [x, y];
    }
  }
  else { // diagonal - always 45 degrees
    const [startPt, endPt] = [line.start, line.end].sort((a, b) => (a[0] - b[0]));

    let yDiff = Math.sign(endPt[1] - startPt[1]);

    for (let [x, y] = startPt; x <= endPt[0]; x++, y += yDiff) {
      yield [x, y];
    }
  }
}

function analyse(lines: Line[]) {
  const grid: Map<string, number> = new Map();

  for(let line of lines) {
    for(let coords of lineCoords(line)) {
      const key = coords.join(",");
      const current = grid.get(key) || 0;

      grid.set(key, current + 1);
    }
  }

  let count = [...grid.values()].filter(v => v >= 2).length;

  return count;
}

export function part1() {
  const data = cleanAndParse(input, parseLine);

  return analyse(data.filter(l => l.isPerpendicular));
}

export function part2() {
  const data = cleanAndParse(input, parseLine);

  return analyse(data);
}
