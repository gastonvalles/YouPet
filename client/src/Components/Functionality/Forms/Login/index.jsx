import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import logo from "../../../../img/logo.png";
import "./index.css";
export default function Login() {
  const [formSuccess, setFormSuccess] = useState(false);
  return (
    <div className="backgroud">
      <div className="containerlogin">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validate={(values) => {
            let errors = {};
            if (!values.email) {
              errors.email = "Por favor ingresa un email";
            } else if (
              !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                values.email
              )
            ) {
              errors.email = "Solo puedes ingresar un email valido";
              }
              console.log(values.password)
            if (!values.password) {
              errors.password = "Por favor ingresa una contraseña";
            } else if (values.password.length < 5 || values.password.length > 16) {
              errors.password = "Debe tener al menos 5 digitos";
            }
            return errors;
          }}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            resetForm();
            console.log("formulario enviado");
            setFormSuccess(true);
            setTimeout(() => {
              setFormSuccess(false);
            }, 5000);
          }}
        >
          {({ errors }) => (
            <div className="login">
              <Form className="form">
                <div className="logo">
                  <img src={logo} alt="Bootstrap" height="55" />
                </div>
                <div className="mb-3">
                  <label htmlFor="InputEmail1" className="form-label">
                    Email address
                  </label>
                  <Field
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="example@example.com"
                  />
                  <ErrorMessage
                    name="email"
                    component={() => (
                      <p className="text-danger">{errors.email}</p>
                    )}
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="inputPassword" className="form-label">
                    Password
                  </label>
                  <Field
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                  />
                  <ErrorMessage
                    name="password"
                    component={() => (
                      <p className="text-danger">{errors.password}</p>
                    )}
                  />
                </div>
                <button type="submit" className="btn btn-primary ">
                  Submit
                </button>
                {formSuccess && <p className="text-success">Probar inicio</p>}
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
}
