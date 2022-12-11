import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { ColorModeContext, tokens, useMode } from "../../theme";
import {
  Box,
  CssBaseline,
  ThemeProvider,
  Typography,
  useTheme,
  Grid,
  Button
} from "@mui/material";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

import Header from "../../Header";
import {
  clearDetails,
  deleteAdmin,
  getAdminDetail,
  getUserDetail,
  updateAdmin,
  updateUser
} from "../../../../../Redux/actions";

export default function AdminProfileDetail() {
  const theeme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theeme.palette.mode);
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userDetail);
  const admin = useSelector((state) => state.adminDetail);
  const [theme, colorMode] = useMode();

  function handleAccessAdmin() {
    if (admin.isAdmin === true) {
      let payload = { isAdmin: false };
      dispatch(updateAdmin(id, payload));
    } else {
      let payload = { isAdmin: true };
      dispatch(updateAdmin(id, payload));
    }
    navigate(0);
  }

  function handleStatusAdmin() {
    if (admin.isActive === true) {
      let payload = { isActive: false };
      dispatch(updateAdmin(id, payload));
    } else {
      let payload = { isActive: true };
      dispatch(updateAdmin(id, payload));
    }
    navigate(0);
  }

  function handleStatusUser() {
    if (user.isActive === true) {
      let payload = { isActive: false };
      dispatch(updateUser(id, payload));
    } else {
      let payload = { isActive: true };
      dispatch(updateUser(id, payload));
    }
    navigate(0);
  }

  function handleAccessUser() {
    if (user.isAdmin === true) {
      let payload = { isAdmin: false };
      dispatch(updateUser(id, payload));
    } else {
      let payload = { isAdmin: true };
      dispatch(updateUser(id, payload));
    }
    navigate(0);
  }
  function delAdmin() {
    dispatch(deleteAdmin(id));
    var respuesta = window.confirm("Confirm delete?");
    if (respuesta) alert("Vet deleted");
    else alert("You are not allowed to delete");
    navigate("/admin/users");
  }

  useEffect(() => {
    dispatch(getUserDetail(id));
    dispatch(getAdminDetail(id));
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
            to="/admin/users"
            type="button"
            className="text-decoration-none"
          >
            Back to users
          </Link>
          </Box>
          <Box m="20px">
            <Header title="USER" subtitle="Managing user" />
          </Box>
          <Box>
            {user.id && (
              <Box m="20px">
                <Box p="60px">
                  <img src={user.img} alt="user pic" />
                </Box>
                <Box p="30px">
                  <h3>
                    {user.name} {user.lastname}
                  </h3>
                </Box>
                <Grid container spacing={10} alignItems="center" justifyContent="center">
                  <Grid item lg={3}>
                    <Box>
                      <h3>Username:</h3>
                      <h3>{user.username}</h3>
                    </Box>
                  </Grid>
                  <Grid item lg={3}>
                    <Box>
                      <h3>Telephone Number:</h3>
                      <h3>{user.tel}</h3>
                    </Box>
                  </Grid>
                  <Grid item lg={3}>
                    <Box>
                      <h3>Email:</h3>
                      <h3>{user.email}</h3>
                    </Box>
                  </Grid>
                  <Grid item lg={3}>
                    <Box>
                      <h3>DNI: {user.dni}</h3>
                    </Box>
                  </Grid>
                  <Grid item lg={3}>
                    <Box>
                      <Box
                        width="15%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                          user.isActive === true
                            ? colors.greenAccent[600]
                            : colors.redAccent[700]
                        }
                        borderRadius="4px"
                        type="button"
                        onClick={(event)=>handleStatusUser(event)}
                      >
                        {user.isActive === true && (
                          <AdminPanelSettingsOutlinedIcon />
                        )}
                        {user.isActive === false && <LockOpenOutlinedIcon />}
                      </Box>
                      <Typography variant="h4" sx={{ m: "10px 0 5px 0" }}>
                        Is Active
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item lg={3}>
                    <Box>
                      <Box
                        width="15%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                          user.isAdmin === true
                            ? colors.greenAccent[600]
                            : colors.redAccent[700]
                        }
                        borderRadius="4px"
                        type="button"
                        onClick={(event)=>handleAccessUser(event)}
                      >
                        {user.isAdmin === true && (
                          <AdminPanelSettingsOutlinedIcon />
                        )}
                        {user.isAdmin === false && <LockOpenOutlinedIcon />}
                      </Box>
                      <Typography variant="h4" sx={{ m: "10px 0 5px 0" }}>
                        Is Admin
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
            {admin.id && (
              <Box m="20px">
                <Box p="60px">
                  <img src={admin.img} alt="user pic" />
                </Box>
                <Box p="30px">
                  <h3>
                    {admin.name} {admin.lastname}
                  </h3>
                </Box>
                <Grid container spacing={10} alignItems="center" justifyContent="center">
                  <Grid item lg={3}>
                    <Box>
                      <h3>Username:</h3>
                      <h3>{admin.username}</h3>
                    </Box>
                  </Grid>
                  <Grid item lg={3}>
                    <Box>
                      <h3>Telephone Number:</h3>
                      <h3>{admin.tel}</h3>
                    </Box>
                  </Grid>
                  <Grid item lg={3}>
                    <Box>
                      <h3>Email:</h3>
                      <h3>{admin.email}</h3>
                    </Box>
                  </Grid>
                  <Grid item lg={3}>
                    <Box>
                      <h3>DNI: {admin.dni}</h3>
                    </Box>
                  </Grid>
                  <Grid item lg={3}>
                    <Box>
                      <Box
                        width="15%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                          admin.isActive === true
                            ? colors.greenAccent[600]
                            : colors.redAccent[700]
                        }
                        borderRadius="4px"
                        type="button"
                        onClick={(event)=>handleStatusAdmin(event)}
                      >
                        {admin.isActive === true && (
                          <AdminPanelSettingsOutlinedIcon />
                        )}
                        {admin.isActive === false && <LockOpenOutlinedIcon />}
                      </Box>
                      <Typography variant="h4" sx={{ m: "10px 0 5px 0" }}>
                        Is Active
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item lg={3}>
                    <Box>
                      <Box
                        width="15%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                          admin.isAdmin === true
                            ? colors.greenAccent[600]
                            : colors.redAccent[700]
                        }
                        borderRadius="4px"
                        type="button"
                        onClick={(event)=>handleAccessAdmin(event)}
                      >
                        {admin.isAdmin === true && (
                          <AdminPanelSettingsOutlinedIcon />
                        )}
                        {admin.isAdmin === false && <LockOpenOutlinedIcon />}
                      </Box>
                      <Typography variant="h4" sx={{ m: "10px 0 5px 0" }}>
                        Is Admin
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item lg={3}>
                  <Button variant="contained" color="error" onClick={(event)=>delAdmin(event)}>
                    Delete Admin
                  </Button>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
