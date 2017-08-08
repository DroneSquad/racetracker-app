import React from 'react';
import './loading.css'
import loadingImg from '../../media/ds-full-logo-spin.svg';
import createHistory from 'history/createBrowserHistory';
import { Provider, connect } from 'react-redux';

import configStore from '../../store';
import App from '../app/App';

/**
 * This will load the initial screen and then decided what to do from there
 * this can be user login or handle the action after a deeplink or push notification
 */
export default class Loading extends React.PureComponent {

  constructor(props) {
    // Handle all the loading logic
    super(props);
    let history = createHistory();
    this.state = {
      callback: () => (
        <Provider store={configStore(history)}>
          <App history={history}/>
        </Provider>
      ),
      isLoading: true,
    };
    // todo have cordova device ready event call a action to allow the loading screen to advance
    setTimeout(() => {
      this.setState(state => ({isLoading: false}));
    }, 1000);
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
