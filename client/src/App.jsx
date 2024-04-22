import "./App.css";
import { AuthContextProvider } from "../hooks/useDiscord";
import Init from "../components/Init";

function App() {
  return (
    <AuthContextProvider>
      <Init />
    </AuthContextProvider>
  );
}

export default App;
