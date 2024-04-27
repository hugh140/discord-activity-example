import { useEffect, createContext, useContext, useState } from "react";
import { AuthContext } from "./useDiscord";
import PropTypes from "prop-types";
import Loader from "../components/Loader";

let symbol = 0;
const GameContext = createContext();

function useGame() {
  const context = useContext(AuthContext);
  const [turn, setTurn] = useState(null);
  const [matrix, setMatrix] = useState(Array(9).fill(0));

  useEffect(() => {
    context.room?.onMessage("game", (message) => {
      setMatrix(message.matrix);
      setTurn(message.turn);
      symbol = message.symbol;
    });
  }, [context.room]);

  return { turn, setTurn, matrix, setMatrix, symbol };
}

function GameProvider({ children }) {
  const context = useContext(AuthContext);
  const [loader, setLoader] = useState(true);
  const game = useGame();

  useEffect(() => {
    if (context.auth) setLoader(false);
  }, [context.auth]);
  console.log(context);

  return !loader ? (
    <GameContext.Provider value={game}>{children}</GameContext.Provider>
  ) : (
    <Loader />
  );
}

GameProvider.propTypes = {
  children: PropTypes.any,
};

export { GameProvider, GameContext };
