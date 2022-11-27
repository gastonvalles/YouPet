import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { Routes, Route } from "react-router-dom";
import Home from "./Components/View/HomeFake";
import VetDetail from "./Components/Functionality/Details/VetDetail";
import FormHistoryPet from "./Components/Functionality/Forms/HistoryPet";
import FormUser from "./Components/Functionality/Forms/User";
import Navbar from "./Components/Functionality/Navbar";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<VetDetail />} />
        <Route exact path="/reguser" element={<FormUser />} />
        <Route exact path="/formdescrip" element={<FormHistoryPet />} />
        <Route exact path="/navbar" element ={<Navbar/>}/>
      </Routes>
    </div>
  );
}

export default App;
