const initialState = {
  allProvinces: null,
};

const provinceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ALL_PROVINCE": {
      return {
        ...state,
        allProvinces: [...action.payload],
      };
    }
    case "ADD_PROVINCE": {
      return {
        ...state,
        allProvinces: [action.payload, ...state.allProvinces],
      };
    }
    case "UPDATE_PROVINCE": {
      const arr = [...state.allProvinces];
      for (var i = 0; i < arr.length; i++) {
        if (arr[i]._id === action.payload[0]._id) {
          arr[i] = action.payload[0];
        }
      }
      return { ...state, allProvinces: [...arr] };
    }
    case "DELETE_PROVINCE": {
      //   const arr = [...state.allProvinces];
      //   for (var i = 0; i < arr.length; i++) {
      //     if (arr[i]._id === action.payload) {
      //       arr.splice(i, 1);
      //     }
      //   }
      //   return {
      //     ...state,
      //     allRegions: [...arr],
      //   };
      const arr = [...state.allProvinces];
      const newArr = arr.filter((value) => value._id !== action.payload);
      return {
        ...state,
        allProvinces: newArr,
      };
    }
    default: {
      return state;
    }
  }
};

export default provinceReducer;
