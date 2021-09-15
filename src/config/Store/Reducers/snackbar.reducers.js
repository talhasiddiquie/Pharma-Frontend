
const initialState = {
    snackFlag: false,
    snackData:{}
}

const snackBarReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ChangeSnackFlag": {
            return { 
                ...state,
                snackFlag:action.payload 
            }
        }
        case "ChangeSnackData": {
            return { 
                ...state,
                snackData:action.payload 
            }
        }

        default: {
            return state;
        }
    }
}

export default snackBarReducer;