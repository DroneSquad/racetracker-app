import React, { Component } from 'react';

export default class RacerDetailHeaderItem extends Component {
  render() {
    let { title, body, footer } = this.props;
    let style = { textAlign: 'center', margin: '0' };
    let titleStyle = { ...style, fontSize: '18px', fontWeight: 'normal' };
    let bodyStyle = { ...style, fontSize: '32px' };
    let footerStyle = { ...style, fontSize: '14px', fontWeight: 'normal' };
    return (
      <div style={{ margin: '1em' }}>
        {title &&
          <h1 style={titleStyle}>
            {title}
          </h1>}
        {body &&
          <h3 style={bodyStyle}>
            {body}
          </h3>}
        {footer &&
          <h6 style={footerStyle}>
            {footer}
          </h6>}
      </div>
    );
  }
}
