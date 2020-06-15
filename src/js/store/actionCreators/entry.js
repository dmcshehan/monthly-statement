import { store } from '../index.js';
import axios from '../../shared/axios.js';
import moment from 'moment';

import getIdTokenOfCurrentUser from '../../auth/getIdTokenOfCurrentUser.js';

//modal
import closeModel from '../../ui/modal/closeEntryModel';
import resetEntryModelValues from '../../ui/modal/resetEntryModalValues';

//notifications
import createSuccessNotification from '../../ui/notifications/createSuccessNotification';

//Month
import setTogglerMonth from '../../ui/monthToggler/setTogglerMonth';

//Table
import createTableEntries from '../../ui/table/categorizeEntries';
import handleTableButtons from '../../ui/table/handleTableButtons';

//Visualizations
import setVisualizations from '../../ui/visualizations/setVisualizations';

import {
	GET_ENTRIES_SUCCESS,
	SET_CURRENTLY_BEIGN_EDITED,
	CLEAR_CURRENTLY_BEIGN_EDITED,
	TOGGLE_CURRENT_MONTH,
} from '../actiontypes/entry.js';

const { dispatch } = store;

// Return Functions

function onclearCurrentlyBeignEdited(entryId) {
	return {
		type: CLEAR_CURRENTLY_BEIGN_EDITED,
		payload: {
			entryId,
		},
	};
}

function onGetEntriesSuccess(entries) {
	return {
		type: GET_ENTRIES_SUCCESS,
		payload: {
			entries,
		},
	};
}

function onToggleCurrentMonth(month) {
	return {
		type: TOGGLE_CURRENT_MONTH,
		payload: {
			month,
		},
	};
}
// end return functions

function getEntries(requestedMonth) {
	var month = moment().format('YYYY-MM');
	var { currentMonth } = store.getState().entry;

	if (requestedMonth) {
		month = requestedMonth;
	} else {
		if (currentMonth) {
			month = currentMonth;
		}
	}

	setTogglerMonth(month);
	//only dispatch actions don't get entries
	dispatch(dispatch(onToggleCurrentMonth(month)));

	getIdTokenOfCurrentUser((idToken) => {
		axios({
			method: 'get',
			url: '/',
			headers: {
				Authorization: 'Bearer ' + idToken,
			},
			params: {
				month,
			},
		}).then(function (response) {
			var { entries } = response.data;

			createTableEntries(entries);
			setVisualizations(entries);
			handleTableButtons();

			dispatch(onGetEntriesSuccess(entries));
		});
	});
}

function addEntry(entryObj) {
	console.log(entryObj);
	getIdTokenOfCurrentUser((idToken) => {
		axios({
			method: 'post',
			url: '/',
			data: {
				...entryObj,
			},
			headers: {
				Authorization: 'Bearer ' + idToken,
			},
		}).then(function (response) {
			console.log(response);
			var addedEntryMonth = moment(response.data.entry.date).format('YYYY-MM');

			if (response.status === 200) {
				closeModel();
				createSuccessNotification(response.data.message);
				getEntries(addedEntryMonth);
				resetEntryModelValues();
			}
		});
	});
}

function updateEntry(updatedEntry) {
	getIdTokenOfCurrentUser((idToken) => {
		axios({
			method: 'put',
			url: '/',
			headers: {
				Authorization: 'Bearer ' + idToken,
			},
			data: {
				updatedEntry,
			},
		}).then(function (response) {
			const { currentMonth } = store.getState().entry;
			if (response.status === 200) {
				createSuccessNotification(response.data.message);
				closeModel();
				resetEntryModelValues();
				dispatch(onclearCurrentlyBeignEdited());
				getEntries();
			}
		});
	});
}

function deleteEntry(entryId) {
	getIdTokenOfCurrentUser((idToken) => {
		axios({
			method: 'delete',
			url: '/',
			headers: {
				Authorization: 'Bearer ' + idToken,
			},
			data: {
				entryId,
			},
		}).then(function (response) {
			createSuccessNotification(response.data.message);
			getEntries();
		});
	});
}

function setCurrentlyBeignEdited(entryId) {
	dispatch({
		type: SET_CURRENTLY_BEIGN_EDITED,
		payload: {
			entryId,
		},
	});
}

function clearCurrentlyBeignEdited(entryId) {
	dispatch(onclearCurrentlyBeignEdited(entryId));
}

function toggleCurrentMonth(month) {
	dispatch(onToggleCurrentMonth(month));
	getEntries();
}

export {
	setCurrentlyBeignEdited,
	clearCurrentlyBeignEdited,
	addEntry,
	deleteEntry,
	updateEntry,
	getEntries,
	toggleCurrentMonth,
};
