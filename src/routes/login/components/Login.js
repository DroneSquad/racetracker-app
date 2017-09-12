// @flow
import React from 'react';
import { Redirect } from 'react-router-dom';

import loginImg from '../../../media/ds-full-logo.svg';
import loadingImg from '../../../media/ds-full-logo-spin.svg';
import './login.css';

/** This handles the view of the login window */
export default class Login extends React.PureComponent {
  props: {
    authLogin: Function,
    token: Object,
    error: Object
  };

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /** Handle the login logic */
  onSubmit(event) {
    event.preventDefault();
    this._loading = true;
    const login = this._email.value;
    const password = this._password.value;
    const cert = { login: login, password: password };
    this.props.authLogin(cert);
    return false;
  }

  /** Remove the error class from the element */
  onChange() {
    this._email.classList.remove('error');
    this._password.classList.remove('error');
  }

  render() {
    let { token, error, location } = this.props;
    if (token) {
      // Redirect to the place where we want to go to
      let to = (location.search || '').split('redirect=')[1] || '/';
      return <Redirect to={to} />;
    }
    if (error) {
      this._loading = false;
    }

    return (
      <form className="login" method="post" onSubmit={this.onSubmit}>
        <img src={this._loading ? loadingImg : loginImg} className="logo" alt="" />
        <input type="hidden" value="prayer" />
        <input
          onChange={this.onChange}
          className={error ? 'error' : ''}
          ref={ref => (this._email = ref)}
          type="email"
          placeholder="Email"
          required
        />
        <input
          onChange={this.onChange}
          className={error ? 'error' : ''}
          ref={ref => (this._password = ref)}
          type="password"
          placeholder="Password"
          required
        />
        <input type="submit" value={this._loading ? 'Signing in...' : 'Sign in'} />
        <br />
        <a
          className="link"
          rel="noopener noreferrer"
          target="_blank"
          href="https://dronesquad.com/account/register"
        >
          Sign up for a Drone Squad account!
        </a>
      </form>
    );
  }
}
