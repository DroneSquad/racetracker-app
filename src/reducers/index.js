import { combineReducers } from 'redux';
// allows dispatch of actions from anywhere: store.dispatch(push('/foo'))
import { routerReducer } from 'react-router-redux';

import { authReducer } from '../routes/login/modules/login';
import groupReducer from '../routes/group/modules/group'; // the default export is the reducer no need to grab it directly
import trackerReducer from '../routes/tracker/modules/tracker';
// import bluetooth from './bluetooth';

const rootReducer = combineReducers({
  router: routerReducer, // react-router-redux v5.0
  auth: authReducer,
  trackers: trackerReducer,
  // bluetooth: bluetooth,
  group: groupReducer
});

export default rootReducer;
