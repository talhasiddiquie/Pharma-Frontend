import React from "react";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

const SnackTriger = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const snackData = useSelector((state) => state.snackBar.snackData);
  const snackFlag = useSelector((state) => state.snackBar.snackFlag);

  console.log("000000000000", snackData.variant);
  if (snackFlag) {
    // enqueueSnackbar(snackData.message, { variant: snackData.variant });
  }
  return <div></div>;
};

export default SnackTriger;
