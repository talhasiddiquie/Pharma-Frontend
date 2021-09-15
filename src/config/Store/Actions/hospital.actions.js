import axios from 'axios';
import ApiService from "../../ApiService";

export const get_all_hospitals = () => {
    return (dispatch) => {
        axios.get(ApiService.getBaseUrl() + '/hospitals/getHospitals')
            .then((res) => {
                dispatch({ type: "ALL_HOSPITALS", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ALL_HOSPITALS_FAILURE", payload: error });
            })
    }
}

export const add_hospital = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/hospitals/postHospital', values)
            .then((res) => {
                dispatch({ type: "ADD_HOSPITAL", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ADD_HOSPITAL_FAILURE", payload: error });
            })
    }
}

export const update_hospital = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/hospitals/postHospital', values)
            .then((res) => {
                dispatch({ type: "UPDATE_HOSPITAL", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "UPDATE_HOSPITAL_FAILURE", payload: error });
            })
    }
}

export const delete_hospital = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/hospitals/deleteHospital', values)
            .then((res) => {
                dispatch({ type: "DELETE_HOSPITAL", payload: values.objectId });
            })
            .catch((error) => {
                dispatch({ type: "DELETE_HOSPITAL_FAILURE", payload: error });
            })
    }
}