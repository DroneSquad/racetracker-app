import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

const Dialogs = () => (
  <div>
    dialogs
    <Link to='/chat/1'>1</Link>
  </div>
);

const Messages = ({ match: { params: { id } } }) => (
  <div>messages {id} <Link to='/chat'>Back</Link></div>
);

export default class Chat extends React.Component {

  render() {
    return (
      <Switch>
        <Route path="/chat" exact={true} component={Dialogs} />
        <Route path="/chat/:id" component={Messages} />
      </Switch>
    );
  }
}
