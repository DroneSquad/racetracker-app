import ErrorPopup from '../components/ErrorPopup';

import { connect } from '../../../store';

@connect()
export default class extends ErrorPopup {

  static mapStateToProps = states => ({});

  static mapDispatchToProps = dispatch => ({});

  /** Attach the error handler */
  componentDidMount() {
    window.onerror = this.onErrorHandler;
  }

  /** Unattach the error handler */
  componentWillUnmount() {
    window.onerror = () => {}; // NO OP
  }

  /** The error handler to view errors with out the console.log */
  onErrorHandler = (error, forced) => {
    if (!error) {
      console.log('Caught an error with no value!');
      return;
    }
    if (window.developer === true || forced) { // only developers can see this currently
      this.setState({
        opened: true,
        title: String(error.message),
        message: JSON.stringify(error, 2, ' ')
      });
    }
  };

  /** Dismiss the error */
  onOk = () => {
    this.setState({ opened: false });
  };

  /** Report the error */
  onReport = () => {
    console.log('Report support to be added later');
    this.setState({ opened: false });
  };
}
