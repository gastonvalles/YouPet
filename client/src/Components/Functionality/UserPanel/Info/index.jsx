import React from "react";
import { Box } from "@mui/material";
import Header from "../Header";
import userPlaceholder from "../../../../img/user-placeholder.png";
import loadingSvg from "../../../../img/loading_dualring.svg";

export default function Info() {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
      <Header title="Info" subtitle="Welcome"/>
      </Box>
      <Box>
      <div className="cardv">
            <div className="cardv_image">
                <img src={userPlaceholder} alt="Not found" />
            </div>
            <div className="cardv_title title-white">
                {/* <p>{name} {lastname}</p> */}
                algo paso aqui

            </div>
        </div>
      </Box>
    </Box>
  );
}




