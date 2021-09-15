import axios from 'axios';
import ApiService from '../../ApiService';


export const get_all_surveys = () => {
    return (dispatch) => {
        axios.get(ApiService.getBaseUrl() + '/survey/getSurveys')
            .then((res) => {
                dispatch({ type: "ALL_SURVEYS", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ALL_SURVEYS_FAILURE", payload: error });
            })
    }
}

export const add_survey = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/survey/postSurvey', values)
            .then((res) => {
                dispatch({ type: "ADD_SURVEY", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ADD_SURVEY_FAILURE", payload: error });
            })
    }
}


export const update_survey = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/survey/postSurvey', values)
            .then((res) => {
                dispatch({ type: "UPDATE_SURVEY", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "UPDATE_SURVEY_FAILURE", payload: error });
            })
    }
}


export const delete_survey = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/survey/deleteSurvey', values)
            .then((res) => {
                dispatch({ type: "DELETE_SURVEY", payload: values.objectId });
            })
            .catch((error) => {
                dispatch({ type: "DELETE_SURVEY_FAILURE", payload: error });
            })
    }
}
