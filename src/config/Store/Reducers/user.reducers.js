// import { useHistory } from 'react-router-dom';

const initialState = {
  user: null,
  allUsers: null,
  userLogedIn: null,
  forgotPassword: "",
};

// const history = useHistory();

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER": {
      return { ...state, user: action.data };
    }
    case "REMOVE_USER": {
      return { ...state, user: null };
    }
    case "ALL_USERS": {
      const emailsUsers = [];
      const arr = [...action.payload];
      for (var i = 0; i < arr.length; i++) {
        emailsUsers.push(arr[i]);
      }
      return {
        ...state,
        allUsers: emailsUsers,
      };
    }

    case "TOKEN_INVALID": {
      return {
        ...state,
        user: null,
      };
    }

    case "CREATE_USER": {
      const arr = [...state.allUsers];
      arr.push(action.payload);
      return {
        ...state,
        allUsers: arr,
      };
    }
    case "UPDATE_USER": {
      const arr = [...state.allUsers];
      for (var i = 0; i < arr.length; i++) {
        if (arr[i]._id === action.payload[0]._id) {
          arr[i] = action.payload[0];
        }
      }
      return { ...state, allUsers: [...arr] };
    }

    case "DELETE_USER": {
      const arr = [...state.allUsers];
      for (var i = 0; i < arr.length; i++) {
        if (arr[i]._id === action.payload) {
          arr.splice(i, 1);
        }
      }
      return {
        ...state,
        allUsers: [...arr],
      };
    }

    case "USER_LOGGED_IN": {
      return {
        ...state,
        userLogedIn: action.payload,
      };
    }

    case "USER_LOGGED_IN_CHECKED": {
      return {
        ...state,
        userLogedIn: action.payload,
      };
    }

    case "REDRIECT_TO_FORGOT_PASSWORD": {
      return {
        ...state,
        forgotPassword: action.load,
      };
    }

    case "LOGIN_USER": {
      return { ...state };
    }
    case "LOGIN_USER_SUCCESS": {
      return { ...state, user: action.user };
    }
    case "LOGIN_USER_FAILURE": {
      return { ...state, user: action.error };
    }
    case "FORGOT_PASSWORD": {
      return { ...state, user: action.error };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
