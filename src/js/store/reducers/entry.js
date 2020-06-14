import moment from 'moment';
import {
	FETCH_CURRENT_MONTH_ENTRIES_SUCCESS,
	FETCH_SPECIFIC_MONTH_ENTRIES_SUCCESS,
	SET_CURRENTLY_BEIGN_EDITED,
	CLEAR_CURRENTLY_BEIGN_EDITED,
	TOGGLE_CURRENT_MONTH,
} from '../actiontypes/entry.js';
import produce from 'immer';

const initialState = {
	entries: [],
	currentMonth: null,
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

			case FETCH_SPECIFIC_MONTH_ENTRIES_SUCCESS:
				draftState.entries = payload.entries;
				break;
			case SET_CURRENTLY_BEIGN_EDITED:
				draftState.currentlyBeignEdited = state.entries.find((entry) => entry._id === payload.entryId);
				break;
			case CLEAR_CURRENTLY_BEIGN_EDITED:
				draftState.currentlyBeignEdited = '';
				break;
			case TOGGLE_CURRENT_MONTH:
				draftState.currentMonth = payload.month;
				break;
		}
	});
}

export default entryReducer;
