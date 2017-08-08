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
import Loading from './components/loading/Loading'

// css styling
import 'mdi/css/materialdesignicons.css';
import './styles/dronesquad.css';
// material-ui needs this for the onTouchTap plugin
//import injectTapEventPlugin from 'react-tap-event-plugin' todo enable when we actually need this
//injectTapEventPlugin() t


ReactDOM.render(<Loading />, document.getElementById('app'));
