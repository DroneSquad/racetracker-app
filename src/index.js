/*
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 *
 */

// TODO: best location for this information
// window.ds_settings = {
//   api: 'https://staging.dronesquad.com/api/',
//   raw_api: 'https://staging.dronesquad.com/',
//   www: 'https://dronesquad.com/',
// };

// required for redux-saga es6 generator support
//import 'babel-polyfill'; todo enable if we have problems

// import third party items
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Loading from './components/app/loading/Loading';

// css styling
import 'mdi/css/materialdesignicons.css';
import './styles/dronesquad.css';
// material-ui needs this for the onTouchTap plugin
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// keep all urls under hashbang
window.history.replaceState(null, document.title, '/' + (window.location.hash || '#!/'));

// root dom element to attach application
const appEl = document.getElementById('app');

// initial render: displays loading screen while device/app are prepared
ReactDOM.render(
  <AppContainer>
    <Loading isLoading={true} />
  </AppContainer>,
  appEl
);

// hot module swapping for development
if (module.hot) {
  module.hot.accept('./components/app/loading/Loading', () => {
    ReactDOM.render(
      <AppContainer>
        <Loading isLoading={false} />
      </AppContainer>,
      appEl
    );
  });
}
