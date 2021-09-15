
const initialState = {
    allQulifications: null
}

const qulificationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_QULIFICATION": {
            return { 
                ...state,
                allQulifications: [action.payload, ...state.allQulifications]
            }
        }
        case "ALL_QULIFICATIONS": {
            return { 
                ...state, 
                allQulifications: action.payload 
            }
        }
        default: {
            return state;
        }
    }
}

export default qulificationsReducer;