import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ColorModeContext, useMode } from "../../theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "../../Header";
import {
  clearDetails,
  getAdminDetail,
  getUserDetail,
} from "../../../../../Redux/actions";

export default function AdminProfileDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userDetail);
  const admin = useSelector((state) => state.adminDetail);
  const [theme, colorMode] = useMode();

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
