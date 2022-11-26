

import Home from "./Components/View/HomeFake";
import VetDetail from "./Components/Functionality/Details/VetDetail";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import FormHistoryPet from './Components/Funcionality/Forms/HistoryPet';
import FormUser from './Components/Funcionality/Forms/User';


function App() {
  return (
    <div className="App">
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<VetDetail />} />

        <Route exact path='/reguser' element={<FormUser />} />
        <Route exact path='/formdescrip' element={<FormHistoryPet/>}/>

      </Routes>
    </div>
  );
}

export default App;
