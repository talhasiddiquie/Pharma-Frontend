
const initialState = {
    allZones: null
}

const zoneReducer = (state = initialState, action) => {
    switch (action.type) {

        case "UPDATE_ZONE_SUCCESS": {
            const arr = [...state.allZones]
            for (var i = 0; i < arr.length; i++) {
                if (arr[i]._id === action.zone[0]._id) {
                    arr[i] = action.zone[0]
                }
            }
            return { ...state, allZones: [...arr] }
        }
        case "ALL_ZONE": {
            return {
                ...state,
                allZones: [...action.payload]
            }
        }
        case "ADD_ZONE": {
            return {
                ...state,
                allZones: [action.payload, ...state.allZones]
            }
        }
        case "DELETE_ZONE": {
            const arr = [...state.allZones]
            for (var i = 0; i < arr.length; i++) {
                if (arr[i]._id === action.payload) {
                    arr.splice(i, 1)
                }
            }
            return {
                ...state,
                allZones: [...arr]

            }
        }
        default: {
            return state;
        }
    }
}

export default zoneReducer;