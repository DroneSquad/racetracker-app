import React from 'react';

import { FontIcon } from 'material-ui';

import { toPercent, batteryLevelIcon } from '../../utils';

/** The device that will appear in the list in the tracker home */
export default class TrackerDevice extends React.Component {
  render() {
    // todo map state to props
    let { name = 'Unknown Name', frequency = 'N/A', single = 0, battery = 0 } = this.props;
    return (
      <div className="device">
        <h3>
          {name}
        </h3>
        <span className="detail">
          <FontIcon className="mdi mdi-radio-tower" />
          {frequency}
        </span>
        <span className="detail">
          <FontIcon className="mdi mdi-bluetooth" />
          {toPercent(single)}
        </span>
        <span className="detail">
          <FontIcon className={batteryLevelIcon(battery)} />
          {toPercent(battery)}
        </span>
      </div>
    );
  }
}
