import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function AdminRegister() {
  const [formSuccess, setformSuccess] = useState(false);

  return (
    <div className="container-md">
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
            errors.name = "Por favor ingresa un nombre";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
            errors.name = "Solo puedes ingresar Letras";
          }
          if (!values.lastname) {
            errors.lastname = "Por favor ingresa un apellido";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
            errors.lastname = "Solo puedes ingresar Letras";
          }
          if (!values.username) {
            errors.username = "Por favor ingresa un nombre";
          } else if (!/^[a-zA-Z0-9\_\-]{4,16}$/.test(values.username)) {
            errors.username = "Solo puedes ingresar Letras";
          }
          if (!values.dni) {
            errors.dni = "Por favor ingresa numero de dni";
          } else if (!/^\d{4,9}$/.test(values.dni) || values.dni < 0) {
            errors.dni = "DNI invalido";
          }
          if (!values.email) {
            errors.email = "Por favor ingresa un email";
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              values.email
            )
          ) {
            errors.email = "Solo puedes ingresar un email valido";
          }
          if (!values.passwordCopy) {
            errors.passwordCopy = "Por favor ingresa una contraseña";
          } else if (!/^[a-zA-Z0-9\_\-]{4,16}$/.test(values.passwordCopy)) {
            errors.passwordCopy = "Debe tener al menos 5 digitos";
          }
          if (!values.password) {
            errors.password = "Por favor ingresa nuevamente contraseña";
          } else if (values.passwordCopy !== values.password) {
            errors.password = "La contraseñas no conciden";
          }
          if (!values.address) {
            errors.adress = "Por favor ingresa una direccion";
          } else if (values.address.length<10 && values.address.length>30) {
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
          <div className="contenedor">
            <Form className="row g-3">
              <div>
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
              </div>
              <div>
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
              </div>
              <div>
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
              </div>
              <div>
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
                  Ingresar numero sin puntos
                </span>
              </div>
              <div>
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
              </div>
              <div className="password">
                <div className="row g-3 align-items-center">
                  <div className="col-auto">
                    <label htmlFor="inputPassword6" className="col-form-label">
                      Password
                    </label>
                  </div>
                  <div className="col-auto">
                    <Field
                      type="password"
                      name="passwordCopy"
                      className="form-control"
                      aria-describedby="passwordHelpInline"
                    />
                    <ErrorMessage
                      name="passwordCopy"
                      render={(msg) => <p className="text-danger">{msg}</p>}
                    />
                  </div>
                  <div className="col-auto">
                    <span id="passwordHelpInline" className="form-text">
                      Must be 8-20 characters long.
                    </span>
                  </div>
                </div>
              </div>
              <div className="password">
                <div className="row g-3 align-items-center">
                  <div className="col-auto">
                    <label htmlFor="inputPassword6" className="col-form-label">
                      Confirm Password
                    </label>
                  </div>
                  <div className="col-auto">
                    <Field
                      type="password"
                      name="password"
                      className="form-control"
                      aria-describedby="passwordHelpInline"
                    />
                    <ErrorMessage
                      name="password"
                      render={(msg) => <p className="text-danger">{msg}</p>}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="address">Address</label>
                <Field
                  type="text"
                  name="address"
                  className="form-control"
                  placeholder="John"
                />
                <ErrorMessage
                  name="address"
                  render={(msg) => <p className="text-danger">{msg}</p>}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              {formSuccess && <p className="text-success">Usuario Creado</p>}
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}