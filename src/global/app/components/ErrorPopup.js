import React from 'react';

import { Dialog, FlatButton } from 'material-ui';

export default class extends React.PureComponent {
  state = {
    title: 'No error',
    message: 'No message',
    opened: false
  };

  actions() {
    return [
      <FlatButton label="Ok" primary onClick={this.onOk} />,
      <FlatButton label="Report" primary disabled={true} onClick={this.onReport} />
    ];
  }

  /** Display major errors to help debuging */
  render() {
    return (
      <Dialog modal title={this.state.title} actions={this.actions()} open={this.state.opened} autoScrollBodyContent>
        <pre>
          {this.state.message}
        </pre>
      </Dialog>
    );
  }
}
