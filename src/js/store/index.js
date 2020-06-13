import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index.js';
import { createLogger } from 'redux-logger';

import { persistStore } from 'redux-persist';

const logger = createLogger({
	collapsed: true,
});

export const store = createStore(rootReducer, applyMiddleware(logger));
export const persistor = persistStore(store);

export default { store, persistor };
