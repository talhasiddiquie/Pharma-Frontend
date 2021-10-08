export default class ApiService {
  static getBaseUrl = () => {
    let DEV_URL = "";
    // DEV_URL = 'https://vfield.co/api';
    // DEV_URL = "http://192.168.0.127:4001/api";
    DEV_URL = "http://192.168.0.127:4001/api";
    // https://vfieldpharma.herokuapp.com/api
    return DEV_URL;
  };
  //
  static socketBaseUrl = () => {
    let SOCKET_URL = "";
    // SOCKET_URL = "https://pure-peak-87401.herokuapp.com";
    return SOCKET_URL;
  };

  static getAssestUrl = () => {
    let IMAGE_URL = "";
    IMAGE_URL = "http://192.168.0.127:4001/assets/";
    return IMAGE_URL;
  };
}
