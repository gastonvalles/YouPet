import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import Home from "./Components/View/HomeFake/HomeFake";
import VetDetail from "./Components/Functionality/Details/VetDetail";
import PetDetail from "./Components/Functionality/Details/PetDetail";
import Profile from "./Components/Functionality/Details/UserDetail";
import FormHistoryPet from './Components/Functionality/Forms/HistoryPet';
import FormUser from './Components/Functionality/Forms/User';
import "./App.css";
import ServiceDetail from './Components/Functionality/Details/ServiceDetail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/vet/:id" element={<VetDetail/>} />
        <Route path="/pet/:id" element={<PetDetail/>}/>
        <Route path="/profile/:id" element={<Profile/>}/>
        <Route exact path='/reguser' element={<FormUser />} />
        <Route exact path='/formdescrip' element={<FormHistoryPet/>}/>
        <Route path="/service/:id" element={<ServiceDetail/>}/>
      </Routes>
    </div>
  );
}

export default App;
