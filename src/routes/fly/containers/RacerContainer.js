// @flow
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';

import Racer from '../components/Racer';

/*  This is a container component. It does not contain any JSX, or
    import React. This component is **only** responsible for wiring
    in actions and state necessary to render a presentational component */

const mapStateToProps = (state, ownProps) => ({
  lap: state.race.laps.filter(l => l.racer === ownProps.id).filter(h => h.heat === ownProps.heatId).reverse()[0]
});

const RacerContainer = connect(mapStateToProps)(Racer);

export default RacerContainer;
