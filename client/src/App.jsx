import { AuthContextProvider } from "./hooks/useDiscord";
import Board from "./components/Board";

function App() {
  return (
    <AuthContextProvider>
      <Board />
    </AuthContextProvider>
  );
}

export default App;
