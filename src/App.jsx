import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import UpdateTurn from "./pages/UpdateTurn";
import CreateTrun from "./pages/CreateTrun";
import ListTurn from "./pages/ListTurn";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/turno/actualizar/:id" element={<UpdateTurn />}></Route>
        <Route path="/turno" element={<CreateTrun />}></Route>
        <Route path="/turnos" element={<ListTurn />}></Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
