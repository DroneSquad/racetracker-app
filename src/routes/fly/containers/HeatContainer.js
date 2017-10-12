// @flow
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';

import Heat from '../components/Heat';

/*  This is a container component. It does not contain any JSX, or
    import React. This component is **only** responsible for wiring
    in actions and state necessary to render a presentational component */

const mapStateToProps = (state, ownProps) => ({
  // activeHeatId: ownProps.id,
  ownProps: ownProps,
  activeHeat: state.race.heats.filter(t => t.id === ownProps.id)[0],
  heatChannels: state.race.heats.filter(t => t.id === ownProps.id)[0].racerChannels

});

const mapDispatchToProps = (dispatch: Function) => ({});

const HeatContainer = connect(mapStateToProps, mapDispatchToProps)(Heat);

export default HeatContainer;
