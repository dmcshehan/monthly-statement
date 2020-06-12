import { combineReducers } from 'redux';

import entryReducer from './entry.js';
import userReducer from './user.js';

export default combineReducers({
	entry: entryReducer,
	user: userReducer,
});
