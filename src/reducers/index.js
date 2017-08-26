import { combineReducers } from 'redux';
// TODO: investigate if we actually should use this, or keep our redux pure
import { routerReducer } from 'react-router-redux';

import { authReducer } from './auth';

const rootReducer = combineReducers({
  auth: authReducer,
  router: routerReducer
});

export default rootReducer;
