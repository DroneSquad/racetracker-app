import config from './config.json';
import url from 'url';
import axios from 'axios';

import { notNull } from '../../utils';

/** The API class will handle all the requests to the API server */
export class Api {
  constructor() {
    this._config = { ...config, lb: url.resolve(config.api, '/api/') };
    this._token = null;
    this._axios = axios.create({
      baseURL: this._config.lb
    });
  }

  static get() {
    if (!Api._instance) {
      Api._instance = new Api();
    }
    return Api._instance;
  }

  /** Create the request, todo add error handling and add middleware */
  request(base, endpoint, options) {
    return base(endpoint, options).then(request => ({ ...request.data, $request: request }));
  }

  /** Return urls for things, genneraly used for redirects or picture */
  urls = {
    /** Get the avatar for the pilot id oo the current pilot */
    avatar: id => {
      return url.resolve(this._config.api, `avatar/${id || this._token.pilot || notNull(id, 'id')}`);
    },

    /** Get the banner for the group */
    banner: id  => {
      return url.resolve(this._config.api, `banner/${notNull(id, 'id')}`);
    }
  };

  /** Pilots endpoint */
  pilots = {
    /** Login the user, payload is {email, password} */
    login: (email, password) => {
      return this.request(this._axios.post, 'pilots/login', {
        email: notNull(email, 'email'),
        password: notNull(password, 'password')
      }).then(json => {
        this._token = {
          hash: json.id,
          ttl: json.ttl,
          pilot: json.userId
        };
        this._axios.defaults.headers.common['Authorization'] = json.id;
        return json;
      });
    },

    /** If the user login token is set, logout the user on the server side */
    logout: token => {
      return this.request(this._axios.post, `pilots/logout?access_token=${token || this._token.hash}`).then(json => {
        if (!token) {
          this._token = null;
          delete this._axios.defaults.headers.common['Authorization'];
        }
        return json;
      });
    },

    /** Create a new account */
    register: (firstName, lastName, callsign, email, password) => {
      return this.request(this._axios.post, 'pilots', {
        firstName: notNull(firstName, 'firstName'),
        lastName: notNull(lastName, 'lastName'),
        callsign: notNull(callsign, 'callsign'),
        email: notNull(email, 'email'),
        password: notNull(password, 'password')
      });
    },

    /** Send a password reset link for the account */
    forgot: email => {
      return this.request(this._axios.post, 'pilots/reset', { email: notNull(email, 'email') });
    },

    /** Get the current groups for the pilot sorted by the location lat lng*/
    groups: (lat, lng) => {
      return this.request(this._axios.get, `pilots/${notNull(this._token.pilot, 'pilot')}/myRaceGroups`, {
        params: {
          lat: notNull(lat, 'lat'),
          lng: notNull(lng, 'lng')
        }
      });
    }
  };

  /** Get the pilot or the current logged in pilot */
  pilot = id => {
    return this.request(this._axios.get, `pilots/${id || this._token.pilot || notNull(id, 'id')}`);
  };

  /** Get the group from the id */
  group = id => {
    return this.request(this._axios.get, `raceGroups/${notNull(id, 'id')}`);
  };
}

export default Api.get();
