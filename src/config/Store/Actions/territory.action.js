import axios from 'axios';
import ApiService from '../../ApiService';

export const get_territorys = () => {
    return (dispatch) => {
        axios.get(ApiService.getBaseUrl() + '/territory/getTerritorys')
            .then((res) => {
                dispatch({ type: "ALL_TERRITORY", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ALL_TERRITORY_FAILURE", payload: error });
            })
    }
}

export const add_territory = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/territory/postTerritory', values)
            .then((res) => {
                dispatch({ type: "ADD_TERRITORY", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ADD_TERRITORY_FAILURE", payload: error });
            })
    }
}

export const update_territory = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/territory/postTerritory', values)
            .then((res) => {
                dispatch({ type: "UPDATE_TERRITORY_SUCCESS", territory: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "UPDATE_TERRITORY_FAILURE", territory: error });
            })
    }
}



export const delete_territory = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/territory/deleteTerritory', values)
            .then((res) => {
                dispatch({ type: "DELETE_TERRITORY", payload: values.objectId });
            })
            .catch((error) => {
                dispatch({ type: "DELETE_TERRITORY_FAILURE", payload: error });
            })
    }
}
