import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// import SettingsMenu from './components/settings/SettingsMenu';
// import Frequencies from './componenets/settings/frequencies/Frequencies';
// import Frequency from './componenets/settings/frequencies/Frequency';
import TrackerHomeContainer from './containers/TrackerHomeContainer';

/** Handles the main logic for the tracker things */
export default class Tracker extends Component {
  render() {
    return (
      <Switch>
        <Route path="/tracker" component={TrackerHomeContainer} />
      </Switch>
    );
  }
}

/* <Route path="/tracker/settings/frequencies/edit" component={Frequency} />
<Route path="/tracker/settings/frequencies" component={Frequencies} />
<Route path="/tracker/settings" component={SettingsMenu} /> */
