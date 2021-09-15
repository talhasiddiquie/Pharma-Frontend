import axios from 'axios';
import ApiService from '../../ApiService';

export const add_qulification = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/qualifications/postQualification', values)
            .then((res) => {
                dispatch({ type: "ADD_QULIFICATION", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ADD_QULIFICATION_FAILURE", payload: error });
            })
    }
}

export const get_qulification = () => {
    return (dispatch) => {
        axios.get(ApiService.getBaseUrl() + '/qualifications/getQualifications')
            .then((res) => {
                dispatch({ type: "ALL_QULIFICATIONS", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ALL_QULIFICATION_FAILURE", payload: error });
            })
    }
}