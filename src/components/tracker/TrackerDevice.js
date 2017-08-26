// @flow

import React from 'react';
import { FontIcon } from 'material-ui';
import { rssiToPercentage } from '../../utils';

const TrackerDevice = (props: { name: string, rssi: string }) => {
  // TODO: bind the rssi value to main props, so update on change
  return (
    <div className="device">
      <h3>
        {props.name}
      </h3>
      <span className="detail">
        <FontIcon className="mdi mdi-radio-tower" />
        {rssiToPercentage(props.rssi)}
      </span>
    </div>
  );
};

export default TrackerDevice;
