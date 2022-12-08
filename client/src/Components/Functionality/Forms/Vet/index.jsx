import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid } from "@mui/material";
import Header from "../../PanelAdmin/Header";
import { createVet, getVets } from "../../../../Redux/actions";

export default function VetForm() {
  const dispatch = useDispatch();
  const vets = useSelector((state) => state.vets);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    lastname: "",
    email: "",
    address: "",
    speciality: "",
    img: "",
    tel: "",
    dni: "",
    inicialDate: "",
    finishDate: "",
  });

  useEffect(() => {
    dispatch(getVets());
  }, [dispatch]);

  function validate(input) {
    let errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    let regexNumber = /^[0-9]+$/;

    if (!input.name.trim()) {
      errors.name = "Please enter a name";
    } else if (!regexName.test(input.name.trim())) {
      errors.name = "Can only enter letters";
    }
    if (!input.lastname.trim()) {
      errors.lastname = "Please enter a lastname";
    } else if (!regexName.test(input.lastname.trim())) {
      errors.lastname = "Can only enter letters";
    }
    if (!input.email.trim()) {
      errors.email = "Please enter a email";
    } else if (!regexEmail.test(input.email)) {
      errors.email = "Can only enter an email valid";
    }
    if (!input.address.trim()) {
      errors.address = "Please enter an address";
    } else if (input.address.length < 10 || input.address.lenght > 50) {
      errors.address = "Please enter a valid address";
    }
    if (!input.speciality.trim()) {
      errors.speciality = "Please select a speciality";
    }
    if (!input.img.trim()) {
      errors.img = "Please enter an image";
    }
    if (!input.tel.trim()) {
      errors.tel = "Please enter a telephone number";
    } else if (input.tel.length < 10) {
      errors.tel = "Please enter a valid telephone number";
    } else if (input.tel.length > 10) {
      errors.tel = "Please enter a valid telephone number";
    } else if (!regexNumber.test(input.tel)) {
      errors.tel = "Can only enter numbers";
    }
    if (!input.dni.trim()) {
      errors.dni = "Please enter a DNI";
    } else if (input.dni.length < 8) {
      errors.dni = "Please enter a valid DNI";
    } else if (input.dni.length > 8) {
      errors.dni = "Please enter a valid DNI";
    } else if (!regexNumber.test(input.dni)) {
      errors.dni = "Can only enter numbers";
    }
    if (!input.inicialDate) {
      errors.inicialDate = "Please enter a date";
    }
    if (!input.finishDate) {
      errors.finishDate = "Please enter a date";
    }

    return errors;
  }

  function handleInputName(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  }
  function handleSelect(event) {
    setInput({
      ...input,
      speciality: event.target.value,
    });
  }
  function handleErrors(event) {
    handleInputName(event);
    setErrors(validate(input));
  }
  function handleSubmit(event) {
    event.preventDefault();
    setErrors(validate(input));
    if (Object.keys(errors).length === 0) {
      dispatch(createVet(input));
      alert("Vet register successfully");
      setInput({
        name: "",
        lastname: "",
        email: "",
        address: "",
        speciality: "",
        img: "",
        tel: "",
        dni: "",
        inicialDate: "",
        finishDate: "",
      });
    }
  }
  return (
    <Box p="50px">
      <Box m="20px" p="50px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="Vet Register" subtitle="Form to register new vet" />
        </Box>
        <form onSubmit={(event) => handleSubmit(event)}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item lg={2}>
              <Box p="10px">
                <Box>
                  <label>Name</label>
                </Box>
                <Box>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={input.name}
                    onChange={(event) => handleInputName(event)}
                    onBlur={(event) => handleErrors(event)}
                  />
                  {errors.name && <p className="error">{errors.name}</p>}
                </Box>
              </Box>
            </Grid>
            <Grid item lg={2}>
              <Box p="10px">
                <Box>
                  <label>Lastname</label>
                </Box>
                <Box>
                  <input
                    className="form-control"
                    type="text"
                    name="lastname"
                    value={input.lastname}
                    placeholder="Enter your lastname"
                    onChange={(event) => handleInputName(event)}
                    onBlur={(event) => handleErrors(event)}
                  />
                  {errors.lastname && (
                    <p className="error">{errors.lastname}</p>
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid item lg={3}>
              <Box p="10px">
                <Box>
                  <label>Email</label>
                </Box>
                <Box>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="example@example.com"
                    value={input.email}
                    onChange={(event) => handleInputName(event)}
                    onBlur={(event) => handleErrors(event)}
                  />
                  {errors.email && <p className="error">{errors.email}</p>}
                </Box>
              </Box>
            </Grid>
            <Grid item lg={5}>
              <Box p="10px">
                <Box>
                  <label>Address</label>
                </Box>
                <Box>
                  <input
                    className="form-control"
                    type="text"
                    name="address"
                    placeholder="Enter your address"
                    value={input.address}
                    onChange={(event) => handleInputName(event)}
                    onBlur={(event) => handleErrors(event)}
                  />
                  {errors.address && <p className="error">{errors.address}</p>}
                </Box>
              </Box>
            </Grid>
            <Grid item lg={3}>
              <Box p="10px">
                <Box>
                  <label>Speciality</label>
                </Box>
                <Box>
                  <select
                    className="form-select"
                    name="speciality"
                    value={input.speciality}
                    onChange={(event) => handleSelect(event)}
                    onBlur={(event) => handleErrors(event)}
                  >
                    <option hidden>Select a speciality</option>
                    {vets?.map((vet) => (
                      <option value={vet.speciality}>{vet.speciality}</option>
                    ))}
                  </select>
                  {errors.speciality && (
                    <p className="error">{errors.speciality}</p>
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid item lg={3}>
              <Box p="10px">
                <Box>
                  <label>URL Image</label>
                </Box>
                <Box>
                  <input
                    className="form-control"
                    type="text"
                    name="img"
                    value={input.img}
                    placeholder="Enter a URL image"
                    onChange={(event) => handleInputName(event)}
                    onBlur={(event) => handleErrors(event)}
                  />
                  {errors.img && <p className="error">{errors.img}</p>}
                </Box>
              </Box>
            </Grid>
            <Grid item lg={3}>
              <Box p="10px">
                <Box>
                  <label>Telephone Number</label>
                </Box>
                <Box>
                  <input
                    className="form-control"
                    type="text"
                    name="tel"
                    value={input.tel}
                    placeholder="Enter your phone number"
                    onChange={(event) => handleInputName(event)}
                    onBlur={(event) => handleErrors(event)}
                  />
                  {errors.tel && <p className="error">{errors.tel}</p>}
                </Box>
              </Box>
            </Grid>
            <Grid item lg={2}>
              <Box p="10px">
                <Box>
                  <label>DNI</label>
                </Box>
                <Box>
                  <input
                    className="form-control"
                    type="text"
                    name="dni"
                    value={input.dni}
                    placeholder="Enter your DNI"
                    onChange={(event) => handleInputName(event)}
                    onBlur={(event) => handleErrors(event)}
                  />
                  {errors.dni && <p className="error">{errors.dni}</p>}
                </Box>
              </Box>
            </Grid>
            <Grid item lg={2}>
              <Box p="10px">
                <Box>
                  <label>Initial date</label>
                </Box>
                <Box>
                  <input
                    className="form-control"
                    type="date"
                    name="inicialDate"
                    value={input.inicialDate}
                    onChange={(event) => handleInputName(event)}
                    onBlur={(event) => handleErrors(event)}
                  />
                  {errors.inicialDate && (
                    <p className="error">{errors.inicialDate}</p>
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid item lg={2}>
              <Box p="10px">
                <Box>
                  <label>Finish date</label>
                </Box>
                <Box>
                  <input
                    className="form-control"
                    type="date"
                    name="finishDate"
                    value={input.finishDate}
                    onChange={(event) => handleInputName(event)}
                    onBlur={(event) => handleErrors(event)}
                  />
                  {errors.finishDate && (
                    <p className="error">{errors.finishDate}</p>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box p="50px">
            <button type="submit" className="btn btn-primary">
              Sumbit
            </button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
