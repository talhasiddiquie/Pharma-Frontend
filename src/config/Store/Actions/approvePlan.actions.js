import axios from 'axios';
import ApiService from '../../ApiService';

export const get_approved_workPlan = () => {
    return (dispatch) => {
        axios.get(ApiService.getBaseUrl() + '/approveWorkPlan/getApprovedWorkPlans')
            .then((res) => {
                dispatch({ type: "ALL_APPROVED_WORK_PLAN", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ALL_APPROVED_WORK_PLAN_FAILURE", payload: error });
            })
    }
}

export const add_approved_workPlan = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/approveWorkPlan/postApprovedWorkPlan', values)
            .then((res) => {
                dispatch({ type: "ADD_APPROVED_WORK_PLAN", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ADD_APPROVED_WORK_PLAN_FAILURE", payload: error });
            })
    }
}

export const update_approved_workPlan = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/approveWorkPlan/postApprovedWorkPlan', values)
            .then((res) => {
                dispatch({ type: "UPDATE_APPROVED_WORK_PLAN", workplan: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "UPDATE_APPROVED_WORK_PLAN_FAILURE", workplan: error });
            })
    }
}
