import axios from 'axios';
import ApiService from '../../ApiService';

export const get_Bricks = () => {
    return (dispatch) => {
        axios.get(ApiService.getBaseUrl() + '/bricks/getBricks')
            .then((res) => {
                dispatch({ type: "ALL_BRICKS", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ALL_BRICKS_FAILURE", payload: error });
            })
    }
}

export const add_brick = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/bricks/postBricks', values)
            .then((res) => {
                console.log(res.data.content, 'res.data.content');
                dispatch({ type: "ADD_BRICKS", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ADD_BRICKS_FAILURE", payload: error });
            })
    }
}

export const update_brick = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/bricks/postBricks', values)
            .then((res) => {
                dispatch({ type: "UPDATE_BRICKS", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "UPDATE_BRICKS_FAILURE", payload: error });
            })
    }
}


export const delete_brick = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/bricks/deleteBrick', values)
            .then((res) => {
                dispatch({ type: "DELETE_BRICKS", payload: values.objectId });
            })
            .catch((error) => {
                dispatch({ type: "DELETE_BRICKS_FAILURE", payload: error });
            })
    }
}