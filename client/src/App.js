import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import PetDetail from "./Components/Functionality/Details/PetDetail";
import ServiceDetail from "./Components/Functionality/Details/ServiceDetail";
import Profile from "./Components/Functionality/Details/UserDetail";
import VetDetail from "./Components/Functionality/Details/VetDetail";
import FormHistoryPet from "./Components/Functionality/Forms/HistoryPet";
import Login from './Components/Functionality/Forms/Login';
import FormPet from "./Components/Functionality/Forms/Pet";
import FormUser from "./Components/Functionality/Forms/User";
import FormVet from "./Components/Functionality/Forms/Vet";
import NavBar from "./Components/Functionality/Navbar/index";
import PanelAdmin from "./Components/Functionality/PanelAdmin/Body/PanelAdmin";
// import Dashboard from "./Components/Functionality/PanelAdmin/Dashboard";
// import Users from "./Components/Functionality/PanelAdmin/Users";
import ChooseVetTurn from "./Components/Functionality/Turns/ChooseVetTurn";
import TakeTurn from "./Components/Functionality/Turns/TakeTurn";
import Home from "./Components/View/HomeFake/HomeFake";
// import TopBar
//  from "./Components/Functionality/PanelAdmin/TopBar";

//  import SideBar from "./Components/Functionality/PanelAdmin/SideBar";
//  import { CssBaseline, ThemeProvider } from "@mui/material";
//  import { ColorModeContext, useMode } from "./Components/Functionality/PanelAdmin/theme";

function App() {
  // const [theme, colorMode] = useMode();
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vet/:id" element={<VetDetail />} />
        <Route path="/pet/:id" element={<PetDetail />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/service/:id" element={<ServiceDetail />} />
        <Route path="/service/:servId/vet" element={<ChooseVetTurn />} />
        <Route path="/service/:servId/vet/:vetId/turn" element={<TakeTurn />} />
        <Route exact path="/reguser" element={<FormUser />} />
        <Route exact path="/formdescrip" element={<FormHistoryPet />} />
        <Route exact path="/pet/register" element={<FormPet />} />
        <Route exact path="/vet/register" element={<FormVet />} />
        <Route exact path='/login' element={<Login />} />
        <Route path="/admin/*" element={<PanelAdmin/>}/>

        {/* <ColorModeContext.Provider value={colorMode}>




      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        <Route path="/admin" element={<SideBar/>}/>
          
          <main className="content">
          <Route path="/admin" element={<TopBar/>}/>
            {/* <TopBar/> */}
          
            {/* <Dashboard/>
            <Users />  */}
            {/* <Route path="/admin" element={<PanelAdmin/>}/>
            <Route path="/admin/dashboard" element={<Dashboard />} /> 
            <Route path="/admin/users" element={<Users />} />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider> */}



      
      </Routes>
    </div>
  );
}

export default App;
