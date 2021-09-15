const initialState = {
    allDoctors: null,
    cityDoctors: null,

}

const doctorsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ALL_DOCTOR": {
            return {
                ...state,
                allDoctors: [...action.payload]
            }
        }
        case "ADD_DOCTOR": {
            return {
                ...state,
                allDoctors: [action.payload, ...state.allDoctors]
            }
        }
        case "UPDATE_DOCTOR": {
            const arr = [...state.allDoctors]
            for (var i = 0; i < arr.length; i++) {
                if (arr[i]._id === action.payload[0]._id) {
                    arr[i] = action.payload[0]
                }
            }
            return { ...state, allDoctors: [...arr] }
        }
        case "DELETE_DOCTOR": {
            const arr = [...state.allDoctors]
            for (var i = 0; i < arr.length; i++) {
                if (arr[i]._id === action.payload) {
                    arr.splice(i, 1)
                }
            }
            return {
                ...state,
                allDoctors: [...arr]
            }
        }
        case "ALL_DOCTORS_CITY": {
            if (action.cityDoctors.length > 0) {
                return {
                    ...state,
                    cityDoctors: action.cityDoctors
                }
            }
            else {
                return {
                    ...state,
                    cityDoctors: null
                }
            }
        }

        default: {
            return state;
        }
    }
}

export default doctorsReducer;