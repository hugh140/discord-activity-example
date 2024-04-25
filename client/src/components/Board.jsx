import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../hooks/useDiscord";

let symbol = 0;

function Board() {
  const context = useContext(AuthContext);
  const [matrix, setMatrix] = useState(Array(9).fill(0));
  const [turn, setTurn] = useState(null);
  const [move, setMove] = useState(false);

  useEffect(() => {
    context.room?.onMessage("game", (message) => {
      setMatrix(message.matrix);
      setTurn(message.turn);
      symbol = message.symbol;
      console.log(symbol);
    });
  }, [context.room]);

  useEffect(() => {
    context.room?.send("updateMatrix", {
      matrix,
    });
  }, [context.room, move]);

  function setSymbol(box) {
    if (!turn) return;
    const newMatrix = [...matrix];
    newMatrix[box] = symbol;
    setMatrix(newMatrix);
    setTurn(false);
    setMove(!move);
  }

  function matrixSymbols(symbol) {
    switch (symbol) {
      case 0:
        return "";
      case 1:
        return "o";
      case 2:
        return "x";
    }
  }

  return (
    <main className="flex justify-center h-[80vh]">
      <div className="grid grid-cols-3 gap-1 place-content-center">
        {matrix.map((symbol, index) => (
          <button
            key={index}
            className="w-20 h-20 bg-sky-300 rounded-lg relative"
            onClick={() => setSymbol(index)}
          >
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                text-3xl font-extrabold text-sky-800"
            >
              {matrixSymbols(symbol)}
            </div>
          </button>
        ))}
      </div>
      <h1>Turn: {String(turn)}</h1>
    </main>
  );
}
export default Board;
