const initialState = {
    employeesAttendaces: null,
}

const employeeAttendanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ALL_EMPLOYEE_ATENDANCE": {
            return {
                ...state,
                employeesAttendaces: [...action.payload]
            }
        }
        case "EMPLOYEE_ATENDANCE": {
            return {
                ...state,
                employeesAttendaces: [...state.employeesAttendaces , action.payload]
            }
        }

        case "UPDATE_EMPLOYEE_ATENDANCE": {
            const arr = [...state.employeesAttendaces]
            for (var i = 0; i < arr.length; i++) {
                if (arr[i]._id === action.payload[0]._id) {

                    arr[i] = action.payload[0]
                }
            }
            return { ...state, employeesAttendaces: [...arr] }
        }

        default: {
            return state;
        }
    }
}

export default employeeAttendanceReducer;