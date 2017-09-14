import React from 'react';

import api from '../../../services/api';

export default class Group extends React.Component {

  id = 82;

  render() {
    return (
      <div>
        <img src={api.urls.banner(this.id)} />
        <div>
          Group Name
        </div>
      </div>
    );
  }
}
