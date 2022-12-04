import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, Grid } from "@mui/material";
import Header from "../Header";
import { createAdmin } from "../../../../Redux/actions";

export default function AdminRegister() {
  const dispatch = useDispatch()
  const [formSuccess, setformSuccess] = useState(false);

  return (
    <Box className="container-md">
      <Box m="20px" p="50px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="Admin Register"
            subtitle="Register your admin profile access"
          />
        </Box>
      </Box>
      <Formik
        initialValues={{
          name: "",
          lastname: "",
          username: "",
          dni: "",
          email: "",
          password: "",
          passwordCopy: "",
          address: "",
        }}
        validate={(values) => {
          let errors = {};
          if (!values.name) {
            errors.name = "Please enter a name";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
            errors.name = "Can only enter letters";
          }
          if (!values.lastname) {
            errors.lastname = "Please enter a lastname";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
            errors.lastname = "Can only enter letters";
          }
          if (!values.username) {
            errors.username = "Please enter an username";
          } else if (!/^[a-zA-Z0-9\_\-]{4,16}$/.test(values.username)) {
            errors.username = "Can only enter letters";
          }
          if (!values.dni) {
            errors.dni = "Please enter a dni";
          } else if (!/^\d{4,9}$/.test(values.dni) || values.dni < 0) {
            errors.dni = "Can only enter numbers";
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
          if (!values.passwordCopy) {
            errors.passwordCopy = "Please enter a password";
          } else if (!/^[a-zA-Z0-9\_\-]{4,16}$/.test(values.passwordCopy)) {
            errors.passwordCopy = "Debe tener al menos 5 digitos";
          }
          if (!values.password) {
            errors.password = "Please enter your password again";
          } else if (values.passwordCopy !== values.password) {
            errors.password = "The passwords do not match";
          }
          if (!values.address) {
            errors.adress = "Please enter an address";
          } else if (values.address.length < 10 && values.address.length > 30) {
            errors.adress = "Can only enter a valid address";
          }
          return errors;  
        }}
        onSubmit={(values, { resetForm }) => {
          dispatch(createAdmin(values));
          resetForm();
          setformSuccess(true);
          setTimeout(() => {
            setformSuccess(false);
          }, 5000);
        }}
      >
        {() => (
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
                    <label htmlFor="lastname">Lastname</label>
                    <Field
                      type="text"
                      name="lastname"
                      className="form-control"
                      placeholder="Lastname"
                    />
                    <ErrorMessage
                      name="lastname"
                      render={(msg) => <p className="text-danger">{msg}</p>}
                    />
                  </Box>
                </Grid>
                <Grid item lg={3}>
                  <Box>
                    <label htmlFor="userName">Username</label>
                    <Field
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder="Username"
                    />
                    <ErrorMessage
                      name="username"
                      render={(msg) => <p className="text-danger">{msg}</p>}
                    />
                  </Box>
                </Grid>
                <Grid item lg={3}>
                  <Box>
                    <label htmlFor="dni">DNI</label>
                    <Field
                      type="number"
                      name="dni"
                      className="form-control"
                      placeholder="DNI"
                    />
                    <ErrorMessage
                      name="dni"
                      render={(msg) => <p className="text-danger">{msg}</p>}
                    />
                    <span id="passwordHelpInline" className="form-text">
                    Enter number without points
                    </span>
                  </Box>
                </Grid>
                <Grid item lg={3}>
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
                <Grid item lg={2}>
                  <Box className="password">
                    <Box>
                      <Box>
                        <label htmlFor="inputPassword6">Password</label>
                      </Box>
                      <Box className="col-auto">
                        <Field
                          type="password"
                          name="password"
                          className="form-control"
                          aria-describedby="passwordHelpInline"
                        />
                        <ErrorMessage
                          name="passwordCopy"
                          render={(msg) => <p className="text-danger">{msg}</p>}
                        />
                      </Box>
                      <Box>
                        <span id="passwordHelpInline" className="form-text">
                          Must be 8-20 characters long.
                        </span>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item lg={2}>
                  <Box className="password">
                    <Box>
                      <Box>
                        <label htmlFor="inputPassword6">Confirm Password</label>
                      </Box>
                      <Box className="col-auto">
                        <Field
                          type="password"
                          name="passwordCopy"
                          className="form-control"
                          aria-describedby="passwordHelpInline"
                        />
                        <ErrorMessage
                          name="password"
                          render={(msg) => <p className="text-danger">{msg}</p>}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item lg={5}>
                  <Box>
                    <label htmlFor="address">Address</label>
                    <Field
                      type="text"
                      name="address"
                      className="form-control"
                      placeholder="Address"
                    />
                    <ErrorMessage
                      name="address"
                      render={(msg) => <p className="text-danger">{msg}</p>}
                    />
                  </Box>
                </Grid>
                <Box>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </Box>
                {formSuccess && <p className="text-success">User created</p>}
              </Form>
            </Box>
          </Grid>
        )}
      </Formik>
    </Box>
  );
}
