import React from "react";
import { Box } from "@mui/material";
import Header from "../Header";
import userPlaceholder from "../../../../img/user-placeholder.png";
import loadingSvg from "../../../../img/loading_dualring.svg";
import petPlaceholder from "../../../../img/pets.png";

import infoStyle from "./info.module.css";
import { useSelector } from "react-redux";

export default function Info() {
  const myuser = useSelector((state) => state.myuser);
  const myturns = useSelector((state) => state.turns);

  return (
    <Box m="20px">
      <Box>
        <Header title="Info" subtitle="Welcome" />
      </Box>
      <Box>
        {myuser?.id ? (
          <div className={infoStyle.container}>
            <div className={infoStyle.card}>
              <div className={infoStyle.img_container}>
                <img
                  src={myuser.img ? myuser.img : userPlaceholder}
                  alt="User"
                  className={infoStyle.img_user}
                />
              </div>
              <div className="mt-3">
                <h4>
                  {myuser.name ? myuser.name : "none"}{" "}
                  {myuser.lastname ? myuser.lastname : ""}
                </h4>
                <p className="text-secondary mb-1">Youpet user</p>
              </div>
            </div>

            <div className={infoStyle.card}>
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Username</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {myuser.username ? myuser.username : "none"}{" "}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Email</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {myuser.email ? myuser.email : "none"}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">DNI</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {myuser.dni ? myuser.dni : "none"}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Phone</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {myuser.tel ? myuser.tel : "none"}
                </div>
              </div>
              <hr />

              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Address</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {myuser.address ? myuser.address : "none"}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <img src={loadingSvg} alt="profile" />
        )}

        <Box>
          {myturns?.length ? (
            <div>
              <div className="container my-5">
                <h4>Turns</h4>
                <div className="shadow-4 rounded-5 overflow-hidden">
                  <table className="table align-middle mb-0 bg-white">
                    <thead className="bg-light">
                      <tr>
                        <th>Id</th>
                        <th>Pet</th>
                        <th>Vet</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={petPlaceholder}
                              alt="petImg"
                              className={"rounded-circle " + infoStyle.tableImg}
                            />
                            <div className="ms-3">
                              <p className="fw-bold mb-1">John Doe</p>
                            </div>
                          </div>
                        </td>

                        <td>
                          <p>Especie</p>
                        </td>

                        <td>
                          <p>detalle</p>
                        </td>

                        <td>
                          <button
                            type="button"
                            className="btn btn-sm btn-rounded"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="btn btn-sm btn-rounded btn-danger"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className={infoStyle.turnsContainer}>
              <div className="container my-5">
                <h4>Turns</h4>
                <div className="shadow-4 rounded-5 overflow-hidden">
                  <table className="table align-middle mb-0 bg-white">
                    <thead className="bg-light">
                      <tr>
                        <th>Id</th>
                        <th>Pet</th>
                        <th>Vet</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <p>0</p>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={petPlaceholder}
                              alt="petImg"
                              className={"rounded-circle " + infoStyle.tableImg}
                            />
                            <div className="ms-3">
                              <p className="fw-bold mb-1">No turns</p>
                            </div>
                          </div>
                        </td>

                        <td>
                          <p></p>
                        </td>

                        <td>
                          <p></p>
                        </td>

                        <td>
                          <p></p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </Box>
      </Box>
    </Box>
  );
}
