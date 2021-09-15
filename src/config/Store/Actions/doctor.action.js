import axios from 'axios';
import ApiService from '../../ApiService';

export const get_doctors = () => {
    return (dispatch) => {
        axios.get(ApiService.getBaseUrl() + '/doctors/getDoctor')
            .then((res) => {
                dispatch({ type: "ALL_DOCTOR", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ALL_DOCTOR_FAILURE", payload: error });
            })
    }
}

export const add_doctor = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/doctors/postDoctor', values)
            .then((res) => {
                dispatch({ type: "ADD_DOCTOR", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ADD_DOCTOR_FAILURE", payload: error });
            })
    }
}

export const update_doctor = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/doctors/postDoctor', values)
            .then((res) => {
                dispatch({ type: "UPDATE_DOCTOR", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "UPDATE_DOCTOR_FAILURE", payload: error });
            })
    }
}

export const delete_doctor = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/doctors/deleteDoctor', values)
            .then((res) => {
                dispatch({ type: "DELETE_DOCTOR", payload: values.objectId });
            })
            .catch((error) => {
                dispatch({ type: "DELETE_DOCTOR_FAILURE", payload: error });
            })
    }
}

export const get_city_doctor = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/doctors/getDoctorsByCity', values)
            .then((res) => {
                dispatch({ type: "ALL_DOCTORS_CITY", cityDoctors: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ALL_DOCTORS_CITY_FAILURE", cityDoctors: error });
            })
    }
}

