import Person from '../components/Person';
import uuid from 'uuid';

import api from '../../../services/api';

import { connect } from '../../../store';
import { lazyLoad } from '../../../utils';

@connect()
export default class extends Person {

  static mapStateToProps = states => ({
    pilots: states.people.pilots
  });

  /** Currently needed for the connect decorator */
  static mapDispatchToProps = dispatch => ({
  });

  uuid = uuid.v4();

  state = {
    loading: true,
    name: 'Unknown',
    avatar: `https://api.dronesquad.com/avatar/${this.props.id}`
  };

  componentDidMount() {
    this.lazyLoad = lazyLoad(document.getElementById(this.uuid), () => {
      api.public.pilot(this.props.id)
        .then(pilot => this.setState({
          name: pilot.callsign || pilot.display || 'No Pilot Name',
          loading: false
        }))
        .catch(() => this.setState({ loading: false }));
    });
  }

  componentWillUnmount() {
    this.lazyLoad && this.lazyLoad(); // this will remove the listener from the lazy loader
  }


}
