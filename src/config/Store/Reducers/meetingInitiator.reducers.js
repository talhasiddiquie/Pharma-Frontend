const initialState = {
    meetings: null,
}

const meetingInitiateReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_MEETING_INITIATE": {
            return {
                ...state,
                meetings: [action.payload , ...state.meetings]
            }
        }
        case "ALL_MEETING_INITIATE": {
            return {
                ...state,
                meetings: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export default meetingInitiateReducer;