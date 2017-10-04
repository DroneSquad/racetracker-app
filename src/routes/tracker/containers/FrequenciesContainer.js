// @flow
import { connect } from 'react-redux';
import Frequencies from '../components/settings/frequencies/Frequencies';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, a Frequencies */

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.location.state // passed in via react-router-redux push command
});

const FrequenciesContainer = connect(mapStateToProps)(Frequencies);

export default FrequenciesContainer;
