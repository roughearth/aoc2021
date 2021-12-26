export const HOME_CHECKS: Record<string, RegExp> = {
  A: /^A*$/,
  B: /^B*$/,
  C: /^C*$/,
  D: /^D*$/
};

export const SAME = /^(.)\1*$/;

export const HOME_ROOMS: Record<string, number> = {
  A: 2,
  B: 4,
  C: 6,
  D: 8
};

export const POD_COSTS: Record<string, number> = {
  A: 1,
  B: 10,
  C: 100,
  D: 1000
};

export const ROOM_SLOTS = Object.values(HOME_ROOMS);
export const HALL_SLOTS = [0, 1, 3, 5, 7, 9, 10];
