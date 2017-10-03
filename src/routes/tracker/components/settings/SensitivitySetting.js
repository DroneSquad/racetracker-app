import React from 'react';
import Setting from './Setting';

import { FlatButton, Dialog } from 'material-ui';
import loadingImg from '../../../../media/ds-logo-spin.svg';

export default class SensitivitySetting extends Setting {
  props: {
    id: string,
    gateADC: string,
    calibrate: Function
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.calibrating) {
      if (nextProps.gateADC) {
        this.setState({ calibrating: false, calibrateDialog: false });
      }
    }
  }

  /** Calibrate the race tracker */
  calibrate = () => {
    this.props.calibrate(this.props.id);
    this.setState({ calibrating: true });
  };

  /** Open the dialog */
  handleOpen = () => {
    this.setState({ calibrateDialog: true });
  };

  /** Close the dialog */
  handleCancel = (buttonClicked: boolean) => {
    if (buttonClicked) {
      this.setState({ calibrateDialog: false });
    }
  };

  render() {
    let loadingComponent = <img src={loadingImg} style={{ height: '16px', width: '16px' }} alt="Loading..." />;
    let actions = [
      <FlatButton label="Cancel" disabled={this.state.calibrating} primary={true} onClick={this.handleCancel} />,
      <FlatButton label={this.state.calibrating ? loadingComponent : 'Calibrate'} primary onClick={this.calibrate} />
    ];
    return (
      <div className={this.isLoadingClass()} style={{ padding: '0 16px' }}>
        <Dialog
          title="Calibrate RaceTracker"
          actions={actions}
          modal={false}
          open={this.state.calibrateDialog || false}
          onRequestClose={this.handleCancel}
        >
          Power up your video transmitter and set it to {this.state.channel || 'N/A'}
        </Dialog>
        <h3 className="no-margin left push-down-text">Sensitivity</h3>
        <div className="clear">
          <div className="center-text">
            <FlatButton primary label="Calibrate" onTouchTap={this.handleOpen} />
          </div>
        </div>
      </div>
    );
  }
}
