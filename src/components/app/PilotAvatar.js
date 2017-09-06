import React from 'react';

import { Avatar } from 'material-ui';

import { BLANK_PNG } from '../../utils';

/** Component wrapper for pilot avatars */
export default class PilotAvatar extends Avatar {
  state = { complete: false };

  /** This will be called when the image done loading */
  onLoad = event => {
    if (event.target.src !== BLANK_PNG) {
      this.setState({ complete: event.target.complete });
    }
  };

  /** Image fails to load replace with blank image */
  onError = event => {
    event.target.src = BLANK_PNG;
  };

  render() {
    // todo add lazy loading, and fancy things like image caching
    return (
      <span className={this.state.complete ? '' : 'loading-bar'} style={{...this.props.style}}>
        <Avatar onError={this.onError} onLoad={this.onLoad} {...this.props} className="avatar bar-item" src={this.props.src || BLANK_PNG} style={{ objectFit: 'cover' }} />
      </span>
    );
  }
}
