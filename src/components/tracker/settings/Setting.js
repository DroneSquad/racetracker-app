import React from 'react';

export default class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true};
  }

  /** Trigger the setting done loading */
  doneLoading() {
    this.setState({loading: false});
  }

  /** The class to use for the loading screen */
  isLoadingClass() {
    return this.state.loading ? 'loading-bar' : '';
  }
}
