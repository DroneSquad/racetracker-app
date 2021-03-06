import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import configStore from '../../../store';
import App from '../App';

import loadingImg from '../../../media/ds-full-logo-spin.svg';
import './loading.css';

/**
 * This will load the initial screen and then decided what to do from there
 * this can be user login or handle the action after a deeplink or push notification
 */
export default class Loading extends React.PureComponent {
  constructor(props) {
    // Handle all the loading logic
    super(props);
    this.history = createHistory({
      // Make the urls in a hashbang format for reasons we are not running on a real web server
      hash: 'hashbang',
      basename: '#!'
    });
    this.state = {
      callback: this.defaultCallback,
      isLoading: true
    };
  }

  /** Runs when the device is ready, additional checks should happen here */
  onDeviceReady = () => {
    this.setState({ isLoading: false });
  };

  /** Handles the logic for how the app should load */
  componentWillMount() {
    // have cordova device ready event call a action to allow the loading screen to advance
    // if not in cordova we will fake it for 0.5 seconds
    window.document.addEventListener('deviceready', this.onDeviceReady, false);
  }

  componentWillUnmount() {
    window.document.removeEventListener('deviceready', this.onDeviceReady);
  }

  /** Update the mui theme settings to match drone squad color scheme */
  muiTheme = getMuiTheme({
    palette: {
      primary1Color: 'var(--ds-blue)',
      primary2Color: 'var(--ds-light-blue)',
      primary3Color: '#ccc',
      accent1Color: 'var(--ds-light-blue-alt)',
      accent2Color: 'var(--ds-blue-alt)',
      accent3Color: '#aaa'
    }
  });

  /** The default callback that will open the app */
  defaultCallback = () =>
    <Provider store={configStore(this.history).store}>
      <PersistGate persistor={configStore(this.history).persistor}>
        <MuiThemeProvider muiTheme={this.muiTheme}>
          <App history={this.history} />
        </MuiThemeProvider>
      </PersistGate>
    </Provider>;

  render() {
    // While the app is loading display the spinner
    if (this.state.isLoading) {
      return (
        <div className="loading">
          <img src={loadingImg} className="logo" alt="" />
        </div>
      );
    }
    // When the app is done loading, display the proper component
    return this.state.callback();
  }
}
