import React, { Component } from 'react';
import _ from 'lodash';
import TrackerList from './TrackerList';
import { AppBar, List, Divider, Subheader, FlatButton, ListItem } from 'material-ui';
import { historyBackButton } from '../../utils';
import './tracker-home.css';
import { discoverTracker } from '../../reducers/tracker';
import { connect } from 'react-redux';

/** Test component to view the other views */
class TrackerHome extends Component {
  props: {
    trackers: Array<RaceTracker>,
    isScanning: boolean,
    handleClick: Function
  };
  componentWillMount() {
    // TODO: on mount automatically poll for bluetooth devices
  }
  componentWillUnMount() {
    // TODO: disconnect from any connected racetrackers
  }
  discover() {
    console.log('discover');
  }
  render() {
    return (
      <div className="main tracker-home">
        <header>
          <AppBar
            title="RaceTracker"
            iconClassNameLeft="mdi mdi-arrow-left"
            onLeftIconButtonTouchTap={historyBackButton.bind(this)}
          />
        </header>
        <main>
          <TrackerList headerText="Connected RaceTrackers" emptyText="No connected race trackers" />
          <Divider />
          <TrackerList headerText="Available RaceTrackers" emptyText="No available race trackers" />
        </main>
        <footer>
          <FlatButton primary label="rescan" className="right" onClick={this.props.handleClick} />
        </footer>
      </div>
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = (dispatch: Function) => ({
  handleClick(event) {
    dispatch(discoverTracker({ name: 'TBS Orange', rssi: '-87', id: '9287359j' }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackerHome);
