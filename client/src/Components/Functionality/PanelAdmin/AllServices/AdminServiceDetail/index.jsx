import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ColorModeContext, useMode } from "../../theme";
import {
  Box,
  CssBaseline,
  Typography,
  ThemeProvider,
  Grid,
} from "@mui/material";
import Header from "../../Header";
import { getServiceDetail, clearDetails } from "../../../../../Redux/actions";

export default function AdminServiceDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const service = useSelector((state) => state.serviceDetail);
  const [theme, colorMode] = useMode();

  useEffect(() => {
    dispatch(getServiceDetail(id));
    return () => {
      dispatch(clearDetails());
    };
  }, [dispatch, id]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box>
          <Box p="20px">
            <Link
              to="/admin/services"
              type="button"
              className="text-decoration-none"
            >
              Back to services
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
            <Typography variant="h2" sx={{ m: "10px 0 5px 0" }}>
              {service.name}
            </Typography>
          </Box>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item lg={2}>
              <Box p="10px">
                <Typography variant="h3" sx={{ m: "10px 0 5px 0" }}>
                Type: {service.type}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={2}>
              <Box p="10px">
                <Typography variant="h3" sx={{ m: "10px 0 5px 0" }}>
                 Price: $ {service.price}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={2}>
              <Box p="10px">
                <Typography variant="h3" sx={{ m: "10px 0 5px 0" }}>
                Timelapse: {service.timelapse} min
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={8}>
              <Box p="10px">
              <Typography variant="h3" sx={{ m: "10px 0 5px 0" }}>
                  Detail:
                </Typography>
                <Typography variant="h3" sx={{ m: "10px 0 5px 0" }}>
                  {service.detail}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
