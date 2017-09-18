// @flow
import React from 'react';
import FlatButton from 'material-ui/FlatButton';

import './account.css';

export default class Logout extends React.PureComponent {
  props: {
    token: state.auth.token,
    authLogout: Function
  };

  onClick = event => {
    console.log('logout');
    console.log(this.props.token);
    this.props.authLogout(this.props.token.token);
  };

  render() {
    return (
      <div>
        <FlatButton label="Logout" onClick={this.onClick} />
      </div>
    );
  }
}
