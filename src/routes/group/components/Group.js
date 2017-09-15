import React from 'react';

import api from '../../../services/api';

export default class Group extends React.Component {
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
