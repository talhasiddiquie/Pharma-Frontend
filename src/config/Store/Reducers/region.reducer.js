
const initialState = {
    allRegions: null
}

const regionReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_REGION_SUCCESS": {
            const arr = [...state.allRegions]
            for(var i =0; i<arr.length; i++){
                if(arr[i]._id===action.region[0]._id){
                    arr[i] = action.region[0]
                }
            }
            return { ...state, allRegions: [...arr] }
        }
        case "ALL_REGION": {
            return {
                ...state,
                allRegions: [...action.payload]
            }
        }
        case "ADD_REGION": {
            return {
                ...state,
                allRegions: [action.payload, ...state.allRegions]
            }
        }
        case "DELETE_REGION": {
            const arr = [...state.allRegions]
            for (var i = 0; i < arr.length; i++) {
                if (arr[i]._id === action.payload) {
                    arr.splice(i, 1)
                }
            }
            return {
                ...state,
                allRegions: [...arr]

            }
        }
        default: {
            return state;
        }
    }
}

export default regionReducer;