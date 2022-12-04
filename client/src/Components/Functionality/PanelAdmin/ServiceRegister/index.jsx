import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, Grid } from "@mui/material";
import Header from "../../Header";

export default function ServiceRegister(){
  const [formSuccess, setformSuccess] = useState(false);

  return (
    <Box className="container-md">
      <Box m="20px" p="50px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="Service Register" subtitle="Form to register new service" />
        </Box>
      </Box>
      <Formik
        initialValues={{
          name: "",
          type: "",
          timelapse: "",
          price: "",
          img: "",
          detail: "",
        }}
        validate={(values) => {
          let errors = {};
          if (!values.name) {
            errors.name = "Please enter a name";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
            errors.name = "Can only enter letters";
          }
          if (!values.type) {
            errors.type = "Please enter a type";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.type)) {
            errors.type = "Can only enter letters";
          }
          if (!values.speciality) {
            errors.username = "Please enter a specialty";
          } else if (!/^[a-zA-Z0-9\_\-]{4,16}$/.test(values.username)) {
            errors.username = "Can only enter letters";
          }
          if (!values.price) {
            errors.price = "Please enter a price";
          } else if (!/^\d{4,9}$/.test(values.price) || values.price < 0) {
            errors.price = "Invalid price";
          }
          if (!values.email) {
            errors.email = "Please enter an email";
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              values.email
            )
          ) {
            errors.email = "Can only enter a valid email";
          }
          if (!values.address) {
            errors.adress = "Please enter an address";
          } else if (values.address.length < 10 && values.address.length > 30) {
            errors.adress = "Ingresa una direccion correcta";
          }
          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          resetForm();
          setformSuccess(true);
          setTimeout(() => {
            setformSuccess(false);
          }, 5000);
        }}
      >
        {({ errors }) => (
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Box p="20px" alignItems="center" justifyContent="center">
              <Form className="row g-3">
                <Grid item lg={3}>
                  <Box>
                    <label htmlFor="name">Name</label>
                    <Field
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Name"
                    />
                    <ErrorMessage
                      name="name"
                      render={(msg) => <p className="text-danger">{msg}</p>}
                    />
                  </Box>
                </Grid>
                <Grid item lg={3}>
                  <Box>
                    <label htmlFor="lastname">Type</label>
                    <Field
                      type="text"
                      name="type"
                      className="form-control"
                      placeholder="Type"
                    />
                    <ErrorMessage
                      name="type"
                      render={(msg) => <p className="text-danger">{msg}</p>}
                    />
                  </Box>
                </Grid>
                <Grid item lg={3}>
                  <Box>
                    <label htmlFor="speciality">Speciality</label>
                    <Field
                      type="text"
                      name="speciality"
                      className="form-control"
                      placeholder="Speciality"
                    />
                    <ErrorMessage
                      name="speciality"
                      render={(msg) => <p className="text-danger">{msg}</p>}
                    />
                  </Box>
                </Grid>
                <Grid item lg={3}>
                  <Box>
                    <label htmlFor="dni">Price</label>
                    <Field
                      type="number"
                      name="price"
                      className="form-control"
                      placeholder="Price"
                    />
                    <ErrorMessage
                      name="dni"
                      render={(msg) => <p className="text-danger">{msg}</p>}
                    />
                    <span id="passwordHelpInline" className="form-text">
                      Ingresar numero sin puntos
                    </span>
                  </Box>
                </Grid>
                <Grid item lg={6}>
                <Box>
                  <label htmlFor="email">Email</label>
                  <Field
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="email@example.com"
                  />
                  <ErrorMessage
                    name="email"
                    render={(msg) => <p className="text-danger">{msg}</p>}
                  />
                </Box>
                </Grid>
                <Grid item lg={6}>
                <Box>
                  <label htmlFor="detail">Detail</label>
                  <Field
                    type="text"
                    name="detail"
                    className="form-control"
                    placeholder="Detail"
                  />
                  <ErrorMessage
                    name="detail"
                    render={(msg) => <p className="text-danger">{msg}</p>}
                  />
                </Box>
                </Grid>
                <Box>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                </Box>
                {formSuccess && <p className="text-success">Usuario Creado</p>}
              </Form>
            </Box>
          </Grid>
        )}
      </Formik>
    </Box>
  );
}