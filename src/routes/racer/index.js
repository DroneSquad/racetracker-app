import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import RacerDetails from './containers/RacerDetailsContainer';
import FourOhFour from '../../global/404/components/FourOhFour';

/** Handles the main logic for the tracker things */
export default class Racer extends Component {
  render() {
    return (
      <Switch>
        <Route path="/fly/racer/:heat/:racer" component={RacerDetails} />
        <Route path="/fly/racer*" component={FourOhFour} />
      </Switch>
    );
  }
}
