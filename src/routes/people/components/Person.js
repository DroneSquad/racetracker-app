import React from 'react';

import { ListItem, /*FontIcon, IconButton*/ } from 'material-ui';

import PilotAvatar from '../../../components/app/PilotAvatar';

import './people.css';

export default class extends React.Component {
  render() {
    let name = (
      <div className="bar-item" style={{ marginBottom: '1px' }}>
        {this.state.name}
      </div>
    );
    let avatar = <PilotAvatar src={this.state.avatar} />;
    // let icon = (
    //   <IconButton
    //     style={{ padding: '0' }}
    //     onTouchTap={this.props.onClickIcon}
    //     children={<FontIcon className="mdi mdi-clipboard-outline" />}
    //   />
    // );
    return (
      <ListItem
        id={this.uuid}
        onTouchTap={this.props.onClick}
        className={this.state.loading ? 'loading-bar' : ''}
        leftAvatar={avatar}
        primaryText={name}
        // rightIcon={icon}
      />
    );
  }
}
