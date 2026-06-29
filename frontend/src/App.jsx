import RoutePage from "./routes/Route";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RoutePage />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;