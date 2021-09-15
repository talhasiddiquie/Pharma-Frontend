import axios from 'axios';
import ApiService from '../../ApiService';

export const add_designation = (values) => {
    return (dispatch) => {
        dispatch({ type: "ADD_DESIGNATION" });
        axios.post(ApiService.getBaseUrl() + '/designations/postDesignation', values)
            .then((res) => {
                dispatch({ type: "ADD_DESIGNATION", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ADD_DESIGNATION_FAILURE", payload: error });
            })
    }
}

export const get_designation = () => {
    return (dispatch) => {
        axios.get(ApiService.getBaseUrl() + '/designations/getDesignations')
            .then((res) => {
                dispatch({ type: "ALL_DESIGNATION", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ALL_DESIGNATION_FAILURE", payload: error });
            })
    }
}