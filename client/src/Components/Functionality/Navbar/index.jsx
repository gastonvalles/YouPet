import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link, useParams } from "react-router-dom";
import logo from "../../../img/logo.png";
import { useNavigate } from "react-router";
import {
  filterService,
  // filterVets,
  getServiceByName,
  getServices,
  getUserByName,
  getVetByName,

  //getVetsDetail,
} from "../../../Redux/actions";
import "./index.css";

export default function NavBar() {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  let query = new URLSearchParams(search);
  console.log(query);
  const users = useSelector((state) => state.users);
  const myuser = useSelector((state) => state.myuser);
  console.log(myuser);
  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(getServices());
    //dispatch(getVetsDetail(id))
  }, [dispatch, id]);

  function handleFilter(event) {
    event.preventDefault();
    dispatch(filterService(event.target.value));
    // dispatch(filterVets(event.target.value))
  }

  function handleInputChange(event) {
    event.preventDefault();
    setName(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    dispatch(getServiceByName(name));
    dispatch(getVetByName(name));
    if (users.isAdmin === true) {
      dispatch(getUserByName(name));
    }
    // navigate(`/vet/${id}`)
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
          {/* <div>
            <select
              defaultValue={""}
              className="selectorFiltros"
              onChange={(event) => handleFilter(event)}
            >
              <option value={""}>All Vets</option>
              <option value={"Clinic"}>Healthcare Clinic</option>
              <option value={"Anesthesia"}>
                Surgery and Anesthesia
              </option>
              <option value={"Diagnostics"}>Diagnostics</option>
              <option value={"Aesthetics"}>Aesthetics</option>
            </select>
          </div> */}
          <div>
            <select
              defaultValue={""}
              className="selectorFiltros"
              onChange={(event) => handleFilter(event)}
            >
              <option value={""}>All Services</option>
              <option value={"Healthcare Clinic"}>Healthcare Clinic</option>
              <option value={"Surgery and Anesthesia"}>
                Surgery and Anesthesia
              </option>
              <option value={"Diagnostics"}>Diagnostics</option>
              <option value={"Aesthetics"}>Aesthetics</option>
            </select>
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
