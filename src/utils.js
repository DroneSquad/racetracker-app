/**
 * Random util functions that are used through out the app.
 */

import _ from 'lodash';

/** Base 64 for a transparent 1x1 png */
export const BLANK_PNG =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGP6zwAAAgcBApocMXEAAAAASUVORK5CYII=';

/** Make sure the value is not null */
export function notNull(value, message) {
  if (typeof value === 'object' && !value) {
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

/** Convert RSSI(dBm) value into equivalent percentage value
    https://stackoverflow.com/questions/15797920/how-to-convert-wifi-signal-strength-from-quality-percent-to-rssi-dbm/15798024#15798024
*/
export function rssiToPercentage(value) {
  return Math.min(Math.max(2 * (~~value + 100), 0), 100) + '%';
}

/** Generate a list of random number from min to max */
export function randomPilotIds() {
  return _.range(3100, 3350);
}

/** Will lazy load the element then call the callback on the element after its in view */
export function lazyLoad(element, callback) {
  if (!element || !callback) return; // dont need to do anything if they give us bad data
  let height = element.getBoundingClientRect().top;
  if (window.innerHeight >= height) {
    callback();
  } else {
    callback.$element = element; // inject the element into the function
    if ('lazyLoading' in window) {
      let sortedList = window.lazyLoading.sortedList;
      // fancy sorting algorithm to speed this things up
      if (sortedList.length > 0 && sortedList[sortedList.length - 1].$element.getBoundingClientRect().top <= height) {
        sortedList.push(callback);
      } else {
        sortedList.splice(
          (() => {
            for (let i in sortedList) {
              if (sortedList[i].$element.getBoundingClientRect().top >= height) {
                return i;
              }
            }
            return sortedList.length;
          })(),
          0,
          callback
        );
      }
    } else {
      // lazy load the lazy load system
      let lazyLoading = (window.lazyLoading = {
        sortedList: [callback],
        ticking: false
      });
      // register the scroll event listener
      window.addEventListener(
        'scroll',
        () => {
          if (lazyLoading.sortedList.length > 0 && !lazyLoading.ticking) {
            // have the callbacks only be called on a request frame
            window.requestAnimationFrame(async () => {
              for (let index in lazyLoading.sortedList) {
                let action = lazyLoading.sortedList[index];
                let height = action.$element.getBoundingClientRect().top;
                if (height < 0) {
                  continue;
                }
                if (window.innerHeight >= height) {
                  try {
                    action();
                  } finally {
                    lazyLoading.sortedList.splice(index, 1);
                  }
                } else {
                  break; // the stack is sorted once we are out of the screen no need to check for more
                }
              }
              lazyLoading.ticking = false;
            });
            lazyLoading.ticking = true;
          }
        },
        true
      );
    }
  }
  // return a function that will remove the callback from the list
  return () => {
    if ('lazyLoading' in window) {
      for (let index in window.lazyLoading.sortedList) {
        let action = window.lazyLoading.sortedList[index];
        if (callback === action) {
          window.lazyLoading.sortedList.splice(index, 1);
        }
      }
    }
  };
}
