// @flow
import { connect } from 'react-redux';

import {
  getConnectedTrackers
} from '../modules/racetracker';

import RaceManager from '../components/RaceManager';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the RaceManager  */

const mapStateToProps = state => ({
  connectedTrackers: getConnectedTrackers(state)
});

const mapDispatchToProps = (dispatch: Function) => ({

});

const RaceManagerContainer = connect(mapStateToProps, mapDispatchToProps)(RaceManager);

export default RaceManagerContainer;
