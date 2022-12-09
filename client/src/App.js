import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import PetDetail from "./Components/Functionality/Details/PetDetail";
import ServiceDetail from "./Components/Functionality/Details/ServiceDetail";
import Profile from "./Components/Functionality/Details/UserDetail";
import VetDetail from "./Components/Functionality/Details/VetDetail";
import FormHistoryPet from "./Components/Functionality/Forms/HistoryPet";
import Login from "./Components/Functionality/Forms/Login";
import FormPet from "./Components/Functionality/Forms/Pet";
import FormUser from "./Components/Functionality/Forms/User";
import FormVet from "./Components/Functionality/Forms/Vet";
import NavBar from "./Components/Functionality/Navbar/index";

import Payment from "./Components/Functionality/Payment";
import ErrorPay from "./Components/Functionality/Payment/ErrorPay";

import AdminServiceDetail from "./Components/Functionality/PanelAdmin/AllServices/AdminServiceDetail";
import PanelAdmin from "./Components/Functionality/PanelAdmin/Body/PanelAdmin";
import AdminProfileDetail from "./Components/Functionality/PanelAdmin/Users/Detail";

import ChooseVetTurn from "./Components/Functionality/Turns/ChooseVetTurn";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Home from "./Components/View/HomeFake/HomeFake";
import { getMyUser } from "./Redux/actions";
import AdminVetDetail from "./Components/Functionality/PanelAdmin/VetInformation/VetDetail";

import Headerl from "./Components/layout/Headerl";
import * as storage from "./utils/storage"
import UserLogued from "./Components/UserLogued/index"
import LoginButton from "./Components/LoginButton/index"
import GoogleLogin from 'react-google-login';
import {gapi} from 'gapi-script';



function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyUser());
  }, [dispatch]);

  const [user, setUser]= useState (null);

  const onLogin = (user) => {
    //almacenar localStorage
    storage.setUser(user)
    setUser(user);
  }

  const onLogout = () => {
    storage.clear();
    setUser(null);
  };

  const clientID="1039930117494-6e72hj0uf19lm0aloue7asbr3gpspeo1.apps.googleusercontent.com";

 
  const onSuccess = (response) =>{
    console.log(response)
    console.log(response.profileObj)
  }

  const onFailure = () =>{
    console.log("Something went wrong")
  }


  useEffect(()=>{
    const checkSession = () =>{
      const user = storage.getUser();//leer el user de storage
      if(user){
        setUser(user)
      }
    }
    checkSession();
  },[])

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vet/:id" element={<VetDetail />} />
        <Route path="/pet/:id" element={<PetDetail />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/service/:id" element={<ServiceDetail />} />
        <Route path="/service/:servId/turn" element={<ChooseVetTurn />} />
        <Route exact path="/reguser" element={<FormUser />} />
        <Route exact path="/formdescrip" element={<FormHistoryPet />} />
        <Route exact path="/pet/register" element={<FormPet />} />
        <Route exact path="/vet/register" element={<FormVet />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/mp" element={<Payment />} />
        <Route exact path="/errorPay" element={<ErrorPay />} />
        <Route path="/user/:id" element={<AdminProfileDetail />} />
        <Route path="/serv/:id" element={<AdminServiceDetail />} />
        <Route path="/admin/*" element={<PanelAdmin />} />
        {/* <Route path="/confirm/:confirmationCode" element={<Confirm />} /> */}
      </Routes>
     
     <div className="container-fuild">
     <Headerl>
      {user && <UserLogued user ={ user} onLogout={onLogout} />}

     </Headerl>
    <div className="row" style={{padding: '24px 16px'}}>
     {!user && <LoginButton onLogin={onLogin}/>}
     {user &&  <Profile />  } 
     </div>


     <GoogleLogin
    clientId={clientID}
    buttonText="Start section with Google"
    onSuccess={onSuccess} 
    onFailure={onFailure}
    cookiePolicy={'single_host_origin'}
  />


     </div>
    </div>
  );
}

export default App;
