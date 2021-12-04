import {input} from './input';
import {cleanAndParse} from '../../utils';

export const meta = {};

function parseData(data: {numbers: string, boards: string}) {
  const numbers = input.numbers.split(",").map(Number);
  const boards = new Set(input.boards.split("\n\n").map(initialiseBoard));

  return {numbers, boards};
}

function initialiseBoard(board: string) {
  return cleanAndParse(
    board,
    line => line.split(/\s+/).map(
      number => ({
        number: Number(number),
        marked: false
      })
    )
  );
}
type Board = ReturnType<typeof initialiseBoard>;

function boardWins(board: Board) {
  for (let i = 0; i < 5; i++) {
    if (board[i][0].marked && board[i][1].marked && board[i][2].marked && board[i][3].marked && board[i][4].marked) {
      return true;
    }
    if (board[0][i].marked && board[1][i].marked && board[2][i].marked && board[3][i].marked && board[4][i].marked) {
      return true;
    }
  }
  return false;
}

function markBoard(board: Board, number: number) {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (board[i][j].number === number) {
        board[i][j].marked = true;
      }
    }
  }
}

function getScore(board: Board, call: number) {
  let sum = 0;

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (!board[i][j].marked) {
        sum += board[i][j].number;
      }
    }
  }

  return sum * call;
}

export function part1() {
  const {numbers, boards} = parseData(input);

  for(let number of numbers) {
    for (let board of boards) {
      markBoard(board, number);
      if (boardWins(board)) {
        return getScore(board, number);
      }
    }
  }
  return `no winner`;
}

export function part2() {
  const {numbers, boards} = parseData(input);

  let lastWinningScore = -1;

  for(let number of numbers) {
    for (let board of boards) {
      markBoard(board, number);
      if (boardWins(board)) {
        boards.delete(board);
        lastWinningScore = getScore(board, number);
      }
    }
  }

  return lastWinningScore;
}
