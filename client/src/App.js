import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/View/HomeFake";
import VetDetail from "./Components/Functionality/Details/VetDetail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<VetDetail />} />
      </Routes>
    </div>
  );
}

export default App;
