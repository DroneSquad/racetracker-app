// @flow

import React from 'react';
import { connect } from 'react-redux';
import TrackerDevice from './TrackerDevice';
import { List, Subheader, ListItem } from 'material-ui';
import loadingImg from '../../media/ds-logo-spin.svg';

const TrackerList = (props: {
  headerText: string,
  emptyText: string,
  trackers: Array<RaceTracker>,
  isScanning: boolean
}) => {
  let spinner = (
    <ListItem
      className="center-text"
      disabled
      primaryText={<img src={loadingImg} className="scanning" alt="Loading..." />}
    />
  );

  let utilSpace;
  if (props.trackers.length > 0) {
    utilSpace = props.trackers.map(tracker => <TrackerDevice key={tracker.id} {...tracker} />);
  } else {
    utilSpace = (
      <ListItem
        disabled
        primaryText={
          <span>
            {props.emptyText}
          </span>
        }
      />
    );
  }
  return (
    <List>
      <Subheader className="ds-blue-text">
        {props.headerText}
      </Subheader>
      {utilSpace}
    </List>
  );
};

const mapStateToProps = state => ({
  trackers: state.trackers
});
export default connect(mapStateToProps)(TrackerList);
