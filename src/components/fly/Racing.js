import React from 'react';
import _ from 'lodash';

import { Paper, List, ListItem, FlatButton } from 'material-ui';

import RacingHeat from './RacingHeat';

/** The basic component for displaying the fly heats */
export default class Racing extends React.Component {
  render() {
    return (
      <div>
        <Paper className="heat-action" style={{ display: 'flex' }}>
          <p style={{ width: '60vw', marginRight: '0', textAlign: 'left', paddingLeft: '24px' }}>Race Clock: 1:00:00</p>
          <FlatButton primary style={{ width: '30vw', marginTop: '6px', marginRight: '24px' }} label="Stop Race" />
        </Paper>
        <List className="heat-list">
          {_.range(1, 10).map(i =>
            <ListItem key={i} className="small-screen" disabled primaryText={<RacingHeat {...this.props} id={i} />} />
          )}
        </List>
      </div>
    );
  }
}
