import React from 'react';

import loadingImg from '../../media/ds-logo-spin.svg';

/** Component wrapper for Loading Spinners */
export default class extends React.PureComponent {
  render() {
    let size = this.props.size || 25;
    return (
      <div className="center-text">
        <img height={size} width={size} src={loadingImg} alt="Loading..." />
      </div>
    );
  }
}
