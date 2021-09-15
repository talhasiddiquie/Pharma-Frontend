import axios from 'axios';
import ApiService from '../../ApiService';

export const ChangeSnackFlag = (flag) => {
    return {
        type: "ChangeSnackFlag",
        payload: flag
    }
}

export const ChangeSnackData = (data) => {
    return {
        type: "ChangeSnackData",
        payload: data
    }
}

