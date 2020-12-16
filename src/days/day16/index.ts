// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {input, eg1} from './input';
import {cleanAndParse} from '../../utils';

export function part1() {
  const {fieldData, nearbyTickets} = input;
  const fields = cleanAndParse(fieldData, parseField);
  const tickets = cleanAndParse(nearbyTickets, parseTicket);
  const ranges = fields.flatMap(f => f.ranges);

  let errorRate = tickets.reduce(
    (t, ticket) => {
      const invalidParts = ticket.filter(n => invalid(n, ranges));
      const invalidSum = invalidParts.reduce((a, b) => (a + b), 0);

      return t + invalidSum;
    },
    0
  );

  // 20058
  return errorRate;
}

export function part2() {
  const {fieldData, nearbyTickets, yourTicket} = input;
  const fields = cleanAndParse(fieldData, parseField);
  const tickets = cleanAndParse(nearbyTickets, parseTicket);
  const allRanges = fields.flatMap(f => f.ranges);
  const myTicket = parseTicket(yourTicket);

  const validTickets = tickets.filter(ticket => {
    return !ticket.some(value => invalid(value, allRanges));
  });

  const fieldNames = fields.map(field => field.label);
  const candidateFields = Array.from(
    {length: fieldNames.length},
    () => new Set(fieldNames)
  );

  validTickets.forEach(ticket => {
    ticket.forEach((value, index) => {
      fields.forEach(({label, ranges}) => {
        if (invalid(value, ranges)) {
          candidateFields[index].delete(label);
        }
      });
    });
  });

  reduce(candidateFields);

  const fieldMap: [string, number][] = candidateFields.map(
    (set, index): [string, number] => [Array.from(set)[0], index]
  ).filter(
    ([label]) => label.startsWith("departure")
  );

  // 366871907221
  return fieldMap.reduce(
    (total: number, [, value]: [unknown, number]) => {
      return (total * myTicket[value])
    },
    1
  );
}

function reduce(sets: Set<string>[]) {
  let decided = sets.filter(s => s.size === 1);
  let choices = sets.filter(s => s.size !== 1);

  while (choices.length) {
    choices.forEach(set => {
      decided.forEach(d => {
        set.delete(Array.from(d)[0]);
      })
    });

    decided = choices.filter(s => s.size === 1);
    choices = choices.filter(s => s.size !== 1);
  }
}

function invalid(value: number, ranges: Range[]) {
  const r = !ranges.some(f => inRange(value, f));
  return r;
}

function inRange(value: number, range: Range) {
  const [min, max] = range;

  return (
    (value >= min) &&
    (value <= max)
  );
}

function parseField(input: string) {
  const [label, numbers] = input.split(":")
  return {
    label: label.trim(),
    ranges: numbers.trim().split(" or ").map(r => r.split("-").map(Number))
  };
}

type Field = ReturnType<typeof parseField>;
type Range = Field['ranges'][number];

function parseTicket(input: string) {
  return input.trim().split(",").map(Number);
}
