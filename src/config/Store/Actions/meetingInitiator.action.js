import axios from 'axios';
import ApiService from '../../ApiService';

export const add_meeting_initiate = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/meeting/postMeeting', values)
            .then((res) => {
                dispatch({ type: "ADD_MEETING_INITIATE", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ADD_MEETING_INITIATE_FAILURE", payload: error });
            })
    }
}


export const get_meeting_initiates = () => {
    return (dispatch) => {
        axios.get(ApiService.getBaseUrl() + '/meeting/getMeetings')
            .then((res) => {
                console.log(res, 'response');
                dispatch({ type: "ALL_MEETING_INITIATE", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ALL_MEETING_INITIATE_FAILURE", payload: error });
            })
    }
}