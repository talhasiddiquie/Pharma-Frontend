
const initialState = {
    allDesignations: null
}

const designationReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_DESIGNATION": {
            return {
                ...state,
                allDesignations: [action.payload, ...state.allDesignations]
            }
        }
        case "ALL_DESIGNATION": {
            return { 
                ...state, 
                allDesignations: action.payload 
            }
        }
        default: {
            return state;
        }
    }
}

export default designationReducer;