import React from 'react';
import Setting from './Setting';

import { FlatButton, Dialog } from 'material-ui';
import loadingImg from '../../../../media/ds-logo-spin.svg';

export default class SensitivitySetting extends Setting {
  props: {
    id: string,
    gateADC: string,
    racerChannel: string,
    isCalibrating: boolean,
    calibrate: Function
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.isCalibrating) {
      if (!nextProps.isCalibrating) {
        this.setState({ calibrateDialog: false });
      }
    }
  }

  /** Calibrate the race tracker */
  calibrate = () => {
    this.props.calibrate(this.props.id);
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
      <FlatButton label="Cancel" disabled={this.props.isCalibrating} primary={true} onClick={this.handleCancel} />,
      <FlatButton label={this.props.isCalibrating ? loadingComponent : 'Calibrate'} primary onClick={this.calibrate} />
    ];
    return (
      <div style={{ padding: '0 16px' }}>
        <Dialog
          title="Calibrate RaceTracker"
          actions={actions}
          modal={false}
          open={this.state.calibrateDialog || false}
          onRequestClose={this.handleCancel}
        >
          Power up your video transmitter and set it to {this.props.racerChannel}
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
