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
