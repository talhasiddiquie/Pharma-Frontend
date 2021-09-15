const initialState = {
    allProducts: null
}

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_PRODUCTS": {
            const arr = [...state.allProducts]
            for(var i =0; i<arr.length; i++){
                if(arr[i]._id===action.payload[0]._id){
                    arr[i] = action.payload[0]
                }
            }
            return { ...state, allProducts: [...arr] }
        }
        case "ALL_PRODUCTS": {
            return { 
                ...state,
                allProducts:[...action.payload] 
            }
        }
        case "ADD_PRODUCTS": {
            return { 
                ...state,
                allProducts: [action.payload, ...state.allProducts]
            }
        }
     
        case "DELETE_PRODUCT": {
            const arr = [...state.allProducts]
            for (var i = 0; i < arr.length; i++) {
                if (arr[i]._id === action.payload) {
                    arr.splice(i, 1)
                }
            }
            return {
                ...state,
                allProducts: [...arr]
            }
        }

        default: {
            return state;
        }
    }
}

export default productsReducer;