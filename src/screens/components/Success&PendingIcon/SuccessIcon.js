import { Button } from "@material-ui/core";
import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const SuccessIcon = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Button
        variant="outlined"
        style={{ borderRadius: "20px", color: "green", borderColor: "green" }}
      >
        <div
          style={{ display: "flex", flexWrap: "wrap", paddingRight: "10px" }}
        >
          <CheckCircleIcon style={{ marginRight: "2px" }} />
          Active
        </div>
      </Button>
    </div>
  );
};

export default SuccessIcon;
