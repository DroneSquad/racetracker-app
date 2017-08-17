import React from 'react';

import {
  FontIcon,
} from 'material-ui';

import { toPercent, batteryLevelIcon } from '../../utils';

/** The device that will appear in the list in the tracker home */
export default class TrackerDevice extends React.Component {
  render() {
    // todo map state to props
    let { name = 'Unknown Name', frequency = 'N/A', single = 0, battery = 0 } = this.props;
    return (
      <div className="device">
        <span>{name}</span>
        <ul className="details">
          <li>
            <span><FontIcon className="mdi mdi-radio-tower"/></span>{frequency}
          </li>
          <li>
            <span><FontIcon className="mdi mdi-bluetooth"/></span>{toPercent(single)}
          </li>
          <li>
            <span><FontIcon className={batteryLevelIcon(battery)}/></span>{toPercent(battery)}
          </li>
        </ul>
      </div>
    );
  }
}
