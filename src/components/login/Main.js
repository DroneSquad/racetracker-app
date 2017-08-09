import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import FontIcon from 'material-ui/FontIcon';

/** This is the main screen of the app, this will display the routes for the buttons */
class Main extends React.Component {
  render() {
    let { token } = this.props;

    if (!token) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        <AppBar title="Drone Squad" iconElementLeft={<IconButton />}/>

        <Paper zDepth={1}>
          <BottomNavigation selectedIndex={0}>
            <BottomNavigationItem
              label="Home"
              icon={<FontIcon className="mdi mdi-home" />}
            />
            <BottomNavigationItem
              label="Discover"
              icon={<FontIcon className="mdi mdi-calendar" />}
            />
            <BottomNavigationItem
              label="Profile"
              icon={<FontIcon className="mdi mdi-account" />}
            />
            <BottomNavigationItem
              label="Chat"
              icon={<FontIcon className="mdi mdi-message-text-outline" />}
            />
          </BottomNavigation>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    token: state.auth.token
  })
};

export default connect(mapStateToProps)(Main);
