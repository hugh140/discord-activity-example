import { AuthContextProvider } from "./hooks/useDiscord";
import Board from "./components/Board";
import PlayerTurn from "./components/PlayerTurn";

function App() {
  return (
    <AuthContextProvider>
      <PlayerTurn player={false} />
      <Board />
      <PlayerTurn player={true} />
    </AuthContextProvider>
  );
}

export default App;
