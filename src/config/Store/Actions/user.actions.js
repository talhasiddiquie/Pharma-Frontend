import axios from "axios";
import ApiService from "../../ApiService";
import AuthToken from "../../setAuthToken";
import Cookies from "universal-cookie";
import { ChangeSnackFlag, ChangeSnackData } from "./snackbar.actions";
const cookies = new Cookies();

export const add_user = (user) => {
  return {
    type: "SET_USER",
    data: user,
  };
};

export const remove_user = () => {
  return {
    type: "REMOVE_USER",
    type: "LOGOUT",
  };
};

export const redirectToForgot = (load) => {
  return {
    type: "REDRIECT_TO_FORGOT_PASSWORD",
    load,
  };
};

export const login_user = (values, enqueueSnackbar) => {
  return (dispatch) => {
    dispatch({ type: "LOGIN_USER" });
    axios
      .post(`${process.env.REACT_APP_URL}/users/login`, values)
      .then((res) => {
        console.log(res, "response");
        if (res.data.message !== undefined) {
          console.log("IFF");
          enqueueSnackbar(res.data.message, { variant: "error" });
        } else {
          cookies.set("data", res.data);
          if (res.data.status == false) {
            enqueueSnackbar("Change Your Password", { variant: "success" });
            dispatch(redirectToForgot("ChangePassword"));
            window.sessionStorage.setItem("useId", res.data._id);
          } else {
            dispatch({ type: "LOGIN_USER_SUCCESS", user: res.data });
            enqueueSnackbar("Logged In Successfully", { variant: "success" });
            dispatch(ChangeSnackFlag(true));
          }
        }
      })
      .catch((error) => {
        dispatch({ type: "LOGIN_USER_FAILURE", user: error });
        console.log(error);
        dispatch(ChangeSnackData({ message: error.message, variant: "error" }));
        dispatch(ChangeSnackFlag(true));
      });
  };
};

export const all_users = () => {
  return (dispatch) => {
    axios
      .get(
        `${process.env.REACT_APP_URL}/users/all`,
        // , { headers: { "Authorization": `Bearer ${token}` } }
        AuthToken()
      )
      .then((res) => {
        var data = res.data;
        if (data.message === "Token is not valid") {
          dispatch({ type: "TOKEN_INVALID", payload: data });
        } else if (data.message === "Auth token is not supplied") {
          dispatch({ type: "TOKEN_INVALID", payload: data });
        } else {
          dispatch({ type: "ALL_USERS", payload: res.data });
        }
      })
      .catch((error) => {
        dispatch({ type: "ALL_USERS_FAILURE", payload: error });
      });
  };
};

export const create_user = (values) => {
  return (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_URL}/users/signUp`, values)
      .then((res) => {
        dispatch({ type: "CREATE_USER", payload: res.data.content });
      })
      .catch((error) => {
        dispatch({ type: "CREATE_USER_FAILURE", payload: error });
      });
  };
};

export const user_forgot_paasword = (values, enqueueSnackbar) => {
  return (dispatch) => {
    try {
      axios
        .post(`${process.env.REACT_APP_URL}/users/forgotpassword`, values)
        .then((res) => {
          // console.log("RES", res.status);
          enqueueSnackbar(res.data.message, { variant: "success" });
          dispatch(redirectToForgot("redirectemailverification"));
          console.log(dispatch(redirectToForgot(true)));
        })
        .catch((error) => {
          // dispatch({ type: "FORGOT_PASSWORD", payload: error });
          // dispatch(
          //   ChangeSnackData({
          //     message: error.response.data.message,
          //     variant: "error",
          //   })
          // );
          enqueueSnackbar("Invalid Email", { variant: "error" });
        });
    } catch (error) {
      console.log("ERROR", error);
    }
  };
};

export const user_verification_code = (values, enqueueSnackbar) => {
  return (dispatch) => {
    try {
      axios
        .post(`${process.env.REACT_APP_URL}/users/activateID`, values)
        .then((res) => {
          enqueueSnackbar("Verified", { variant: "success" });
          dispatch(redirectToForgot("redirecttoupdatepassword"));
          window.sessionStorage.setItem("useId", res.data._id);
        })
        .catch((error) => {
          // dispatch({ type: "FORGOT_PASSWORD", payload: error });
          // dispatch(
          //   ChangeSnackData({
          //     message: error.response.data.message,
          //     variant: "error",
          //   })
          // );
          enqueueSnackbar("Wrong Code", { variant: "error" });
        });
    } catch (error) {
      console.log("ERROR", error);
    }
  };
};

export const user_update_password = (values, enqueueSnackbar) => {
  return (dispatch) => {
    try {
      axios
        .post(`${process.env.REACT_APP_URL}/users/updatePassword`, values)
        .then((res) => {
          console.log("RES", res);
          console.log(res);
          enqueueSnackbar("Password Change Succesfully", {
            variant: "success",
          });
          dispatch(redirectToForgot("tologinpage"));
        })
        .catch((error) => {
          enqueueSnackbar(error, { variant: "error" });
        });
    } catch (error) {
      console.log("ERROR", error);
    }
  };
};

export const update_user = (values) => {
  return (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_URL}/users/userUpdate`, values)
      .then((res) => {
        dispatch({ type: "UPDATE_USER", payload: res.data.content });
      })
      .catch((error) => {
        dispatch({ type: "UPDATE_USER_FAILURE", payload: error });
      });
  };
};

export const delete_user = (values) => {
  return (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_URL}/users/deleteUser`, values)
      .then((res) => {
        dispatch({ type: "DELETE_USER", payload: values.objectId });
      })
      .catch((error) => {
        dispatch({ type: "DELETE_USER_FAILURE", payload: error });
      });
  };
};

export const changeRedirectToForgotPassword = (value) => {
  return async (dispatch) => {
    dispatch(redirectToForgot(value));
  };
};

export const user_loged_in = () => {
  return (dispatch) => {
    dispatch({ type: "USER_LOGGED_IN", payload: true });
  };
};

export const user_loged_in_checked = () => {
  return (dispatch) => {
    dispatch({ type: "USER_LOGGED_IN_CHECKED", payload: false });
  };
};
