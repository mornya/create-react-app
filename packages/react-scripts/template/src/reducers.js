import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import about from 'about/reducer';

export default combineReducers({
  /* Insert reducers here */
  about,
  /* Router reducer */
  routing: routerReducer,
});
