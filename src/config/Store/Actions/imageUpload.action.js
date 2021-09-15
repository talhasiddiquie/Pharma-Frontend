import axios from 'axios';
import ApiService from '../../ApiService';

export const upload_image = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/attachmnets/uploadAttachments', values, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then((res) => {
            dispatch({ type: "UPLOAD_IMAGE", payload: res.data });
        }).catch((error) => {
            dispatch({ type: "UPLOAD_IMAGE_FAILURE", payload: error });
        })
    }
}