import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import FormHistoryPet from './Components/Funcionality/Forms/HistoryPet';
import FormUser from './Components/Funcionality/Forms/User';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/reguser' element={<FormUser />} />
        <Route exact path='/formdescrip' element={<FormHistoryPet/>}/>
      </Routes>
    </div>
  );
}

export default App;
