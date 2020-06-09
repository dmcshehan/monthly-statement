import { combineReducers } from 'redux';

import entryReducer from './entry.js';

export default combineReducers({
	entry: entryReducer,
});
