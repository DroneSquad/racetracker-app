import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';

import logo from '../../../media/ds-full-logo-horizontal.svg';

/** This is the main screen of the app, this will display the routes for the buttons */
export default class extends Component {

  render() {
    return (
      <AppBar title={<img className="logo" src={logo} alt="" onClick={this.onDeveloperMode} />} {...this.props} />
    );
  }
}
