import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class SessionService {
    // static createSession(username, token) {
    //   let session = { username };
    //   localStorage.setItem('session', JSON.stringify(session));
    //   localStorage.setItem('authorization', token);
    //   return session;
    // }

    static setSession(username) {
        let session = { username };
        cookies.set('data', username);
        return session;
    }

    static setSessionDoc(data) {
        let session = { data };
        cookies.set('docData', data);
        return session;
    }

    static getSession() {
        var userData = cookies.get('data')

        return userData;
    }

    static getDocSession() {
        var userData = cookies.get('docData')

        return userData;
    }

    // static getAuthorization() {
    //   let token = localStorage.getItem('authorization');
    //   return token;
    // }

    // static clearSession() {
    //   localStorage.removeItem('session');
    //   localStorage.removeItem('authorization');
    // }

}
