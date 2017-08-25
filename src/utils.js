/**
 * Random util functions that are used through out the app.
 */

/** Make sure the value is not null */
export function notNull(value, message) {
  if (!value) {
    throw new Error(message || 'The value was null');
  }
  return value;
}

/** Convert the value to a percent assuming its decimal */
export function toPercent(value) {
  if (value === 1) {
    // assume 1 is 100%
    return '100%';
  }
  if (value < 1) {
    return Math.floor(value * 100) + '%';
  }
  return (value || 0) + '%';
}

/** Fancy to get battery level*/
export function batteryLevelIcon(value) {
  if (value === 1) {
    return 'mdi mdi-battery';
  } else if (!value || value < 0.1) {
    return 'mdi mdi-battery-10';
  }
  return `mdi mdi-battery-${Math.floor(value * 10) * 10}`;
}

/** Run the browsers history back button, must be called in the context of the component */
export function historyBackButton(backUpPath = '/') {
  let { history } = this.props;
  if (history.length > 1) {
    this.props.history.goBack();
  } else {
    this.props.history.go(backUpPath);
  }
}
