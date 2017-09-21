// @flow
import React from 'react';
import TrackerDevice from './TrackerDevice';
import { List, Subheader, ListItem } from 'material-ui';
import loadingImg from '../../../media/ds-logo-spin.svg';

export default class TrackerList extends React.Component {
  props: {
    filter: string,
    headerText: string,
    emptyText: string,
    trackers: Array<RaceTracker>,
    isBtScanning: boolean
  };

  render() {
    let spinner = (
      <ListItem
        className="center-text"
        disabled
        primaryText={<img src={loadingImg} className="scanning" alt="Loading..." />}
      />
    );
    let trackers =
      this.props.trackers.length > 0
        ? this.props.trackers.map(tracker =>
            <TrackerDevice history={this.props.history} key={tracker.id} {...tracker} />
          )
        : <ListItem disabled primaryText={this.props.emptyText} />;
    return (
      <List>
        <Subheader className="ds-blue-text">
          {this.props.headerText}
        </Subheader>
        {this.props.isBtScanning ? spinner : trackers}
      </List>
    );
  }
}
