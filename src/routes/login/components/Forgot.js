// @flow
import React from 'react';
import { Link } from 'react-router-dom';

import { Snackbar } from 'material-ui';

import loginImg from '../../../media/ds-full-logo.svg';
import loadingImg from '../../../media/ds-full-logo-spin.svg';
import './account.css';

/** This handles the view of the forgot window */
export default class Forgot extends React.PureComponent {
  props: {
    forgotLogin: Function,
    error: Object,
    message: string
  };

  /** Handle the forgot logic */
  onSubmit = event => {
    event.preventDefault();
    this._submit.focus();
    const email = this._email.value;
    this.props.forgotLogin(email);
    return false;
  };

  /** Remove the error class from the element */
  onChange = () => {
    this._email.classList.remove('error');
  };

  render() {
    let { error, loading, message } = this.props;

    return (
      <form className="account" method="post" onSubmit={this.onSubmit}>
        <img src={loading ? loadingImg : loginImg} className="logo" alt="" />
        <input
          onChange={this.onChange}
          className={error ? 'error' : ''}
          ref={ref => (this._email = ref)}
          type="email"
          placeholder="Email"
          required
        />
        <input ref={ref => (this._submit = ref)} type="submit" value={loading ? 'Recovering...' : 'Recover'} />
        <div className="center-text ds-white-text">Remember your password now?</div>
        <Link className="btn" to="/account/login">
          Sign in
        </Link>
        <Snackbar open={!!message} message={message} autoHideDuration={5000} />
      </form>
    );
  }
}
