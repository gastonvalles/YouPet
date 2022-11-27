import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getServiceByName, getVetByName, getUserByName} from "../../../Redux/actions"
import { Link } from "react-router-dom";
import logo from "../../../img/logo.png";

export default function NavBar() {
  const dispatch = useDispatch();
  const users = useSelector(state=> state.users)
  const [name, setName] = useState(null);

  function handleInputChange(event) {
    event.preventDefault();
    setName(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    dispatch(getServiceByName(name));
    dispatch(getVetByName(name));
    if(users.isAdmin===true){
      dispatch(getUserByName(name))
    }
    setName(null);
  }

  return (
    <>
      <nav className="navbar navbar-expand-md bg-info">
        <div className="container-fluid">
          <Link className="Link  me-4" to={"/"}>
            <img src={logo} alt="Bootstrap" height="55" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-1">
              <li className="nav-item">
                <Link to={"/"}>
                  <span className="nav-link active me-3" aria-current="page">
                    Home
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/"}>
                  <span className="nav-link active me-3" aria-current="page">
                    Contact
                  </span>
                </Link>
              </li>
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle me-3"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </span>
                <ul className="dropdown-menu">
                  <li>
                    <Link to={"/veterinario"}>
                      <span className="dropdown-item" />1 Option
                    </Link>
                  </li>
                  <li>
                    <Link to={"/nutricionista"}>
                      <span className="dropdown-item" />2 Option
                    </Link>
                  </li>
                  <li></li>
                  <li>
                    <Link to={"/cirugias"}>
                      <span className="dropdown-item" />3 Option
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <span className="nav-link">Disabled</span>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-4"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(event)=>handleInputChange(event)}
              />
              <button className="btn btn-outline-success me-4" type="submit" onClick={(event)=>handleSubmit(event)}>
                Search
              </button>
            </form>
            {/* preguntar si esta logueado o no */}
            <div className="d-flex">
              <Link to={"/login"}>
                <button className="btn"> Sign in</button>
              </Link>
              <Link to={"/reguser"}>
                <button className="btn btn-outline-success me-4">
                  Sign up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}