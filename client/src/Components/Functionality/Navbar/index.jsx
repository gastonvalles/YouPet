import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import logo from "../../../img/logo.png";
import {
  getServiceByName,
  getServices,
  getVetByName
} from "../../../Redux/actions";
import "./Navbar.css";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myuser = useSelector((state) => state.myuser);
  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  function handleInputChange(event) {
    event.preventDefault();
    setName(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    dispatch(getServiceByName(name));
    dispatch(getVetByName(name));
    setName("");
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
              <div>
              {
                myuser?.isAdmin === true ? (
                <Link to="/admin" type="button" className="text-decoration-none dropdown-item">
                  Admin
                </Link>) : null
              }
              </div>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-4"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(event) => handleInputChange(event)}
              />
              <button
                className="btn btn-outline-success me-4"
                type="submit"
                onClick={(event) => handleSubmit(event)}
              >
                Search
              </button>
            </form>
            {/* preguntar si esta logueado o no */}
          </div>
          <div>
            <div className="d-flex">
              {!myuser?.id ? (
                <>
                  <Link to={"/login"}>
                    <button className="btn"> Sign in</button>
                  </Link>
                  <Link to={"/reguser"}>
                    <button className="btn btn-outline-success me-4">
                      Sign up
                    </button>
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    localStorage.removeItem("jwt");
                    navigate(0);
                  }}
                  className="btn"
                >
                  {" "}
                  Sign out
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
