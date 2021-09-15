
const initialState = {
    allHospitals: null
}

const hospitalReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_HOSPITAL": {
            const arr = [...state.allHospitals]
            for(var i =0; i<arr.length; i++){
                if(arr[i]._id===action.payload[0]._id){
                    arr[i] = action.payload[0]
                }
            }
            return { ...state, allHospitals: [...arr] }
        }
        case "ALL_HOSPITALS": {
            return {
                ...state,
                allHospitals: [...action.payload]
            }
        }
        case "ADD_HOSPITAL": {
            return {
                ...state,
                allHospitals: [action.payload, ...state.allHospitals]
            }
        }
        
        case "DELETE_HOSPITAL": {
            const arr = [...state.allHospitals]
            for (var i = 0; i < arr.length; i++) {
                if (arr[i]._id === action.payload) {
                    arr.splice(i, 1)
                }
            }
            return {
                ...state,
                allHospitals: [...arr]

            }
        }
        default: {
            return state;
        }
    }
}

export default hospitalReducer;