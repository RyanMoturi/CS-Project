import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPages from "./pages/AuthPages";
import FundiDash from "./pages/FundiDash";
import ClientDash from "./pages/ClientDash";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPages />} />
        <Route path="/fundi-dashboard" element={<FundiDash />} />
        <Route path="/client-dashboard" element={<ClientDash />} />
      </Routes>
    </Router>
  );
}

export default App;