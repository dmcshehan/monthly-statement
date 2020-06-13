import { combineReducers } from 'redux';

import entryReducer from './entry.js';
import userReducer from './user.js';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['entry'],
};

const rootReducer = combineReducers({
	entry: entryReducer,
	user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
