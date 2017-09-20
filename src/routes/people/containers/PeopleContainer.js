import People from '../components/People';

import reducer from '../modules/people';

import { connect } from '../../../store';

@connect(reducer, 'people')
export default class extends People {

  static mapStateToProps = states => ({
    people: states.people
  });

  /** Currently needed for the connect decorator */
  static mapDispatchToProps = dispatch => ({
  });


}
