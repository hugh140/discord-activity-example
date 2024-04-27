import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../hooks/useDiscord";
import { GameContext } from "../hooks/useGameProvider";
import ReadyPanel from "./ReadyPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faO } from "@fortawesome/free-solid-svg-icons";
import TurnIndicator from "./TurnIndicator";
import Winner from "./Winner";

function Board() {
  const context = useContext(AuthContext);
  const game = useContext(GameContext);
  const [move, setMove] = useState(false);
  const [gameOver, setGameOver] = useState("");

  useEffect(() => {
    context.room?.onMessage("victory", (message) => {
      game.setTurn(false);
      setGameOver(message.text);
    });
  }, [context.room]);

  useEffect(() => {
    context.room?.send("updateMatrix", {
      matrix: game.matrix,
    });
  }, [context.room, move]);

  function setSymbol(box) {
    if (!game.turn) return;
    const newMatrix = [...game.matrix];
    if (game.matrix[box] !== 0) return;

    newMatrix[box] = game.symbol;
    game.setMatrix(newMatrix);
    game.setTurn(false);
    setMove(!move);
  }

  function matrixSymbols(symbol) {
    switch (symbol) {
      case 0:
        return "";
      case 1:
        return <FontAwesomeIcon icon={faO} />;
      case 2:
        return <FontAwesomeIcon icon={faX} />;
    }
  }

  return (
    <main className="flex justify-center h-screen">
      <div className="grid grid-cols-3 gap-1 place-content-center">
        {game?.matrix.map((symbol, index) => (
          <button
            key={index}
            className="w-14 h-14 md:w-20 md:h-20 bg-sky-900 rounded-lg relative"
            onClick={() => setSymbol(index)}
          >
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                text-3xl font-extrabold text-white"
            >
              {matrixSymbols(symbol)}
            </div>
          </button>
        ))}
      </div>
      <ReadyPanel turn={game.turn} />
      <TurnIndicator turn={game.turn} />
      <Winner over={gameOver} set={setGameOver} />
    </main>
  );
}
export default Board;
