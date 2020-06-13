import { store } from '../index.js';
import axios from '../../shared/axios.js';

import getIdTokenOfCurrentUser from '../../auth/getIdTokenOfCurrentUser.js';

import closeModel from '../../ui/addEntryModel/closeModel.js';

import {
	FETCH_CURRENT_MONTH_ENTRIES_SUCCESS,
	SET_CURRENTLY_BEIGN_EDITED,
	CLEAR_CURRENTLY_BEIGN_EDITED,
	EDI_CURRENTLY_BEIGN_EDITED,
	EDIT_CURRENTLY_BEIGN_ADDED,
	CLEAR_CURRENTLY_BEIGN_ADDED,
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

// end return functions

function fetchEntriesOfCurrentMonth() {
	getIdTokenOfCurrentUser((idToken) => {
		axios({
			method: 'get',
			url: '/',
			headers: {
				Authorization: 'Bearer ' + idToken,
			},
		})
			.then(function (response) {
				dispatch({
					type: FETCH_CURRENT_MONTH_ENTRIES_SUCCESS,
					payload: {
						entries: response.data,
					},
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	});
}

function addEntry() {
	getIdTokenOfCurrentUser((idToken) => {
		axios({
			method: 'post',
			url: '/',
			data: {
				...store.getState().entry.currentlyBeignAdded,
			},
			headers: {
				Authorization: 'Bearer ' + idToken,
			},
		})
			.then(function (response) {
				if (response.status === 201) {
					closeModel();
					clearCurrentlyBeignAdded();
					fetchEntriesOfCurrentMonth();
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	});
}

function updateEntry(entryId) {
	getIdTokenOfCurrentUser((idToken) => {
		axios({
			method: 'put',
			url: '/',
			headers: {
				Authorization: 'Bearer ' + idToken,
			},
			data: {
				updatedEntry: store.getState().entry.currentlyBeignEdited,
			},
		})
			.then(function (response) {
				if (response.status === 204) {
					fetchEntriesOfCurrentMonth();
					dispatch(onclearCurrentlyBeignEdited());
				}
			})
			.catch(function (error) {
				console.log(error);
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
		})
			.then(function (response) {
				console.log(response);
				fetchEntriesOfCurrentMonth();
			})
			.catch(function (error) {
				console.log(error);
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

function editCurrentlyBeignEdited(key, value) {
	dispatch({
		type: EDI_CURRENTLY_BEIGN_EDITED,
		payload: {
			key,
			value,
		},
	});
}

function editCurrentlyBeignAdded(key, value) {
	dispatch({
		type: EDIT_CURRENTLY_BEIGN_ADDED,
		payload: {
			key,
			value,
		},
	});
}

function clearCurrentlyBeignAdded() {
	dispatch({
		type: CLEAR_CURRENTLY_BEIGN_ADDED,
	});
}

export {
	fetchEntriesOfCurrentMonth,
	setCurrentlyBeignEdited,
	clearCurrentlyBeignEdited,
	editCurrentlyBeignEdited,
	editCurrentlyBeignAdded,
	addEntry,
	clearCurrentlyBeignAdded,
	deleteEntry,
	updateEntry,
};
