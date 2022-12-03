import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ColorModeContext, tokens, useMode } from "../../theme";
import { Box, CssBaseline, ThemeProvider, useTheme } from "@mui/material";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

import Header from "../../Header";
import {
  clearDetails,
  getAdminDetail,
  getUserDetail,
} from "../../../../../Redux/actions";

export default function AdminProfileDetail() {
  const theeme = useTheme();
  const colors = tokens(theeme.palette.mode);
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userDetail);
  const admin = useSelector((state) => state.adminDetail);
  const [theme, colorMode] = useMode();
  const [status, setStatus] = useState(user.isActive)

  function handleStatus(event) {
    event.preventDefault();
    if(user.isActive === true) {
      setStatus(false)
    } else{
      setStatus(true)
    }
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
          <Link
            to="/admin/users"
            type="button"
            className="text-decoration-none"
          >
            Back to users
          </Link>
          <Box m="20px">
            <Header title="USER" subtitle="Managing user" />
          </Box>
          <Box>
            {user.id && (
              <Box>
                <img src="" alt="user pic"/>
                <h3>
                  {user.name} {user.lastname}
                </h3>
                <h3>Username: {user.username}</h3>
                <h3>Telephone Numbre: {user.tel}</h3>
                <h3>DNI: {user.dni}</h3>
                <Box
            width="60%"
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
            onClick={(event)=>handleStatus(event)}
          >
            {user.isActive === true && <AdminPanelSettingsOutlinedIcon />}
            {user.isActive === false && <LockOpenOutlinedIcon />}
          </Box>
              </Box>
            )}
            {admin.id && (
              <Box>
              <img src="" alt="admin pic"/>
                <h3>
                  {admin.name} {admin.lastname}
                </h3>
                <h3>Username: {admin.username}</h3>
                <h3>Telephone Numbre: {admin.tel}</h3>
                <h3>DNI: {admin.dni}</h3>
              </Box>
            )}
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
