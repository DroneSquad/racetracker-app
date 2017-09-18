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
    this.props.authLogout(this.props.token);
  };

  render() {
    return (
      <div>
        <FlatButton label="Logout" onClick={this.onClick} />
      </div>
    );
  }
}
