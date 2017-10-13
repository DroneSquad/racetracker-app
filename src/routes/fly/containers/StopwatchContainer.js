// @flow
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';

import Stopwatch from '../components/Stopwatch';

/*  This is a container component. It does not contain any JSX, or
    import React. This component is **only** responsible for wiring
    in actions and state necessary to render a presentational component */

const mapStateToProps = (state, ownProps) => ({
  // activeHeatId: state.race.activeHeat,
  activeHeat: (state.race.heats) ? state.race.heats.filter(t => t.id === state.race.activeHeat)[0] : null
});

const mapDispatchToProps = (dispatch: Function) => ({});

const StopwatchContainer = connect(mapStateToProps, mapDispatchToProps)(Stopwatch);

export default StopwatchContainer;
