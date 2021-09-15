import axios from 'axios';
import ApiService from '../../ApiService';

export const add_speciality = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/speciality/postSpeciality', values)
            .then((res) => {
                dispatch({ type: "ADD_SPECIALITY", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ADD_SPECIALITY_FAILURE", payload: error });
            })
    }
}

export const get_speciality = () => {
    return (dispatch) => {
        axios.get(ApiService.getBaseUrl() + '/speciality/getSpecialities')
            .then((res) => {

                dispatch({ type: "ALL_SPECIALITYS", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ALL_SPECIALITY_FAILURE", payload: error });
            })
    }
}