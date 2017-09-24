import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import AuthRoute from './AuthRoute';
import RecoverySnackbar from './containers/RecoverySnackbarContainer';

import Main from './components/Main';
import Forgot from '../../routes/login/containers/ForgotContainer';
import Register from '../../routes/login/containers/RegisterContainer';
import Login from '../../routes/login/containers/LoginContainer';
import Tracker from '../../routes/tracker';
import NewGuest from '../../routes/people/components/NewGuest';
import NewPilot from '../../routes/people/components/NewPilot';
import People from '../../routes/people/containers/PeopleContainer';
import HeatLineUp from '../../routes/fly/components/HeatLineUp';
import HeatResultEdit from '../../routes/fly/components/HeatResultEdit';

/** This is the main app that the user will see, one will get here after loading is done */
export default class App extends React.Component {
  /** This will render full screen pages that need different layouts */
  render() {
    let { history } = this.props;
    return (
      <div>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/account/forgot*" component={Forgot} />
            <Route path="/account/register*" component={Register} />
            <Route path="/account/login*" component={Login} />
            <AuthRoute path="/people/guest/new" component={NewGuest} />
            <AuthRoute path="/people/new" component={NewPilot} />
            <AuthRoute path="/people" component={People} />
            <AuthRoute path="/fly/heat/results/edit" component={HeatResultEdit} />
            <AuthRoute path="/fly/heat/edit" component={HeatLineUp} />
            <AuthRoute path="/tracker" component={Tracker} />
            <AuthRoute path="/" component={Main} />
          </Switch>
        </ConnectedRouter>
        <RecoverySnackbar />
      </div>
    );
  }
}
