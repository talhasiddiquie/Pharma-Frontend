import axios from "axios";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const setAuthToken = () => {
    var userData = cookies.get('data')

    if (userData) {
        // Apply authorization token to every request if logged in
        axios.defaults.headers.common["Authorization"] = userData.tokens;
    }
    // else {
    //     // Delete auth header
    //     delete axios.defaults.headers.common["Authorization"];
    // }
};

export default setAuthToken;