// @flow
import { connect } from 'react-redux';
import FlyoverSetting from '../../components/settings/FlyoverSetting';

import { setRaceMode } from '../../../../global/app/modules/race';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, a FlyoverSettings */

const mapStateToProps = (state, ownProps) => ({
  raceMode: state.race.raceMode
});

const mapDispatchToProps = (dispatch: Function) => ({
  setRaceMode: object => dispatch(setRaceMode(object))
});

const FlyoverSettingContainer = connect(mapStateToProps, mapDispatchToProps)(FlyoverSetting);

export default FlyoverSettingContainer;
