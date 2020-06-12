import moment from 'moment';
import {
	FETCH_CURRENT_MONTH_ENTRIES_SUCCESS,
	SET_CURRENTLY_BEIGN_EDITED,
	EDI_CURRENTLY_BEIGN_EDITED,
	CLEAR_CURRENTLY_BEIGN_EDITED,
	EDIT_CURRENTLY_BEIGN_ADDED,
	CLEAR_CURRENTLY_BEIGN_ADDED,
} from '../actiontypes/entry.js';
import produce from 'immer';

const initialState = {
	entries: [],
	currentlyBeignEdited: null,
	lastChangedProp: null,
	currentlyBeignAdded: {
		date: moment().format('YYYY-MM-DD'),
		reason: '',
		amount: '',
		currency: 'LKR',
		type: 'expense',
	},
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
			case EDI_CURRENTLY_BEIGN_EDITED:
				draftState.currentlyBeignEdited[payload.key] = payload.value;
				draftState.lastChangedProp = payload.key;
				break;
			case CLEAR_CURRENTLY_BEIGN_EDITED:
				draftState.currentlyBeignEdited = '';
				break;
			case EDIT_CURRENTLY_BEIGN_ADDED:
				draftState.currentlyBeignAdded[payload.key] = payload.value;
				break;
			case CLEAR_CURRENTLY_BEIGN_ADDED:
				draftState.currentlyBeignAdded = {
					date: moment().format('YYYY-MM-DD'),
					reason: '',
					amount: '',
					currency: 'LKR',
					type: 'expense',
				};
				break;
		}
	});
}

export default entryReducer;
