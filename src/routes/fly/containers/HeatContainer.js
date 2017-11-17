// @flow
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';

import Heat from '../components/Heat';

import { updateHeatRacers } from '../modules/race';

/*  This is a container component. It does not contain any JSX, or
    import React. This component is **only** responsible for wiring
    in actions and state necessary to render a presentational component */

const mapStateToProps = (state, ownProps) => ({
  activeHeat: state.race.heats.filter(t => t.id === ownProps.id)[0],
  heatChannels: state.race.heats.filter(t => t.id === ownProps.id)[0].racerChannels,
  trackerChannels: state.trackers.filter(t => t.id === state.race.trackerId)[0].racerChannels,
});

const mapDispatchToProps = (dispatch: Function) => ({
  updateHeatRacers: object => dispatch(updateHeatRacers(object)),
});

const HeatContainer = connect(mapStateToProps, mapDispatchToProps)(Heat);

export default HeatContainer;
