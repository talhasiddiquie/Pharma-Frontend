
const initialState = {
    allSurvey: null,
}

const surveyReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ALL_SURVEYS": {
            return {
                ...state,
                allSurvey: [...action.payload]
            }
        }
        case "ADD_SURVEY": {
            return {
                ...state,
                allSurvey: [action.payload, ...state.allSurvey]
            }
        }
        case "UPDATE_SURVEY": {
            const arr = [...state.allSurvey]
            for (var i = 0; i < arr.length; i++) {
                if (arr[i]._id === action.payload[0]._id) {
                    arr[i] = action.payload[0]
                }
            }
            return { ...state, allSurvey: [...arr] }
        }

        case "DELETE_SURVEY": {
            const arr = [...state.allSurvey]
            for (var i = 0; i < arr.length; i++) {
                if (arr[i]._id === action.payload) {
                    arr.splice(i, 1)
                }
            }
            return {
                ...state,
                allSurvey: [...arr]
            }
        }
        default: {
            return state;
        }
    }
}

export default surveyReducer;