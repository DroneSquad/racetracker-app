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
  if (value === 1) { // assume 1 is 100%
    return '100%';
  }
  if (value < 1) {
    return (value * 10) + '%'
  }
  return value + '%';
}
