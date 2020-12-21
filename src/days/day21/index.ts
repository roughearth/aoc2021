// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {input, eg1} from './input';
import {cleanAndParse} from '../../utils';

export function part1() {
  const parsedData = parseInput(input);
  const {inertIngredients} = getInertIngredients(parsedData);

  let totalFound = 0;
  for (const food of parsedData.foods) {
    for (const ingredient of food.ingredientArray) {
      if (inertIngredients.has(ingredient)) {
        totalFound++;
      }
    }
  }

  // 1977
  return totalFound;
}

export function part2() {
  const parsedData = parseInput(input);

  const {candidateIngredientsByAllergen} = getInertIngredients(parsedData);

  reduce(candidateIngredientsByAllergen);

  const dangerousIngredients = Array.from(candidateIngredientsByAllergen.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, i]) => Array.from(i)[0]);

  // dpkvsdk,xmmpt,cxjqxbt,drbq,zmzq,mnrjrf,kjgl,rkcpxs
  return dangerousIngredients.join(",");
}

function reduce(ingredients: Map<string, Set<string>>) {
  let choices = ingredients;

  while (choices.size) {
    let entries = Array.from(choices.entries());

    let decided = entries.filter(([k, s]) => s.size === 1);
    let undecided = entries.filter(([k, s]) => s.size !== 1);

    undecided.forEach(([k, set]) => {
      decided.forEach(([k, d]) => {
        set.delete(Array.from(d)[0]);
      })
    });

    choices = new Map(undecided);
  }
}


function getInertIngredients({foods, allIngredients, allAllergens}: ParsedData) {
  const candidateIngredientsByAllergen = new Map<string, Set<string>>()

  for(const allergen of allAllergens) {
    const ingredientSieve = new Set(allIngredients);

    for(const food of foods) {
      if (food.allergenArray.includes(allergen)) {
        for(const ingredient of ingredientSieve) {
          if (!food.ingredientArray.includes(ingredient)) {
            ingredientSieve.delete(ingredient)
          }
        }
      }
    }

    candidateIngredientsByAllergen.set(allergen, ingredientSieve);
  }

  const inertIngredients = new Set(allIngredients);
  for(const ingredients of candidateIngredientsByAllergen.values()) {
    for(const ingredient of ingredients) {
      inertIngredients.delete(ingredient);
    }
  }

  return {inertIngredients, candidateIngredientsByAllergen};
}

function parseInput(input: string) {
  const allIngredients = new Set<string>();
  const allAllergens = new Set<string>();

  const foods = cleanAndParse(input, line => {
    const [rawIngredients, rawAllergens] = line.slice(0, -1).split(" (contains ");
    const ingredientArray = rawIngredients.split(" ");
    const allergenArray = rawAllergens.split(", ");

    ingredientArray.forEach(i => allIngredients.add(i));
    allergenArray.forEach(a => allAllergens.add(a));

    return {
      src: line,
      ingredientArray,
      allergenArray
    }
  });

  return {
    foods,
    allAllergens,
    allIngredients
  }
}

type ParsedData = ReturnType<typeof parseInput>
