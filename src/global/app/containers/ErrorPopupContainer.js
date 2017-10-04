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
  onErrorHandler = (error) => {
    if (!error) {
      console.log('Caught an error with no value!');
      return;
    }
    // console.error(error);
    // console.log(JSON.stringify(error));
    this.setState({
      opened: true,
      title: String(error.message),
      message: JSON.stringify(error, 2, ' ')
    });
  };

  /** Dismiss the error */
  onOk = () => {
    this.setState({ opened: false });
  };

  /** Report the error */
  onReport = () => {
    console.log('Report suppot added later');
    this.setState({ opened: false });
  };
}
