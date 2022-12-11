import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router"
import { ColorModeContext, useMode } from "../../theme";
import { Box, CssBaseline, ThemeProvider, Grid } from "@mui/material";

import Header from "../../Header";
import { deleteService, getServiceDetail } from "../../../../../Redux/actions";

export default function AdminServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const service = useSelector((state) => state.serviceDetail);
  const [theme, colorMode] = useMode();

  function delService() {
    dispatch(deleteService(id));
    var respuesta = window.confirm("Confirm delete?");
    if (respuesta) alert("Service deleted");
    else alert("You are not allowed to delete");
    navigate("/admin/services");
  }

  useEffect(() => {
    dispatch(getServiceDetail(id));
  }, [dispatch, id]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box>
          <Box p="20px">
            <Link
              to="/admin/users"
              type="button"
              className="text-decoration-none"
            >
              Back to users
            </Link>
          </Box>
          <Header title="Services" subtitle="Managing the services" />
        </Box>
        <Box>
          <Box p="10px">
            <img
              src={service.img}
              alt="service pic"
              width="500px"
              height="350px"
            />
            <h3>{service.name}</h3>
          </Box>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Box>
              <Grid item lg={3}>
                  <Box>
                    <h3>Type:</h3>
                    <h3>{service.type}</h3>
                  </Box>
              </Grid>
              <Grid item lg={3}>
                <Box>
                  <h3>Price:</h3>
                  <h3>{service.price}</h3>
                </Box>
              </Grid>
              <Grid item lg={3}>
                <Box>
                  <h3>Timelapse:</h3>
                  <h3>{service.timelapse}</h3>
                </Box>
              </Grid>
              <Grid item lg={8}>
                <Box m="200px">
                  <h3>Detail:</h3>
                  <h3>{service.detail}</h3>
                </Box>
              </Grid>
            </Box>
          </Grid>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
