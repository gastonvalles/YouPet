import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import FormUser from './Components/Funcionality/Forms/User';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<FormUser/>} />
      </Routes>
    </div>
  );
}

export default App;
