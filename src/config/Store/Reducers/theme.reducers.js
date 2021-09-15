const initialState= {
    blackAndWhiteTheme:false,
}

const themeReducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET_BLACK/WHITE_THEME": {
            return {...state, blackAndWhiteTheme: action.payload}
        }
        default: {
            return state;
        }
    }
}

export default themeReducer;