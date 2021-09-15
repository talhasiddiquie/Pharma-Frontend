
const initialState = {
    allSpecialities: null
}

const specialityReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_SPECIALITY": {
            return {
                ...state,
                allSpecialities: [action.payload, ...state.allSpecialities]
            }
        }
        case "ALL_SPECIALITYS": {
            return {
                ...state, 
                allSpecialities: action.payload 
            }
        }
        default: {
            return state;
        }
    }
}

export default specialityReducer;