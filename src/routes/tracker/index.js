import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Frequencies from './containers/settings/frequencies/FrequenciesContainer';
import Frequency from './containers/settings/frequencies/FrequencyContainer';
import SettingsMenu from './containers/settings/SettingsMenuContainer';
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
