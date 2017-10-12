import React from 'react';
import { /*Link,*/ Route, Switch } from 'react-router-dom';

import { AppBar, Paper } from 'material-ui';

/** The basic component for displaying the chat dialogs */
const Dialogs = () =>
  <div>
    <header>
      <AppBar title="Chat" />
    </header>
    <Paper style={{ margin: '8px', padding: '16px', color: '#666' }}>
      <h3 style={{ color: '#000' }}>Drone Squad Chat</h3>
      Our new chat system and other community features will be added after the RaceTracker race management features are
      complete.
    </Paper>
  </div>;

/** The basic component for displaying the messages */
class Messages extends React.Component {
  render() {
    let id = this.props.match.params.id;
    return (
      <div>
        <header>
          <AppBar
            title="Messages"
            iconClassNameLeft="mdi mdi-arrow-left"
            onLeftIconButtonTouchTap={() => {
              let history = this.props.history;
              if (history.length > 1) {
                this.props.history.goBack();
              } else {
                this.props.history.go('/chat');
              }
            }}
          />
        </header>
        <pre>
          messages {id} {JSON.stringify(this.props, '&nbsp;', 2)}
        </pre>
      </div>
    );
  }
}

export default class Chat extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/chat/:id" component={Messages} />
        <Route path="/chat" component={Dialogs} />
      </Switch>
    );
  }
}
