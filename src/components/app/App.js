import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import AuthRoute from '../../routes/AuthRoute';
import Main from './main/Main';
import Login from '../../routes/login/containers/LoginContainer';
import Tracker from '../tracker/Tracker';
import NewGuest from '../people/NewGuest';
import NewPilot from '../people/NewPilot';
import People from '../people/People';
import HeatLineUp from '../fly/HeatLineUp';
import HeatResultEdit from '../fly/HeatResultEdit';

/** This is the main app that the user will see, one will get here after loading is done */
export default class App extends React.Component {
  /** This will render full screen pages that need different layouts */
  render() {
    let { history } = this.props;
    return (
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <AuthRoute path="/people/guest/new" component={NewGuest} />
          <AuthRoute path="/people/new" component={NewPilot} />
          <AuthRoute path="/people" component={People} />
          <AuthRoute path="/fly/heat/results/edit" component={HeatResultEdit} />
          <AuthRoute path="/fly/heat/edit" component={HeatLineUp} />
          <AuthRoute path="/tracker" component={Tracker} />
          <AuthRoute path="/" component={Main} />
        </Switch>
      </ConnectedRouter>
    );
  }
}
