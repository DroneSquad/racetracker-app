import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SettingsMenu from './settings/SettingsMenu';
import Frequencies from './frequencies/Frequencies';
import Frequency from './frequencies/Frequency';

/** Test component to view the other views */
class TrackerHome extends React.Component {
  render() {
    return (
      <div>Home for Tracker</div>
    );
  }
}

/** Handles the main logic for the tracker things */
export default class Tracker extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/tracker/settings" component={SettingsMenu}/>
        <Route path="/tracker/frequencies/edit" component={Frequency}/>
        <Route path="/tracker/frequencies" component={Frequencies}/>
        <Route path="/tracker" component={TrackerHome}/>
      </Switch>
    );
  }
}
