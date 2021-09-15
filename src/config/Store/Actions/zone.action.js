import axios from 'axios';
import ApiService from '../../ApiService';

export const get_zones = () => {
    return (dispatch) => {
        axios.get(ApiService.getBaseUrl() + '/zones/getZones')
            .then((res) => {
                dispatch({ type: "ALL_ZONE", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ALL_ZONE_FAILURE", payload: error });
            })
    }
}

export const add_zone = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/zones/postZone', values)
            .then((res) => {
                dispatch({ type: "ADD_ZONE", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ADD_ZONE_FAILURE", payload: error });
            })
    }
}

export const update_zone = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/zones/postZone', values)
            .then((res) => {
                dispatch({ type: "UPDATE_ZONE_SUCCESS", zone: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "UPDATE_ZONE_FAILURE", zone: error });
            })
    }
}


export const delete_zone = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/zones/deleteZone', values)
            .then((res) => {
                dispatch({ type: "DELETE_ZONE", payload: values.objectId });
            })
            .catch((error) => {
                dispatch({ type: "DELETE_ZONE_FAILURE", payload: error });
            })
    }
}