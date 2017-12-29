import React from 'react';

/** General error page for 404 errors */
export default class FourOhFour extends React.Component {
  /** This will render full screen pages that need different layouts */
  render() {
    return (
      <div class="main" style={{ textAlign: 'center' }}>
        <h1>Four Oh Four</h1>
        <div>You have lost your RC click the link to go where its safe.</div>
        <a href="/#!/" style={{ color: '#678' }}>
          Back to Safety
        </a>
      </div>
    );
  }
}
