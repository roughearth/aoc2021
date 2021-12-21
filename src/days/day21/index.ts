import {input} from './input';
import {generateArray} from '../../utils';

export const meta = {};

function wrap(n: number, m: number) {
  let w = n % m;

  if (w === 0) {
    return m;
  }

  return w;
}

export function part1() {
  // the VERY naive, long-handed way, with loads of copy-paste
  let [p1, p2] = input;
  let s1 = 0;
  let s2 = 0;
  let d = 1;
  let c = 0;

  while (s1 < 1000 && s2 < 1000) {
    let m = (3 * d) + 3;
    c += 3;

    if (d === 99) {
      m = 200;
    }
    if (d === 100) {
      m = 103;
    }

    p1 = wrap(p1 + m, 10);

    s1 += p1;

    if (s1 >= 1000) {
      return c * s2;
    }

    d = wrap(d + 3, 100);

    m = (3 * d) + 3;
    c += 3;

    if (d === 99) {
      m = 200;
    }
    if (d === 100) {
      m = 103;
    }

    p2 = wrap(p2 + m, 10);
    s2 += p2;

    if (s2 >= 1000) {
      return s1 * c;
    }

    d = wrap(d + 3, 100);
  }

  return -1;
}

// 4d array of [pos1][score1][pos2][score2] where the value is number of games in that state
// posN is [1..10] (0 is ignored) - 11 items
// max score is 20, so scoreN is [0...20] - 21 items
type State = number[][][][];

function makeStateStore(): State {
  return generateArray(
    11, () => generateArray(
      21, () => generateArray(
        11, () => Array(21).fill(0)
      )
    )
  );
}

const dieCounts = [
  // score, count
  [3, 1],
  [4, 3],
  [5, 6],
  [6, 7],
  [7, 6],
  [8, 3],
  [9, 1]
];


function* states() {
  for(let pos1 = 1; pos1 <= 10; pos1++) {
    for(let score1 = 0; score1 <= 20; score1++) {
      for(let pos2 = 1; pos2 <= 10; pos2++) {
        for(let score2 = 0; score2 <= 20; score2++) {
          yield [pos1, score1, pos2, score2];
        }
      }
    }
  }
}

function numberGames(state: State) {
  let t = 0;
  for(let [p1, s1, p2, s2] of states()) {
    const c = state[p1][s1][p2][s2];
    t += c;
  }

  return t;
}

function nextState(currentState: State, wins1: number, wins2: number): [State, number, number, number] {
  const nextState = makeStateStore();

  for(let [p1, s1, p2, s2] of states()) {
    const prevCount = currentState[p1][s1][p2][s2];

    if (prevCount > 0) {
      for (let [roll1, count1] of dieCounts) {
        const nextP1 = wrap(p1 + roll1, 10);
        const nextS1 = s1 + nextP1;

        if(nextS1 >= 21) {
          wins1 += count1 * prevCount;
        }
        else {
          for (let [roll2, count2] of dieCounts) {
            const nextP2 = wrap(p2 + roll2, 10);
            const nextS2 = s2 + nextP2;

            if(nextS2 >= 21) {
              wins2 += count2 * prevCount;
            }
            else {
              nextState[nextP1][nextS1][nextP2][nextS2] += count1 * count2 * prevCount;
            }
          }
        }
      }
    }
  }

  const remainingGames = numberGames(nextState);

  return [nextState, remainingGames, wins1, wins2];
}

export function part2() {
  const [p1, p2] = input;

  let state = makeStateStore();
  state[p1][0][p2][0] = 1; // initial game state

  let wins1 = 0;
  let wins2 = 0;
  let remaingGames = 1; // === numberGames(state) at this point

  while (remaingGames > 0) {
    [state, remaingGames, wins1, wins2] = nextState(state, wins1, wins2);
  }

  const ans = Math.max(wins1, wins2);

  return ans;
}
