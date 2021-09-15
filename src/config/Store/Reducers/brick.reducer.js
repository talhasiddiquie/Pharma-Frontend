
const initialState = {
    allBricks: null,
}

const brickReducer = (state = initialState, action) => {

    switch (action.type) {
        case "ALL_BRICKS": {
            return {
                ...state,
                allBricks: [...action.payload],
               
            }
        }
        case "ADD_BRICKS": {
            console.log(action.payload , 'payload new add');
            console.log(...state.allBricks, 'allBricks');

            return {
                ...state,
                allBricks: [action.payload, ...state.allBricks]
            }
        }

        case "UPDATE_BRICKS": {
            const arr = [...state.allBricks]
            for (var i = 0; i < arr.length; i++) {
                if (arr[i]._id === action.payload[0]._id) {
                    arr[i] = action.payload[0]
                }
            }
            return { ...state, allBricks: [...arr] }
        }
        case "DELETE_BRICKS": {
            const arr = [...state.allBricks]
            for (var i = 0; i < arr.length; i++) {
                if (arr[i]._id === action.payload) {
                    arr.splice(i, 1)
                }
            }
            return {
                ...state,
                allBricks: [...arr]

            }
        }
        default: {
            return state;
        }
    }

}

export default brickReducer;