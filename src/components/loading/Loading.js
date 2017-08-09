import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';

import configStore from '../../store';
import App from '../app/App';

import './loading.css'
import loadingImg from '../../media/ds-full-logo-spin.svg';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

/**
 * This will load the initial screen and then decided what to do from there
 * this can be user login or handle the action after a deeplink or push notification
 */
export default class Loading extends React.PureComponent {

  /** Update the mui theme settings to match drone squad color scheme */
  muiTheme = getMuiTheme({
    palette: {
      primary1Color: 'var(--ds-blue)',
      accent1Color: 'var(--ds-blue-alt)',
    },
  });

  constructor(props) {
    // Handle all the loading logic
    super(props);
    let history = createHistory();
    this.state = {
      callback: () => (
        <Provider store={configStore(history)}>
          <MuiThemeProvider muiTheme={this.muiTheme}>
            <App history={history}/>
          </MuiThemeProvider>
        </Provider>
      ),
      isLoading: true,
    };
    // have cordova device ready event call a action to allow the loading screen to advance
    // if not in cordova we will fake it for 0.5 seconds
    window.document.addEventListener("deviceready", () => {
      this.setState(state => ({isLoading: false}));
    }, false);
  }


  render() {
    // While the app is loading display the spinner
    if (this.state.isLoading) {
      return (
        <div className="loading">
          <img src={loadingImg} className="logo" alt=""/>
        </div>
      );
    }
    // When the app is done loading display the proper component
    return this.state.callback();
  }
}


// Import root routes TODO: best way to handle this in v4
//import createRoutes from './routes';

// Set up the router, wrapping all Routes in the App component
//const rootRoute = {
//  component: App,
//  childRoutes: createRoutes(store),
//};

// UNUSED AS OF NOW TODO: add hot-swap
// Hot reloadable translation json files
// if (module.hot) {
//  // modules.hot.accept does not accept dynamic dependencies,
//  // have to be constants at compile-time
//  module.hot.accept('./i18n', () => {
//    render(translationMessages);
//  });
//}
