import { Button } from "@material-ui/core";
import React from "react";
import ErrorIcon from "@material-ui/icons/Error";

const PendingIcon = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Button
        variant="outlined"
        style={{ borderRadius: "20px", color: "orange", borderColor: "orange" }}
      >
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <ErrorIcon style={{ marginRight: "2px" }} /> Pending
        </div>
      </Button>
    </div>
  );
};
export default PendingIcon;
