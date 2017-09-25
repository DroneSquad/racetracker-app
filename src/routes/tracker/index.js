import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// import Frequencies from './componenets/settings/frequencies/Frequencies';
// import Frequency from './componenets/settings/frequencies/Frequency';
import TrackerHome from './containers/TrackerHomeContainer';
import SettingsMenu from './components/settings/SettingsMenu';

/** Handles the main logic for the tracker things */
export default class Tracker extends Component {
  render() {
    return (
      <Switch>
        <Route path="/tracker/settings" component={SettingsMenu} />
        <Route path="/tracker" component={TrackerHome} />
      </Switch>
    );
  }
}

/* <Route path="/tracker/settings/frequencies/edit" component={Frequency} />
<Route path="/tracker/settings/frequencies" component={Frequencies} />*/
