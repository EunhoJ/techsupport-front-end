import Paths from "./routes/Paths";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Paths />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
