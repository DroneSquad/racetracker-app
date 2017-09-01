import React from 'react';

import { Avatar } from 'material-ui';

import { BLANK_PNG } from '../../utils';

/** Component wrapper for pilot avatars */
export default class PilotAvatar extends Avatar {
  render() {
    // todo add lazy loading, and fancy things like image caching
    return <Avatar {...this.props} className="avatar bar-item" src={BLANK_PNG} style={{...this.props.style, backgroundImage: `url(${this.props.src})`}} />;
  }
}
