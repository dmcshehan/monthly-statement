import { FETCH_CURRENT_MONTH_ENTRIES_SUCCESS } from '../actiontypes/entry.js';

const initialState = {
	entries: [],
};

function entryReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_CURRENT_MONTH_ENTRIES_SUCCESS:
			return {
				...state,
				entries: action.payload.entries,
			};
		default:
			return state;
	}
}

export default entryReducer;
