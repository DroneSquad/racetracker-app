// @flow
import React from 'react';

import { List, Subheader, ListItem } from 'material-ui';

import LoadingSpinner from '../../../global/app/LoadingSpinner';
import TrackerDevice from '../containers/TrackerDeviceContainer';

export default class TrackerList extends React.Component {
  props: {
    filter: string,
    headerText: string,
    emptyText: string,
    isBtScanning: boolean,
    trackers: Array<RaceTracker>
  };

  render() {
    let spinner = (
      <ListItem disabled>
        <LoadingSpinner />
      </ListItem>
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
