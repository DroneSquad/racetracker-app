// @flow
import React from 'react';

export default class RaceManager extends React.PureComponent {
  props: {

  };

  componentDidMount() {
    console.log("** raceManager-componentDidMount")
  }

  componentWillReceiveProps(nextProps) {
    console.log("** raceManager-componentWillReceiveProps")
  }

  // shouldComponentUpdate(nextProps, nextState) {
    // return false;
  // }

  render() {
    console.log("** raceManager-render");
    return null;
  }
}
