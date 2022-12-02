import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../../Header";
import { clearDetails, getAdminDetail, getUserDetail } from "../../../../../Redux/actions";

export default function AdminProfileDetail() {
  const {id} = useParams()
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userDetail);
  const admin = useSelector((state) => state.adminDetail);
  const users = [...user, ...admin];

  useEffect(()=> {
    dispatch(getUserDetail(id));
    dispatch(getAdminDetail(id));
    return () => {
      dispatch(clearDetails());
    };
  }, [dispatch, id]);

  return (
    <Box>
      <Header title="USER" subtitle="Managing user" />
      {
        users?.map(element => {
          return (
            <div>
              <h3>{element.name} {element.lastname}</h3>
            </div>
          )
        })
      }
    </Box>
  )

}
