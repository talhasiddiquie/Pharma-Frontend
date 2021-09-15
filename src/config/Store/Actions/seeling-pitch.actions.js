import axios from 'axios';
import ApiService from '../../ApiService';

export const get_all_selling_pitchs = () => {
    return (dispatch) => {
        axios.get(ApiService.getBaseUrl() + '/selling/getSellingPitchs')
            .then((res) => {
                dispatch({ type: "ALL_SELLING_PITCHS", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ALL_SELLING_PITCHS_FAILURE", payload: error });
            })
    }
}

export const add_selling_pitch = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/selling/postSellingPitch', values)
            .then((res) => {
                dispatch({ type: "ADD_SELLING_PITCH", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ADD_SELLING_PITCH_FAILURE", payload: error });
            })
    }
}

export const update_selling_pitch = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/selling/postSellingPitch', values)
            .then((res) => {
                dispatch({ type: "UPDATE_SELLING_PITCH", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "UPDATE_SELLING_PITCH_FAILURE", payload: error });
            })
    }
}

export const delete_selling_pitch = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/selling/deleteSellingPitch', values)
            .then((res) => {
                dispatch({ type: "DELETE_SELLING_PITCH", payload: values.objectId });
            })
            .catch((error) => {
                dispatch({ type: "DELETE_SELLING_PITCH_FAILURE", payload: error });
            })
    }
}