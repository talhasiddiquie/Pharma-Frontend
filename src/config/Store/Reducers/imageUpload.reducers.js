
const initialState = {
    image: null
}

const imageReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPLOAD_IMAGE": {
            if (action.payload.code === 200) {
                return { ...state, image: action.payload.content.fileName }
            }
            else {
                return { ...state, image: null }
            }
        }
        default: {
            return state;
        }
    }
}

export default imageReducer;