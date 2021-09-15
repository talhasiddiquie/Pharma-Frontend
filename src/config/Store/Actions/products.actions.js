import axios from 'axios';
import ApiService from '../../ApiService';

export const get_all_products = () => {
    return (dispatch) => {
        axios.get(ApiService.getBaseUrl() + '/products/getProducts')
            .then((res) => {
                dispatch({ type: "ALL_PRODUCTS", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ALL_PRODUCTS_FAILURE", payload: error });
            })
    }
}

export const add_product = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/products/postProduct', values)
            .then((res) => {
                dispatch({ type: "ADD_PRODUCTS", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ADD_PRODUCTS_FAILURE", payload: error });
            })
    }
}

export const update_product = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/products/postProduct', values)
            .then((res) => {
                dispatch({ type: "UPDATE_PRODUCTS", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "UPDATE_PRODUCTS_FAILURE", payload: error });

            })
    }
}

export const delete_product = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/products/deleteProduct', values)
            .then((res) => {
                dispatch({ type: "DELETE_PRODUCT", payload: values.objectId });
            })
            .catch((error) => {
                dispatch({ type: "DELETE_PRODUCT_FAILURE", payload: error });
            })
    }
}