import { gameSymbols } from '../constants/gameSymbols';

export const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = gameSymbols.X;

  if (gameTurns.length > 0 && gameTurns[0].player === gameSymbols.X) {
    currentPlayer = gameSymbols.O;
  }

  return currentPlayer;
};
