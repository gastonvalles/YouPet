import axios from "axios";

const verifUser = (code) => {
  return axios.get(`http://localhost:3000/confirm/${code}`).then((response) => {
    return response.data;
  });
};

exports.modules = {
  verifUser,
};
