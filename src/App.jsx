import { useState } from 'react';
import GameBoard from './components/GameBoard';
import Player from './components/Player';
import Log from './components/Log';
import { deriveActivePlayer } from './utils/deriveActivePlayer';
import { WINNING_COMBINATIONS } from './winning-combination';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = initialGameBoard;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

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
      winner = firstSquareSybmol;
    }
  }

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        {winner && <p>You won, {winner}</p>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
