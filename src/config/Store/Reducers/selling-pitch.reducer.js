
const initialState = {
    allSellingPitchs: null
}

const sellingPitchReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ALL_SELLING_PITCHS": {
            return { 
                ...state,
                allSellingPitchs:[...action.payload] 
            }
        }
        case "ADD_SELLING_PITCH": {
            return { 
                ...state,
                allSellingPitchs: [action.payload, ...state.allSellingPitchs]
            }
        }
        case "UPDATE_SELLING_PITCH": {
            const arr = [...state.allSellingPitchs]
            for(var i =0; i<arr.length; i++){
                if(arr[i]._id===action.payload[0]._id){
                    arr[i] = action.payload[0]
                }
            }
            return { ...state, allSellingPitchs: [...arr] }
        }

        case "DELETE_SELLING_PITCH": {
            const arr = [...state.allSellingPitchs]
            for (var i = 0; i < arr.length; i++) {
                if (arr[i]._id === action.payload) {
                    arr.splice(i, 1)
                }
            }
            return {
                ...state,
                allSellingPitchs: [...arr]
            }
        }

        default: {
            return state;
        }
    }
}

export default sellingPitchReducer;