import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../hooks/useDiscord";

function Board() {
  const context = useContext(AuthContext);
  const [matrix, setMatrix] = useState(Array(9).fill(""));

  useEffect(() => {
    context.room?.onMessage("game", (message) => {
      setMatrix(message.matrix);
    });
  }, [context.room]);

  function setSymbol(box) {
    const newMatrix = [...matrix];
    newMatrix[box] = "×";
    setMatrix(newMatrix);
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
              {symbol}
            </div>
          </button>
        ))}
      </div>
    </main>
  );
}
export default Board;
