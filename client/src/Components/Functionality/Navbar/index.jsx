import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../img/logo.png"

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-md bg-info">
        <div className="container-fluid" >
          <Link className="Link  me-4" to={"/Home"}>
            <img
              src={logo}
              alt="Bootstrap"
              height="55"
            />
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
                <Link className="Link" to={"/Home"}>
                  <span className="nav-link active me-3" aria-current="page">
                    Home
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="Link" to={"/Home"}>
                  <span className="nav-link active me-3" aria-current="page">
                    Contac
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
                    <Link className="Link" to={"/veterinario"}>
                      <span className="dropdown-item" />
                      1 Option
                    </Link>
                  </li>
                  <li>
                    <Link className="Link" to={"/nutricionista"}>
                      <span className="dropdown-item" />
                      2 Option
                    </Link>
                  </li>
                  <li>
                  </li>
                  <li>
                    <Link className="Link" to={"/cirugias"}>
                      <span className="dropdown-item" />
                      3 Option
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link">Disabled</a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-4"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
