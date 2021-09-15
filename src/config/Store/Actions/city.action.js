import axios from 'axios';
import ApiService from '../../ApiService';

export const get_cities = () => {
    return (dispatch) => {
        axios.get(ApiService.getBaseUrl() + '/cities/getCities')
            .then((res) => {
                dispatch({ type: "ALL_CITY", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ALL_CITY_FAILURE", payload: error });
            })
    }
}

export const add_city = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/cities/postCity', values)
            .then((res) => {
                dispatch({ type: "ADD_CITY", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ADD_CITY_FAILURE", payload: error });
            })
    }
}

export const update_city = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/cities/postCity', values)
            .then((res) => {
                dispatch({ type: "UPDATE_CITY_SUCCESS", city: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "UPDATE_CITY_FAILURE", city: error });
            })
    }
}

export const delete_city = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/cities/deleteCity', values)
            .then((res) => {
                dispatch({ type: "DELETE_CITY", payload: values.objectId });
            })
            .catch((error) => {
                dispatch({ type: "DELETE_CITY_FAILURE", payload: error });
            })
    }
}
