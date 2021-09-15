import axios from 'axios';
import ApiService from '../../ApiService';

export const get_all_representatives = () => {
    return (dispatch) => {
        axios.get(ApiService.getBaseUrl() + '/representative/getRepresentatives')
            .then((res) => {
                dispatch({ type: "ALL_REPRESENTATIVES", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ALL_REPRESENTATIVES_FAILURE", payload: error });
            })
    }
}

export const add_representatives = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/representative/postRepresentative', values)
            .then((res) => {
                dispatch({ type: "ADD_REPRESENTATIVE", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ADD_REPRESENTATIVE_FAILURE", payload: error });
            })
    }
}

export const update_representative = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/representative/postRepresentative', values)
            .then((res) => {
                dispatch({ type: "UPDATE_REPRESENTATIVE", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "UPDATE_REPRESENTATIVE_FAILURE", payload: error });
            })
    }
}

export const delete_repersentative = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/representative/deleteRepresentative', values)
            .then((res) => {
                dispatch({ type: "DELETE_REPRESENTATIVE", payload: values.objectId });
            })
            .catch((error) => {
                dispatch({ type: "DELETE_REPRESENTATIVE_FAILURE", payload: error });
            })
    }
}


export const get_rep_by_terrotory = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/representative/representativeByTeriitory', values)
            .then((res) => {
                dispatch({ type: "TERRITORY_REPRESENTATIVE", payload: res.data.content })
            })
            .catch((error) => {
                dispatch({ type: "TERRITORY_REPRESENTATIVE_FAILURE", payload: error })
            })
    }
}

export const sendEmail = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/representative/sendEmail', values)
            .then((res) => {
                console.log(res, 'respnse in action');
                // dispatch({ type: "EMAIL_SEND", payload: res.data.content })
            })
            .catch((error) => {
                // dispatch({ type: "EMAIL_SEND_FAILURE", payload: error })
            })
    }
}