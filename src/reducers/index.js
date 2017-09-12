import { combineReducers } from 'redux';
// allows dispatch of actions from anywhere: store.dispatch(push('/foo'))
import { routerReducer } from 'react-router-redux';

import { authReducer } from '../routes/login/modules/login';
import trackers from './tracker';
import bluetooth from './bluetooth';

const rootReducer = combineReducers({
  router: routerReducer, // react-router-redux v5.0
  auth: authReducer,
  trackers: trackers,
  bluetooth: bluetooth
});

export default rootReducer;
