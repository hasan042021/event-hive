import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import Home from "./pages/Home";
import useAuthCheck from "./hooks/useAuthCheck";

function App() {
  const authCheck = useAuthCheck();
  console.log(authCheck);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/*" element={<StudentsOutlet />}> */}
      </Routes>
    </Router>
  );
}

export default App;
