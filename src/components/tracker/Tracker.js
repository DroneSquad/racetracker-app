import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import SettingsMenu from './settings/SettingsMenu';
import Frequencies from './settings/frequencies/Frequencies';
import Frequency from './settings/frequencies/Frequency';
import TrackerHome from './TrackerHome';

/** Handles the main logic for the tracker things */
export default class Tracker extends Component {
  render() {
    return (
      <Switch>
        <Route path="/tracker/settings/frequencies/edit" component={Frequency} />
        <Route path="/tracker/settings/frequencies" component={Frequencies} />
        <Route path="/tracker/settings" component={SettingsMenu} />
        <Route path="/tracker" component={TrackerHome} />
      </Switch>
    );
  }
}
