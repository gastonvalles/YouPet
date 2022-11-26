import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/View/HomeFake/HomeFake";
import VetDetail from "./Components/Functionality/Details/VetDetail";
import PetDetail from "./Components/Functionality/Details/PetDetail";
import Profile from "./Components/Functionality/Details/UserDetail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/:id" element={<VetDetail/>} />
        <Route path="/pet/:id" element={<PetDetail/>}/>
        <Route path="/profile/:id" element={<Profile/>}/>
      </Routes>
    </div>
  );
}

export default App;
