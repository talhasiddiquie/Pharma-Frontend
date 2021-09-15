import axios from 'axios';
import ApiService from '../../ApiService';

export const get_companies = () => {
    return (dispatch) => {
        axios.get(ApiService.getBaseUrl() + '/companies/getCompanies')
            .then((res) => {
                dispatch({ type: "ALL_COMPANY", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ALL_COMPANY_FAILURE", payload: error });
            })
    }
}


export const add_company = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/companies/postCompany', values)
            .then((res) => {
                dispatch({ type: "ADD_COMPANY", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ADD_COMPANY_FAILURE", payload: error });
            })
    }
}

export const update_company = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/companies/postCompany', values)
            .then((res) => {
                dispatch({ type: "UPDATE_COMPANY_SUCCESS", company: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "UPDATE_COMPANY_FAILURE", company: error });
            })
    }
}

export const delete_company = (value) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/companies/deleteCompany', value)
            .then((res) => {
                dispatch({ type: "DELETE_COMPANY", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "DELETE_COMPANY_FAILURE", payload: error });
            })
    }
}
