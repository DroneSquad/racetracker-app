import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Frequencies from './components/settings/frequencies/Frequencies';
import Frequency from './components/settings/frequencies/Frequency';
import SettingsMenu from './components/settings/SettingsMenu';
import TrackerHome from './containers/TrackerHomeContainer';


/** Handles the main logic for the tracker things */
export default class Tracker extends Component {
  render() {
    return (
      <Switch>
        <Route path="/tracker/settings/frequencies/edit" component={Frequency} />
        <Route path="/tracker/settings/frequencies" component={Frequencies} />*/
        <Route path="/tracker/settings" component={SettingsMenu} />
        <Route path="/tracker" component={TrackerHome} />
      </Switch>
    );
  }
}
