import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, Grid } from "@mui/material";
import Header from "../../PanelAdmin/Header";
import { createVet } from "../../../../Redux/actions";

export default function VetForm() {
  const [formSuccess, setformSuccess] = useState(false);

  return (
    <Box className="container-md">
      <Box m="20px" p="50px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="Vet Register" subtitle="Form to register new vet" />
        </Box>
      </Box>
      
    </Box>
  );
}
