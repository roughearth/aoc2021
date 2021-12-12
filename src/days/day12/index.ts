import {input} from './input';
import {cleanAndParse} from '../../utils';

export const meta = {};

function makeCave(id: string): Cave {
  const links = new Set<Cave>();
  return {
    id,
    isSmall: id === id.toLowerCase(),
    links
  };
}

type Cave = {
  id: string,
  isSmall: boolean,
  links: Set<Cave>
};

// type Ends = {start?: Cave, end?: Cave};
type CaveMap = Map<string, Cave>;

function getCave(id: string, map: CaveMap) {
  if (map.has(id)) {
    return map.get(id) as Cave;
  }
  const cave = makeCave(id);
  map.set(id, cave);
  return cave;
}

function parseGraph(source: string) {
  const links = cleanAndParse(source, l => l.split("-"));
  const map: CaveMap = new Map();

  for (let ids of links) {
    const [fromCave, toCave] = ids.map(id => getCave(id, map));
    fromCave.links.add(toCave);
    toCave.links.add(fromCave);
  }

  const start = map.get("start") as Cave;
  const end = map.get("end") as Cave;

  return {map, start, end};
}

function nextStepPart1(cave: Cave, paths: string[][], path: string[]) {
  if (cave.id === "end") {
    paths.push([...path, 'end']);
  }

  const nextCaves = Array.from(cave.links);

  for(let nextCave of nextCaves) {
    if (!(nextCave.isSmall && path.includes(nextCave.id))) {
      nextStepPart1(nextCave, paths, [...path, cave.id]);
    }
  }
}

export function part1() {
  const {start} = parseGraph(input);
  const paths: string[][] = [];

  nextStepPart1(start, paths, []);

  const pathStrings = new Set(paths.map(p => p.join(",")));

  return pathStrings.size;
}

function nextStepPart2(cave: Cave, visitsAllowed: Map<Cave, number>, paths: string[][], path: string[], depth: number) {
  if (cave.id === "end") {
    paths.push([...path, 'end']);
  }

  const nextCaves = Array.from(cave.links);

  for(let nextCave of nextCaves) {
    if (!(
      nextCave.isSmall &&
      path.filter(p => p === nextCave.id).length >= (visitsAllowed.get(nextCave) as number)
    )) {
      nextStepPart2(nextCave, visitsAllowed, paths, [...path, cave.id], depth + 1);
    }
  }
}

export function part2() {
  const {start, end, map} = parseGraph(input);
  const paths: string[][] = [];

  const smallCaves = Array.from(map.values()).filter(c => (c.isSmall && !['start', 'end'].includes(c.id)));

  for (let smallCave of smallCaves) {
    const visitsAllowed = new Map(smallCaves.map(c => [c, 1]));
    visitsAllowed.set(start, 1);
    visitsAllowed.set(end, 1);
    visitsAllowed.set(smallCave, 2);

    nextStepPart2(start, visitsAllowed, paths, [], 0);
  }

  const pathStrings = new Set(paths.map(p => p.join(",")));

  return pathStrings.size;
}
