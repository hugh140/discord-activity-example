import { AuthContextProvider } from "./hooks/useDiscord";
import Board from "./components/Board";
import PlayerTurn from "./components/PlayerTurn";
import { GameProvider } from "./hooks/useGameProvider";

function App() {
  return (
    <AuthContextProvider>
      <GameProvider>
        <PlayerTurn player={false} />
        <Board />
        <PlayerTurn player={true} />
      </GameProvider>
    </AuthContextProvider>
  );
}

export default App;