import React from 'react';

import { toPercent } from '../../utils';

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
            <span>Tracking</span><br/>{frequency}
          </li>
          <li>
            <span>Strength</span><br/>{toPercent(single)}
          </li>
          <li>
            <span>Battery</span><br/>{toPercent(battery)}
          </li>
        </ul>
      </div>
    );
  }
}
