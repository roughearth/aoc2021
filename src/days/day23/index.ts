// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {input} from './input';
import { getAvailablStateChanges, makeNode, makeTarget, nextUnvisitedNode, Node, parseInput } from './utils';

export const meta = {};


function buildAndWalkGraph(state: string, size: number) {
  const unvisitedNodes = new Map<string, Node>();
  const allNodes = new Map<string, Node>();
  const target = makeTarget(size);

  const start = makeNode(state, 0, [[state, 0, '-', '-']]);//
  unvisitedNodes.set(state, start);
  allNodes.set(state, start);

  while (unvisitedNodes.size) {
    const current = nextUnvisitedNode(unvisitedNodes) as Node;

    if (current.state === target) {
      return current.distance;
    }

    unvisitedNodes.delete(current.state);

    const stateChanges = getAvailablStateChanges(current.state, size);

    for (let [key, [cost, p, d]] of stateChanges) {
      const nextDistance = current.distance + cost;
      const nextPath = [...current.path, [key, cost, p, d] as [string, number, string, string]];
      if (allNodes.has(key)) {
        if (unvisitedNodes.has(key)) {
          const nextNode = allNodes.get(key) as Node;

          if (nextDistance < nextNode.distance) {
            nextNode.distance = nextDistance;
            nextNode.path = nextPath;
          }
        }
      }
      else {
        const newNode = makeNode(key, nextDistance, nextPath);
        unvisitedNodes.set(key, newNode);
        allNodes.set(key, newNode);
      }
    }
  }

  return -1;
}

export function part1() {
  const state = parseInput(input);
  return buildAndWalkGraph(state, 2);
}

export function part2() {
  const state = parseInput(input, true);
  return buildAndWalkGraph(state, 4);
}
