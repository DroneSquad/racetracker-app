// @flow
import React from 'react';

export default class RaceManager extends React.PureComponent {
  props: {
    setIsValid: Function
  };

  componentDidMount() {
    // validation needs to be checked after this initial load
  //   console.log("** Validation is set to False")
    this.props.setIsValid(false);
  }

  componentWillReceiveProps(nextProps) {
    // console.log("** raceManager-componentWillReceiveProps")
  }

  // shouldComponentUpdate(nextProps, nextState) {
    // return false;
  // }

  render() {
    console.log("** raceManager-render");
    return null;
  }
}
