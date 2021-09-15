import axios from 'axios';
import ApiService from '../../ApiService';

export const get_regions = () => {
    return (dispatch) => {
        axios.get(ApiService.getBaseUrl() + '/regions/getRegions')
            .then((res) => {
                dispatch({ type: "ALL_REGION", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ALL_REGION_FAILURE", payload: error });
            })
    }
}

export const add_region = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/regions/postRegion', values)
            .then((res) => {
                dispatch({ type: "ADD_REGION", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ADD_REGION_FAILURE", payload: error });
            })
    }
}

export const update_region = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/regions/postRegion', values)
            .then((res) => {
                dispatch({ type: "UPDATE_REGION_SUCCESS", region: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "UPDATE_REGION_FAILURE", region: error });
            })
    }
}

export const delete_region = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/regions/deleteRegion', values)
            .then((res) => {
                dispatch({ type: "DELETE_REGION", payload: values.objectId });
            })
            .catch((error) => {
                dispatch({ type: "DELETE_REGION_FAILURE", payload: error });
            })
    }
}