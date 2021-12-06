import {input} from './input';

export const meta = {
  maxLoops: 1e15,
  maxMs: 30_000
};

export function part1() {
  const population = input.split(",").map(Number);

  let day = 0;

  while (day < 80) {
    let {length} = population;
    for (let i = 0; i < length; i++) {
      if (population[i] === 0) {
        population[i] = 6;
        population.push(8);
      }
      else {
        population[i]--;
      }
    }

    day++;
  }


  return population.length;
}

// would also work for part 1, but I did that brute force, so I've left it
export function part2() {
  const initial = input.split(",").map(Number);
  let day = 256;

  const countByDaysToSpawn = Array(9).fill(0);
  initial.forEach(age => countByDaysToSpawn[age]++);

  while (day--) {
    const today = countByDaysToSpawn.shift();
    countByDaysToSpawn[8] = today; // new fish
    countByDaysToSpawn[6] += today; // this fish, next time
  }

  return countByDaysToSpawn.reduce((t, n) => (t + n));
}
