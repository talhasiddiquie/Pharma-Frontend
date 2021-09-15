import axios from 'axios';
import ApiService from '../../ApiService';

export const get_workPlan = () => {
    return (dispatch) => {
        axios.get(ApiService.getBaseUrl() + '/workPlans/getWorkPlans')
            .then((res) => {
                dispatch({ type: "ALL_WORK_PLAN", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ALL_WORK_PLAN_FAILURE", payload: error });
            })
    }
}

export const add_workPlan = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/workPlans/postWorkPlan', values)
            .then((res) => {
                dispatch({ type: "ADD_WORK_PLAN", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ADD_WORK_PLAN_FAILURE", payload: error });
            })
    }
}

export const update_workPlan = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/workPlans/postWorkPlan', values)
            .then((res) => {
                dispatch({ type: "UPDATE_WORK_PLAN", workplan: res.data.content });
                count_doctor_workPlan()
            })
            .catch((error) => {
                dispatch({ type: "UPDATE_WORK_PLAN_FAILURE", workplan: error });
            })
    }
}


export const count_doctor_workPlan = (value) => {
    return (dispatch) => {
        axios.get(ApiService.getBaseUrl() + '/workPlans/countsDoctors')
            .then((res) => {
                console.log(res, 'response doc count');
                dispatch({ type: "COUNT_WORK_PLAN", payload: res.data.doctorCount });
            })
            .catch((error) => {
                dispatch({ type: "COUNT_WORK_PLAN_FAILURE", payload: error });
            })
    }
}


// export const specific_workPlan = (values) => {
//     return (dispatch) => {
//         axios.post(ApiService.getBaseUrl() + '/workPlans/getSpecificWorkPlanByUserId', values)
//             .then((res) => {
//                 dispatch({ type: "SPECIFIC_WORK_PLAN", payload: res.data.content[0] });
//             })
//             .catch((error) => {
//                 dispatch({ type: "SPECIFIC_WORK_PLAN_FAILURE", payload: error });
//             })
//     }
// }