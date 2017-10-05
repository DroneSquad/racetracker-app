// @flow
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import RacetrackerCard from '../components/RacetrackerCard';

/*  This is a container component. It does not contain any JSX, or
    import React. This component is **only** responsible for wiring
    in actions and state necessary to render a presentational component */

const mapDispatchToProps = (dispatch: Function) => ({
  goToTrackerHome: () => dispatch(push('/tracker'))
});

const RacetrackerCardContainer = connect(null, mapDispatchToProps)(RacetrackerCard);

export default RacetrackerCardContainer;
