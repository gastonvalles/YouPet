import React from "react";
import { Box } from "@mui/material";
import Header from "../../Header";
import petStyle from "./pets.module.css";
import petPlaceholder from "../../../../../img/pets.png";

function MyPets() {
  return (
    <Box m="20px">
      <Box>
        <Header title="MyPets" subtitle="Here we show all your pets" />
      </Box>
      <Box>
        <div>
          <div className="container my-5">
            <div className="shadow-4 rounded-5 overflow-hidden">
              <table className="table align-middle mb-0 bg-white">
                <thead className="bg-light">
                  <tr>
                    <th>Name</th>
                    <th>Species</th>
                    <th>Detail</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={petPlaceholder}
                          alt="petImg"
                          className={"rounded-circle " + petStyle.tableImg}
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
                      <button type="button" className="btn btn-sm btn-rounded">
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

          <div>
            <div className="card text-bg-secondary">
              <div className="">
                <h1>Un perro</h1>
                <h4>Species: perrete</h4>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
}

export default MyPets;
