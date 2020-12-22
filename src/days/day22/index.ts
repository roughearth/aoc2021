// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {input, eg1, eg2} from './input';
import {cleanAndParse} from '../../utils';

export const meta = {
  manualStart: true
};

export function part1() {
  const [player1, player2] = parseDeck(input);

  while(player1.cards.size && player2.cards.size) {
    const card1 = player1.cards.pop();
    const card2 = player2.cards.pop();

    if (card1 > card2) {
      player1.cards.push(card1, card2);
    }
    else {
      player2.cards.push(card2, card1);
    }
  }

  let winner = player1;
  if (player2.cards.size) {
    winner = player2;
  }

  // 33925
  return getScore(winner);
}

export function part2() {
  const [player1, player2] = parseDeck(input);

  const winner = playRecursiveGame(player1, player2);

  // 33441
  return getScore(winner);
}

function playRecursiveGame(player1: Player, player2: Player): Player {
  const configHistory = new Set<string>();

  while(player1.cards.size && player2.cards.size) {
    let roundWinner = player1;

    const config = `${player1.cards.configuration}|${player2.cards.configuration}`;

    if (configHistory.has(config)) {
      return player1;
    }
    configHistory.add(config);

    const card1 = player1.cards.pop();
    const card2 = player2.cards.pop();

    if (card1 <= player1.cards.size && card2 <= player2.cards.size) {
      roundWinner = playRecursiveGame(copyPlayer(player1, card1), copyPlayer(player2, card2));
    }
    else if (card1 > card2) {
      roundWinner = player1;
    }
    else {
      roundWinner = player2;
    }

    if (roundWinner.player === 1) {
      player1.cards.push(card1, card2);
    }
    else {
      player2.cards.push(card2, card1);
    }
  }

  if (player1.cards.size) {
    return player1;
  }

  return player2;
}

function getScore(winner: Player) {
  let total = 0;
  let multiplier = winner.cards.size;

  while(winner.cards.size) {
    const card = winner.cards.pop();
    total += (card * multiplier);
    multiplier -= 1;
  }

  return total;
}

function arrayDeck(src: (string | number)[]): Deck {
  const srcItems = src.map(Number);

  return {
    pop(): number {
      const p = srcItems.shift();
      if (!p) {
        throw new Error("Can't pop");
      }
      return p;
    },
    push(a: number, b: number): void {
      srcItems.push(a, b)
    },
    get size() {
      return srcItems.length;
    },
    get configuration() {
      return JSON.stringify(srcItems);
    },
    copy(n: number): Deck {
      const newSrc = [...srcItems].slice(0, n);
      return arrayDeck(newSrc);
    }
  }
}

type Deck = {
  pop: () => number;
  push: (a: number, b: number) => void;
  size: number;
  configuration: string;
  copy: (n: number) => Deck
};

function parseDeck(input: string) {
  const decks = cleanAndParse(input, String, {separator: "\n\n"}).map(
    deck => {
      const [player, ...cards] = cleanAndParse(deck, String);

      return {
        player: Number(player[7]),
        cards: arrayDeck(cards)
      };
    }
  );

  return decks;
}

type Player = ReturnType<typeof parseDeck>[number];

function copyPlayer({player, cards}: Player, n: number): Player {
  return {
    player,
    cards: cards.copy(n)
  }
}
