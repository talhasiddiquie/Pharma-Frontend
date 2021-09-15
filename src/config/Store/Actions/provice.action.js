import axios from "axios";
import ApiService from "../../ApiService";

export const add_province = (values) => {
  return (dispatch) => {
    dispatch({ type: "ADD_PROVINCE" });
    axios
      .post(ApiService.getBaseUrl() + "/provinces/postProvince", values)
      .then((res) => {
        dispatch({ type: "ADD_PROVINCE", payload: res.data.content });
      })
      .catch((error) => {
        dispatch({ type: "ADD_PROVINCE_FAILURE", payload: error });
      });
  };
};

export const get_province = () => {
  return (dispatch) => {
    axios
      .get(ApiService.getBaseUrl() + "/provinces/getProvinces")
      .then((res) => {
        console.log("response ===", res.data);
        dispatch({ type: "ALL_PROVINCE", payload: res.data.content });
      })
      .catch((error) => {
        dispatch({ type: "ALL_PROVINCE_FAILURE", payload: error });
      });
  };
};

export const update_province = (values) => {
  return (dispatch) => {
    axios
      .post(ApiService.getBaseUrl() + "/provinces/postProvince", values)
      .then((res) => {
        dispatch({ type: "UPDATE_PROVINCE", payload: res.data.content });
      })
      .catch((error) => {
        dispatch({ type: "UPDATE_PROVINCE_FAILURE", payload: error });
      });
  };
};

export const delete_province = (values) => {
  return (dispatch) => {
    axios
      .post(ApiService.getBaseUrl() + "/provinces/deleteProvince", values)
      .then((res) => {
        console.log(res);
        console.log("values ===>", values);
        // dispatch({ type: "DELETE_PROVINCES", payload: values.objectId });
      })
      .catch((error) => {
        dispatch({ type: "DELETE_PROVINCES_FAILURE", payload: error });
      });
  };
};
