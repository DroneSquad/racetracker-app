import React from 'react';
import _ from 'lodash';

import { AppBar, MenuItem, SelectField, List, ListItem, Divider } from 'material-ui';

import { historyBackButton } from '../../utils';

/** The Heat Selector for Pilots */
class HeatSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select: -2,
      pilots: ['ewized', 'Pete M.'] // todo get from some where
    };
  }

  /** Set the state for the select field */
  onSelectChange = (event, index) => {
    if (index > 2) {
      // below the divider
      this.setState({ select: index - 3 });
    } else {
      // above the divider
      this.setState({ select: index - 2 });
    }
  };

  render() {
    let { band, channel } = this.props;
    return (
      <div className="heat-selector clear">
        <div className="frequency">
          <h4>
            {channel || 'N/A'}
          </h4>
          <h5>
            {band || '0000'}
          </h5>
        </div>
        <SelectField className="pilots" value={this.state.select} onChange={this.onSelectChange}>
          <MenuItem value={-2} primaryText="Unassigned" />
          <MenuItem value={-1} primaryText="Add Pilot" />
          <Divider />
          {_.map(this.state.pilots || [], (value, id) => <MenuItem key={id} value={id} primaryText={value} />)}
        </SelectField>
      </div>
    );
  }
}

/** This will display tabs for each section for tab, they keep their state across tabs */
export default class HeatLineUp extends React.Component {
  render() {
    let title = <span className="ds-blue-text">Heat 0 Lineup</span>;
    return (
      <div className="main heat-lineup">
        <header>
          <AppBar
            className="ds-white"
            title={title}
            iconClassNameLeft="ds-gray-alt-text mdi mdi-close"
            onLeftIconButtonTouchTap={historyBackButton.bind(this)}
            iconClassNameRight="ds-gray-alt-text mdi mdi-check"
            onRightIconButtonTouchTap={historyBackButton.bind(this)}
          />
        </header>
        <main>
          <List>
            <ListItem primaryText={<HeatSelector channel="F4" band="5640" />} />
            <ListItem primaryText={<HeatSelector channel="F2" band="5730" />} />
            <ListItem primaryText={<HeatSelector channel="F6" band="5890" />} />
            <ListItem primaryText={<HeatSelector channel="R2" band="5520" />} />
          </List>
        </main>
      </div>
    );
  }
}
