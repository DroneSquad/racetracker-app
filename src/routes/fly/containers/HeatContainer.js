// @flow
import { connect } from 'react-redux';

import Heat from '../components/Heat';

/*  This is a container component. It does not contain any JSX, or
    import React. This component is **only** responsible for wiring
    in actions and state necessary to render a presentational component */

const mapStateToProps = (state, ownProps) => ({
  activeHeat: state.race.heats.filter(t => t.id === ownProps.id)[0],
  heatChannels: state.race.heats.filter(t => t.id === ownProps.id)[0].racerChannels
});

const HeatContainer = connect(mapStateToProps, null)(Heat);

export default HeatContainer;
