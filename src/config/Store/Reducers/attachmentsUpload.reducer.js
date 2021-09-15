
const initialState = {
    attachmentsFiles: null
}

const attachmentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPLOAD_ATTACHMENT": {
            if (action.payload.code === 200) {
                if(state.attachmentsFiles !== null){
                    const arr = [...state.attachmentsFiles]
                    arr.push(action.payload.content)
                    return {
                        ...state,
                        attachmentsFiles: [...arr]
                    }
                }
                else{
                    return {
                        ...state,
                        attachmentsFiles: [action.payload.content]
                    }
                }
            }
            else {
                return { ...state, attachmentsFiles: null }
            }
        }
        default: {
            return state;
        }
    }
}

export default attachmentsReducer;