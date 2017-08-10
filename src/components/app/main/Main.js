import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link, Route, Switch } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import FontIcon from 'material-ui/FontIcon';

import Chat from '../../chat/Chat';
import Home from '../../home/Home';
import FourOhFour from '../../404/FourOhFour';

import './main.css';

/** This is the main screen of the app, this will display the routes for the buttons */
class Main extends React.Component {
  render() {
    let { token } = this.props;

    if (!token) { // All content in main needs a valid token
      let to = `/login?redirect=${window.location.pathname}`;
      return <Redirect to={to} />;
    }

    // todo have the selected route change the bottom navigation index
    return (
      <content className="main">
        <header>
          <AppBar title="Drone Squad" iconElementLeft={<IconButton />}/>
        </header>

        <main>
          <Switch>
            <Route path="/chat" component={Chat} />
            <Route path="/404" component={FourOhFour} />
            <Route path="/" exact strict component={Home} />
            <Route path="/" component={() => <Redirect to="/404" />} /> {/* Must be last */}
          </Switch>
        </main>

        <footer>
          <Paper zDepth={1}>
            <BottomNavigation selectedIndex={0}>
              <Link to='/'>
                <BottomNavigationItem label="Home" icon={<FontIcon className="mdi mdi-home" />}/>
              </Link>
              <Link to='/discover'>
                <BottomNavigationItem label="Discover" icon={<FontIcon className="mdi mdi-calendar" />}/>
              </Link>
              <Link to='/profile'>
                <BottomNavigationItem label="Profile" icon={<FontIcon className="mdi mdi-account" />}/>
              </Link>
              <Link to='/chat'>
                <BottomNavigationItem label="Chat" icon={<FontIcon className="mdi mdi-message-text-outline" />}/>
              </Link>
            </BottomNavigation>
          </Paper>
        </footer>
      </content>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    token: state.auth.token
  })
};

export default connect(mapStateToProps)(Main);
