import {
	FETCH_CURRENT_MONTH_ENTRIES_SUCCESS,
	SET_CURRENTLY_BEIGN_EDITED,
	CHANGE_CURRENTLY_BEIGN_EDITED,
	CLEAR_CURRENTLY_BEIGN_EDITED,
} from '../actiontypes/entry.js';
import produce from 'immer';

const initialState = {
	entries: [],
	currentlyBeignEdited: null,
	lastChangedProp: null,
};

function entryReducer(state = initialState, action) {
	return produce(state, (draftState) => {
		const { type, payload } = action;
		switch (type) {
			case FETCH_CURRENT_MONTH_ENTRIES_SUCCESS:
				draftState.entries = payload.entries;
				break;
			case SET_CURRENTLY_BEIGN_EDITED:
				draftState.currentlyBeignEdited = state.entries.find((entry) => entry._id === payload.entryId);
				break;
			case CHANGE_CURRENTLY_BEIGN_EDITED:
				const { prop, value } = payload;
				draftState.currentlyBeignEdited[prop] = value;
				draftState.lastChangedProp = prop;
				break;
			case CLEAR_CURRENTLY_BEIGN_EDITED:
				draftState.currentlyBeignEdited = '';
				break;
		}
	});
}

export default entryReducer;
