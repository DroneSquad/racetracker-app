import React from 'react';

import { BLANK_PNG } from '../../../utils';

import api from '../../../services/api';

export default class extends React.Component {
  state = { complete: false };

  /** This will be called when the image done loading */
  onLoad = event => {
    if (event.target.src !== BLANK_PNG) {
      this.setState({ complete: event.target.complete });
    } else if (!this.failed) {
      event.persist();
      event.target.src = api.urls.banner(this.props.src);
    }
  };

  /** Image fails to load replace with blank image */
  onError = event => {
    this.failed = true;
    event.target.src = BLANK_PNG;
  };

  render() {
    return (
      <span className={this.state.complete ? '' : 'loading-bar'} style={{ ...this.props.style }}>
        <img
          onError={this.onError}
          onLoad={this.onLoad}
          {...this.props}
          className="bar-item"
          src={BLANK_PNG}
          alt=""
          style={{ width: '100%' }}
        />
      </span>
    );
  }
}
