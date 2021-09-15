
const initialState = {
    allRepresentatives: null,
    territoryRepresen: null
}

const representativeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ALL_REPRESENTATIVES": {
            return {
                ...state,
                allRepresentatives: [...action.payload]
            }
        }
        case "ADD_REPRESENTATIVE": {
            return {
                ...state,
                allRepresentatives: [action.payload, ...state.allRepresentatives]
            }
        }
        case "UPDATE_REPRESENTATIVE": {
            const arr = [...state.allRepresentatives]
            for (var i = 0; i < arr.length; i++) {
                if (arr[i]._id === action.payload[0]._id) {
                    arr[i] = action.payload[0]
                }
            }
            return { ...state, allRepresentatives: [...arr] }
        }

        case "DELETE_REPRESENTATIVE": {
            const arr = [...state.allRepresentatives]
            for (var i = 0; i < arr.length; i++) {
                if (arr[i]._id === action.payload) {
                    arr.splice(i, 1)
                }
            }
            return {
                ...state,
                allRepresentatives: [...arr]
            }
        }
        case "TERRITORY_REPRESENTATIVE": {
            return {
                ...state,
                territoryRepresen: [...action.payload]
            }
        }

        default: {
            return state;
        }
    }
}

export default representativeReducer;