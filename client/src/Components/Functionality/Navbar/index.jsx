import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
import logo from "../../../img/logo.png";
import userPlaceholder from "../../../img/user-placeholder.png";
import {
  // filterVets,
  getServiceByName,
  getServices,
  getUserByName,
  getVetByName
} from "../../../Redux/actions";
import dropMenu from "./dropMenu.module.css";
import "./Navbar.css";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const users = useSelector((state) => state.users);
  const myuser = useSelector((state) => state.myuser);
  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(getServices());
    //dispatch(getVetsDetail(id))
  }, [dispatch, id]);

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
            <ul className="navbar-nav me-auto mb-2 mb-lg-1">
              <div>
                <Link
                  to="/admin"
                  type="button"
                  className="text-decoration-none dropdown-item"
                >
                  Admin
                </Link>
              </div>
              {/* <li className="nav-item dropdown">
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
              </li> */}

              {/* <li className="nav-item">
                <span className="nav-link">Disabled</span>
              </li> */}
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
                🔎
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
          {/* <div>
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
          </div> */}
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

                <>
                  <NavItem img={myuser?.img ? myuser.img : userPlaceholder} navigate={navigate}>
                  </NavItem>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}


function NavItem(props) {
  const [open, setOpen] = useState(false);

  const menuRef = useRef();
  const imgRef = useRef();

  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== imgRef.current) {
      setOpen(false);
    }
  });
  return (
    <li className={dropMenu.nav_item}>
      <img
        src={props.img}
        alt="profilePhoto"
        className={dropMenu.icon_button}
        onClick={() => setOpen(!open)}
        ref={imgRef}
      />

      {open && (
        <div ref={menuRef} className={dropMenu.dropdown}>
          <DropdownMenu navigate={props.navigate} />
        </div>
      )}
    </li>
  );
}

function DropdownMenu(props) {
  const { navigate } = props;

  return (
    <>
      <Link to="/userpanel" className={dropMenu.menu_item}>
        Panel
        <AccountCircleIcon />
      </Link>
      <hr />
      <Link to={"#"}
        onClick={() => {
          localStorage.removeItem("jwt");
          navigate(0);
        }}
        className={dropMenu.menu_item}
      >
        Sign out
        <LogoutIcon />
      </Link>
    </>
  );
}
