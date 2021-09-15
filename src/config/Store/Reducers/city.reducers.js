
const initialState = {
    allCities: null
}

const cityReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_CITY_SUCCESS": {
            const arr = [...state.allCities]
            for (var i = 0; i < arr.length; i++) {
                if (arr[i]._id === action.city[0]._id) {
                    arr[i] = action.city[0]
                }
            }
            return { ...state, allCities: [...arr] }
        }
        case "ALL_CITY": {
            return {
                ...state,
                allCities: [...action.payload]
            }
        }
        case "ADD_CITY": {
            return {
                ...state,
                allCities: [action.payload, ...state.allCities]
            }
        }
        case "DELETE_CITY": {
            const arr = [...state.allCities]
            for (var i = 0; i < arr.length; i++) {
                if (arr[i]._id === action.payload) {
                    arr.splice(i, 1)
                }
            }
            return {
                ...state,
                allCities: [...arr]

            }
        }
        default: {
            return state;
        }
    }
}

export default cityReducer;