import config from './config.json';
import url from 'url';
import { get, post } from 'axios';

/** The API class will handle all the requests to the API server */
export class Api {
  constructor() {
    this._config = {...config, lb: url.resolve(config.api, '/api/')};
    this._token = null;
  }

  static get() {
    if (!Api._instance) {
      Api._instance = new Api();
    }
    return Api._instance;
  }

  /** Create the request, todo add error handling and add middleware */
  request(base, endpoint, options) {
    let url_string = url.resolve(this._config.lb, endpoint);
    return base(url_string, options).then(request => ({...request.data, $request: request}));
  }

  /** Pilots endpoint */
  pilots = {
    /** Login the user, payload is {email, password} */
    login: (email, password) => {
      // auth: email, password
      return this.request(post, 'pilots/login', {email: email, password: password}).then(json => {
        this._token = {
          hash: json.id,
          ttl: json.ttl,
          pilot: json.userId,
        };
        return json;
      });
    },

    /** If the user login token is set, logout the user on the server side */
    logout: token => {
      return this.request(post, `pilots/logout?access_token=${token || this._token.hash}`).then(json => {
        if (!token) {
          this._token = null;
        }
        return json;
      });
    },

    /** Create a new account */
    register: (firstName, lastName, callsign, email, password) => {
      return this.request(post, 'pilots', {
        firstName: firstName,
        lastName: lastName,
        callsign: callsign,
        email: email,
        password: password,
      });
    },

    /** Send a password reset link for the account */
    forgot: email => {
      return this.request(post, 'pilots/reset', {email: email});
    },
  }
}

export default Api.get();
