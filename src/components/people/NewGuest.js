import React from 'react';

import {
  AppBar,
  TextField,
  List,
  ListItem,
  FontIcon,
} from 'material-ui';

import { historyBackButton } from '../../utils';

/** This will display tabs for each section for tab, they keep their state across tabs */
export default class NewGuest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {loading: true};
    setTimeout(() => { // todo replace with redux things
      this.setState({loading: false, saving: false});
    }, 250);
  }

  /** Save the new guest */
  onSave = () => {
    // todo save
    this.setState({saving: true});
    setTimeout(() => historyBackButton.bind(this)(), 1000);
  };

  /** When the user types in the callsign */
  onCallsign = (event, value) => {
    this.setState({enteredCallsign: true, callsign: value});
  };

  /** When the user types in the firstName */
  onFirstName = (event, value) => {
    this.setState({firstName: value});
  };

  /** When the user types in the lastName */
  onLastName = (event, value) => {
    this.setState({lastName: value});
  };

  /** When the user types in the email */
  onEmail = (event, value) => {
    this.setState({enteredEmail: true, email: value});
  };

  render() {
    let title = <span className="ds-blue-text">New Guest</span>;
    let saveBtnClass = this.state.saving ? 'ds-gray-alt-text mdi mdi-loading spinner' : 'ds-gray-alt-text mdi mdi-check';
    return (
      <div className="main white-bg">
        <header>
          <AppBar className="ds-white" title={title} iconClassNameLeft="ds-gray-alt-text mdi mdi-close" onLeftIconButtonTouchTap={historyBackButton.bind(this)} iconClassNameRight={saveBtnClass} onRightIconButtonTouchTap={this.onSave}/>
        </header>
        <main>
          <form>
            <List>
              <ListItem disabled leftIcon={<FontIcon className="mdi mdi-account"/>} innerDivStyle={{padding: '0 0 0 48px'}}>
                <TextField value={this.state.callsign} onChange={this.onCallsign} hintText="Callsign*" errorText={(!this.state.callsign && this.state.enteredCallsign) && 'Callsign is required'}/>
              </ListItem>
              <ListItem disabled innerDivStyle={{padding: '0 0 0 48px'}}>
                <TextField value={this.state.firstName} onChange={this.onFirstName} hintText="First Name"/>
              </ListItem>
              <ListItem disabled innerDivStyle={{padding: '0 0 0 48px'}}>
                <TextField value={this.state.lastName} onChange={this.onLastName} hintText="Last Name"/>
              </ListItem>
              <ListItem disabled leftIcon={<FontIcon className="mdi mdi-email"/>} innerDivStyle={{padding: '0 0 0 48px'}}>
                <TextField value={this.state.email} onChange={this.onEmail} hintText="Email*" errorText={(!this.state.email && this.state.enteredEmail) && 'Email is required'}/>
              </ListItem>
              <ListItem disabled>
                <p className="ds-gray-text">Race results will be emailed to the user when the heat is over.</p>
              </ListItem>
            </List>
          </form>
        </main>
      </div>
    )
  }
}
