
const initialState = {
    allCompanies: null
}

const companyReducer = (state = initialState, action) => {
    switch (action.type) {
       
        
        case "UPDATE_COMPANY_SUCCESS": {
            const arr = [...state.allCompanies]
            for(var i =0; i<arr.length; i++){
                if(arr[i]._id===action.company[0]._id){
                    arr[i] = action.company[0]
                }
            }
            return { ...state, allCompanies: [...arr] }
        }
        case "ALL_COMPANY": {
            return {
                ...state,
                allCompanies: [...action.payload]
            }
        }
        case "ADD_COMPANY": {
            return {
                ...state,
                allCompanies: [action.payload, ...state.allCompanies]
            }
        }
        case "DELETE_COMPANY": {
            const arr = [...state.allCompanies]
            for (var i = 0; i < arr.length; i++) {
                if (arr[i]._id === action.payload) {
                    arr.splice(i, 1)
                }
            }
            return {
                ...state,
                allCompanies: [...arr]

            }
        }
        default: {
            return state;
        }
    }
}

export default companyReducer;