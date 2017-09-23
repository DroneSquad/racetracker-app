import React from 'react';
import { Snackbar } from 'material-ui';

export default class RtConnSnackbar extends React.PureComponent {
  props: {

  };

  /*onClick = event => {
    this.props.authLogout(this.props.token);
  };*/

  render() {
    return (

        <Snackbar open={false} message="truth"
            onRequestClose={(reason) => {
              if (reason === 'clickaway') {
                return;
              }}} />

    );
  }
}
