

import Home from "./Components/View/HomeFake";
import VetDetail from "./Components/Functionality/Details/VetDetail";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";

import Home from "./Components/View/HomeFake/HomeFake";
import VetDetail from "./Components/Functionality/Details/VetDetail";
import PetDetail from "./Components/Functionality/Details/PetDetail";
import Profile from "./Components/Functionality/Details/UserDetail";
import FormHistoryPet from './Components/Funcionality/Forms/HistoryPet';
import FormUser from './Components/Funcionality/Forms/User';

function App() {
  return (
    <div className="App">
      <Routes>

        <Route path="/" element={<Home/>} />
        <Route path="/:id" element={<VetDetail/>} />
        <Route path="/pet/:id" element={<PetDetail/>}/>
        <Route path="/profile/:id" element={<Profile/>}/>
        <Route exact path='/reguser' element={<FormUser />} />
        <Route exact path='/formdescrip' element={<FormHistoryPet/>}/>
      </Routes>
    </div>
  );
}

export default App;
