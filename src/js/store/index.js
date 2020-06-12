import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index.js';
import { createLogger } from 'redux-logger';

const logger = createLogger({
	collapsed: true,
});

export default createStore(rootReducer, applyMiddleware(logger));
