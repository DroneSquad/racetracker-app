import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import Main from './main/Main';
import Login from './login/Login';
import Tracker from '../tracker/Tracker';
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
          <Route path="/fly/heat/results/edit" component={HeatResultEdit} />
          <Route path="/fly/heat/edit" component={HeatLineUp} />
          <Route path="/tracker" component={Tracker} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Main} />
        </Switch>
      </ConnectedRouter>
    );
  }
}
