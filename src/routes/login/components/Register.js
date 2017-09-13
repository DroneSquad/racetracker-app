// @flow
import React from 'react';
import { Link } from 'react-router-dom';

import { Snackbar } from 'material-ui';

import loginImg from '../../../media/ds-full-logo.svg';
import loadingImg from '../../../media/ds-full-logo-spin.svg';
import './account.css';

/** This handles the view of the login window */
export default class Register extends React.PureComponent {
  props: {
    registerLogin: Function,
    error: Object,
    message: string
  };

  /** Handle the login logic */
  onSubmit = event => {
    event.preventDefault();
    this._submit.focus();
    const firstname = this._firstName.value;
    const lastname = this._lastName.value;
    const callsign = this._callsign.value;
    const email = this._email.value;
    const password = this._password.value;
    const reg = {
      firstname: firstname,
      lastname: lastname,
      callsign: callsign,
      email: email,
      password: password
    };
    this.props.registerLogin(reg);
    return false;
  };

  /** Remove the error class from the element */
  onChange = () => {
    this._firstName.classList.remove('error');
    this._lastName.classList.remove('error');
    this._callsign.classList.remove('error');
    this._email.classList.remove('error');
    this._password.classList.remove('error');
  };

  render() {
    let { error, loading, message } = this.props;

    return (
      <form className="account" method="post" onSubmit={this.onSubmit}>
        <img src={loading ? loadingImg : loginImg} className="logo" alt="" />
        <input
          onChange={this.onChange}
          className={error ? 'error' : ''}
          ref={ref => (this._firstName = ref)}
          type="text"
          placeholder="First Name"
          required
        />
        <input
          onChange={this.onChange}
          className={error ? 'error' : ''}
          ref={ref => (this._lastName = ref)}
          type="text"
          placeholder="Last Name"
          required
        />
        <input
          onChange={this.onChange}
          className={error ? 'error' : ''}
          ref={ref => (this._callsign = ref)}
          type="text"
          placeholder="Callsign"
          required
        />
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
        <input
          ref={ref => (this._submit = ref)}
          type="submit"
          value={loading ? 'Signing up...' : 'Sign up'}
        />
        <div className="center-text ds-white-text">Have a Drone Squad Account?</div>
        <Link className="btn" to="/account/login">
          Sign in
        </Link>
        <Snackbar open={!!message} message={message} autoHideDuration={5000} />
      </form>
    );
  }
}
