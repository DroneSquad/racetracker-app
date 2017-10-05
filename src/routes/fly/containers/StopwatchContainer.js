// @flow
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';

import Stopwatch from '../components/Stopwatch';

/*  This is a container component. It does not contain any JSX, or
    import React. This component is **only** responsible for wiring
    in actions and state necessary to render a presentational component */

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch: Function) => ({
});

const StopwatchContainer = connect(mapStateToProps, mapDispatchToProps)(Stopwatch);

export default StopwatchContainer;
