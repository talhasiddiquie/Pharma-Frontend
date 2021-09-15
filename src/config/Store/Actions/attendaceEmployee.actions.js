import axios from 'axios';
import ApiService from '../../ApiService';

export const add_employee_attendance = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/attendace/postEmployeeAttendace', values)
            .then((res) => {
                dispatch({ type: "EMPLOYEE_ATENDANCE", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "EMPLOYEE_ATENDANCE_FAILURE", payload: error });
            })
    }
}

export const update_employee_attendance = (values) => {
    return (dispatch) => {
        axios.post(ApiService.getBaseUrl() + '/attendace/postEmployeeAttendace', values)
            .then((res) => {
                dispatch({ type: "UPDATE_EMPLOYEE_ATENDANCE", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "UPDATE_EMPLOYEE_ATENDANCE_FAILURE", payload: error });
            })
    }
}


export const get_employee_attendances = () => {
    return (dispatch) => {
        axios.get(ApiService.getBaseUrl() + '/attendace/getEmployeesAttendaces')
            .then((res) => {
                dispatch({ type: "ALL_EMPLOYEE_ATENDANCE", payload: res.data.content });
            })
            .catch((error) => {
                dispatch({ type: "ALL_EMPLOYEE_ATENDANCE_FAILURE", payload: error });
            })
    }
}