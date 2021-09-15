
const initialState = {
    allTerritorys: null
}

const territoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_TERRITORY_SUCCESS": {
            const arr = [...state.allTerritorys]
            for(var i =0; i<arr.length; i++){
                if(arr[i]._id===action.territory[0]._id){
                    arr[i] = action.territory[0]
                }
            }
            return { ...state, allTerritorys: [...arr] }
        }

        case "ALL_TERRITORY": {
            return {
                ...state,
                allTerritorys: [...action.payload]
            }
        }
        case "ADD_TERRITORY": {
            return {
                ...state,
                allTerritorys: [action.payload, ...state.allTerritorys]
            }
        }
        case "DELETE_TERRITORY": {
            const arr = [...state.allTerritorys]
            for (var i = 0; i < arr.length; i++) {
                if (arr[i]._id === action.payload) {
                    arr.splice(i, 1)
                }
            }
            return {
                ...state,
                allTerritorys: [...arr]

            }
        }
        default: {
            return state;
        }
    }
}

export default territoryReducer;