import { HALL_SLOTS, HOME_CHECKS, HOME_ROOMS, POD_COSTS, ROOM_SLOTS } from "./constants";

export function parseInput(src: string, part2 = false): string {
  const [,, top, bottom] = src.split("\n");

  const state = Array(11).fill('');


  [2, 4, 6, 8].forEach(i => {
    state[i] = `${top[i + 1]}${bottom[i + 1]}`;
  });

  if (part2) {
    state[2] = `${state[2][0]}DD${state[2][1]}`;
    state[4] = `${state[4][0]}CB${state[4][1]}`;
    state[6] = `${state[6][0]}BA${state[6][1]}`;
    state[8] = `${state[8][0]}AC${state[8][1]}`;
  }

  return state.join();
}

export function makeTarget(size: number) {
  return `,,${'A'.repeat(size)},,${'B'.repeat(size)},,${'C'.repeat(size)},,${'D'.repeat(size)},,`;
}

export function makeNode(state: string, distance: number, path: [string, number, string, string][]) {
  return {
    state,
    distance,
    path
  }
}
export type Node = ReturnType<typeof makeNode>;

export function nextUnvisitedNode(unvisitedNodes: Map<string, Node>) {
  let minVal = Number.MAX_SAFE_INTEGER;
  let min: Node | undefined;

  for (let node of unvisitedNodes.values()) {
    if (node.distance < minVal) {
      minVal = node.distance;
      min = node;
    }
  }

  return min;
}

export function getReachableHallSlots(slots: string[], fromSlot: number): number[] {
  const lower = Math.max(...HALL_SLOTS.filter(s => slots[s] && s < fromSlot));
  const higher = Math.min(...HALL_SLOTS.filter(s => slots[s] && s > fromSlot));

  return HALL_SLOTS.filter(s => s > lower && s < higher);
}

export function canGoHome(pod: string, slot: number, slots: string[]) {
  const homeSlot = HOME_ROOMS[pod];

  // home slot is improperly occupied
  if (!HOME_CHECKS[pod].test(slots[homeSlot])) {
    return false;
  }

  const lo = Math.min(slot, homeSlot);
  const hi = Math.max(slot, homeSlot);

  // would have to overtake to reach
  for (let hs of HALL_SLOTS) {
    if (
      slots[hs] &&
      (hs > lo) &&
      (hs < hi)
    ) {
      return false;
    }
  }

  return true;
}

export function isHome(pod: string, slot: number) {
  return slot === HOME_ROOMS[pod[0]] && HOME_CHECKS[pod[0]].test(pod);
}

export function getNextState(slots: string[], fromSlot: number, toSlot: number, size: number): [string, [number, string, string]] {
  const nextSlots = [...slots];
  const podToMove = nextSlots[fromSlot][0];
  nextSlots[fromSlot] = nextSlots[fromSlot].substring(1);
  nextSlots[toSlot] = `${podToMove}${nextSlots[toSlot]}`;

  let direction: string;

  let steps = Math.abs(fromSlot - toSlot) + 1 + size;
  if (ROOM_SLOTS.includes(fromSlot)) {
    steps -= slots[fromSlot].length;
    direction = "hall";
  }
  else {
    steps -= nextSlots[toSlot].length;
    direction = "home";
  }

  const nextState = nextSlots.join();

  return [nextState, [steps * POD_COSTS[podToMove], podToMove, direction]];
}

export function getOccupiedSlots(slots: string[]) {
  return slots.flatMap((s, i) => s ? [[s, i]] : []) as unknown as [string, number][];
}

export function getAvailablStateChanges(state: string, size: number) {
  const slots = state.split(",");
  const occupied = getOccupiedSlots(slots);

  const stateChanges = new Map<string, [number, string, string]>();

  for (let [pods, slot] of occupied) {
    if (ROOM_SLOTS.includes(slot)) {
      if (!isHome(pods, slot)) {
        // can move the first occupant to every available hall slot
        const reachableHallSlots = getReachableHallSlots(slots, slot);

        for (let hallSlot of reachableHallSlots) {
          stateChanges.set(...getNextState(slots, slot, hallSlot, size));
        }
      }
    }
    else {
      // can move to home room if its empty or only occupied by matching amphipod
      if (canGoHome(pods, slot, slots)) {
        stateChanges.set(...getNextState(slots, slot, HOME_ROOMS[pods], size));
      }
    }
  }

  // console.log(nextStates.size);

  return stateChanges;

}
