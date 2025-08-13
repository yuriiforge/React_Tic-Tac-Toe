import { WINNING_COMBINATIONS } from '../winning-combination';

export const deriveWinner = (gameBoard, players) => {
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSybmol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSybmol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSybmol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSybmol &&
      firstSquareSybmol === secondSquareSybmol &&
      firstSquareSybmol === thirdSquareSybmol
    ) {
      winner = players[firstSquareSybmol];
    }
  }

  return winner;
};
