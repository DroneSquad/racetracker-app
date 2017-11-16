import { push } from 'react-router-redux';

import DroneSquadAppBar from '../components/DroneSquadAppBar';

import { connect } from '../../../store';

@connect()
export default class extends DroneSquadAppBar {

  static mapStateToProps = states => ({});

  static mapDispatchToProps = dispatch => ({
    goToDeveloperMenu: () => dispatch(push('/test'))
  });

  /** On developer mode */
  onDeveloperMode = () => {
    if (window.developer === true) {
      this.props.goToDeveloperMenu();
    } else {
      if (!window.developer && window.developer !== 0) {
        window.developer = 0;
      } else if (window.developer === 7) {
        let developerConfirm = window.confirm('Are you a developer?');
        if (developerConfirm) {
          window.developer = true;
        }
      } else {
        window.developer++;
      }
    }
  };
}
