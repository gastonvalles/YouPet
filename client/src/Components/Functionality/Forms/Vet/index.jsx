import React, { useState } from "react";
import "./index.css";
import { Formik, Form, Field, ErrorMessage } from "formik";

const FormVet = () => {
  const [formSent, changeFormSent] = useState(false);

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          lastname: "",
          speciality: "",
        }}
        validate={(values) => {
          let errors = {};

          if (!values.name) {
            errors.name = "Please insert a first name";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
            errors.name = "The first name can only be alphabetical characters";
          }

          if (!values.lastname) {
            errors.lastname = "Please insert a last name";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.lastname)) {
            errors.lastname =
              "The last name can only be alphabetical characters";
          }
          if (!values.speciality) {
            errors.speciality = "Please insert a speciality";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.speciality)) {
            errors.speciality =
              "The speciality can only be alphabetical characters";
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          resetForm();
          console.log("Form Completed");
          changeFormSent(true);
          setTimeout(() => changeFormSent(false), 5000);
        }}
      >
        {({
          handleSubmit,
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
        }) => (
          <div className="contenedor">
            <Form className="formulario">
              <div>
                <label htmlFor="name">Name: </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Insert first name here..."
                />
                <ErrorMessage
                  name="name"
                  component={() => <div className="error">{errors.name}</div>}
                />
              </div>

              <div>
                <label htmlFor="lastname">Last Name: </label>
                <Field
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Insert last name here..."
                />
                <ErrorMessage
                  name="lastname"
                  component={() => (
                    <div className="error">{errors.lastname}</div>
                  )}
                />
              </div>

              <div>
                <label htmlFor="speciality">Speciality: </label>
                <Field
                  type="text"
                  id="speciality"
                  name="speciality"
                  placeholder="Insert Speciality here..."
                />
                <ErrorMessage
                  name="speciality"
                  component={() => (
                    <div className="error">{errors.speciality}</div>
                  )}
                />
              </div>

              <button type="submit">Register Vet</button>
              {formSent && (
                <p className="success"> Form completed successfully! </p>
              )}
            </Form>
          </div>
        )}

        {/* {({handleSubmit, values, handleChange, handleBlur, errors, touched})=>(
                    <div className="contenedor">
                    <form className="formulario" onSubmit={handleSubmit}>

                        <div>
                            <label htmlFor='name'>Name: </label>
                            <input 
                            type='text' 
                            id='name' 
                            name='name' 
                            placeholder='Insert first name here...' 
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            />
                            {touched.name && errors.name && <div className='error'>{errors.name}</div>}
                        </div>

                        <div>
                            <label htmlFor='lastname'>Last Name: </label>
                            <input 
                            type='text' 
                            id='lastname' 
                            name='lastname' 
                            placeholder='Insert last name here...' 
                            value={values.lastname}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            />
                            {touched.lastname && errors.lastname && <div className='error'>{errors.lastname}</div>}
                        </div>

                        <div>
                            <label htmlFor='speciality'>Speciality: </label>
                            <input 
                            type='text' 
                            id='speciality' 
                            name='speciality' 
                            placeholder='Insert Speciality here...' 
                            value={values.speciality}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            />
                            {touched.speciality && errors.speciality && <div className='error'>{errors.speciality}</div>}
                        </div>

                        <button type='submit'>Create Vet</button>
                        {formSent && <p className='success'> Form completed successfully! </p>}
                    </form>
                    </div>
                )} */}
      </Formik>
    </>
  );
};

export default FormVet;
