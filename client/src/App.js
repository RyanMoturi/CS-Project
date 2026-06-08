import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPages from "./pages/AuthPages";
import FundiDash from "./pages/FundiDash";
import ClientDash from "./pages/ClientDash";
import PostJob from "./pages/PostJob";
import MyJobs from "./pages/MyJobs";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPages />} />
        <Route path="/fundi-dashboard" element={<FundiDash />} />
        <Route path="/client-dashboard" element={<ClientDash />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/my-jobs" element={<MyJobs />} />
      </Routes>
    </Router>
  );
}

export default App;