import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ColorModeContext, tokens, useMode } from "../../theme";
import {
  Box,
  CssBaseline,
  ThemeProvider,
  Typography,
  useTheme,
  Grid,
} from "@mui/material";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

import Header from "../../Header";
import { getServiceDetail } from "../../../../../Redux/actions";

export default function AdminServiceDetail() {
  const {id} = useParams();
  const theeme = useTheme();
  const colors = tokens(theeme.palette.mode);
  const dispatch = useDispatch();
  const service = useSelector((state) => state.serviceDetail);
  const [theme, colorMode] = useMode();

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
          {service && (
            <Box p="10px">
            <img src={service.img} alt="service pic"/>
            </Box>
          )
          }
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
