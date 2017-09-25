import React from 'react';

import { ListItem, /*FontIcon, IconButton*/ } from 'material-ui';

import PilotAvatar from '../../../global/app/PilotAvatar';
import { lazyLoad } from '../../../utils';

import api from '../../../services/api';

import './people.css';

export default class extends React.Component {
  // uuid = uuid.v4();

  state = {
    loading: true,
    name: 'Unknown',
    avatar: `https://api.dronesquad.com/avatar/${this.props.id}`
  };

  componentDidMount() {
    this.lazyLoad = lazyLoad(document.getElementById(this.uuid), () => {
      api.public
        .pilot(this.props.id)
        .then(pilot =>
          this.setState({
            name: pilot.callsign || pilot.display || 'No Pilot Name',
            loading: false
          })
        )
        .catch(() => this.setState({ loading: false }));
    });
  }

  componentWillUnmount() {
    this.lazyLoad && this.lazyLoad(); // this will remove the listener from the lazy loader
  }

  /** When the list item was clicked*/
  onClick = () => {};

  /** When the icon was clicked */
  onClickIcon = () => {};

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
