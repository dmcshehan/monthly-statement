import { store } from '../index.js';
import axios from '../../shared/axios.js';

import getIdTokenOfCurrentUser from '../../auth/getIdTokenOfCurrentUser.js';

import closeModel from '../../ui/Model/closeEntryModel';
import resetEntryModelValues from '../../ui/Model/resetEntryModalValues';

import {
	FETCH_CURRENT_MONTH_ENTRIES_SUCCESS,
	FETCH_SPECIFIC_MONTH_ENTRIES_SUCCESS,
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

function onGetEntriesForASpecificMonthSuccess(entries) {
	return {
		type: FETCH_SPECIFIC_MONTH_ENTRIES_SUCCESS,
		payload: {
			entries,
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

function addEntry(entryObj) {
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
		})
			.then(function (response) {
				if (response.status === 201) {
					fetchEntriesOfCurrentMonth();
					closeModel();
					resetEntryModelValues();
				}
			})
			.catch(function (error) {
				console.log(error);
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
		})
			.then(function (response) {
				if (response.status === 204) {
					fetchEntriesOfCurrentMonth();
					dispatch(onclearCurrentlyBeignEdited());
					closeModel();
					resetEntryModelValues();
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

function getEntriesForASpecificMonth(month) {
	console.log(month);
	getIdTokenOfCurrentUser((idToken) => {
		axios({
			method: 'get',
			url: '/month',
			headers: {
				Authorization: 'Bearer ' + idToken,
			},
			params: {
				month,
			},
		})
			.then(function (response) {
				var entries = response.data;
				dispatch(onGetEntriesForASpecificMonthSuccess(entries));
				dispatch(onToggleCurrentMonthSuccess(month));
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

function onToggleCurrentMonthSuccess(month) {
	return {
		type: TOGGLE_CURRENT_MONTH,
		payload: {
			month,
		},
	};
}

export {
	fetchEntriesOfCurrentMonth,
	setCurrentlyBeignEdited,
	clearCurrentlyBeignEdited,
	addEntry,
	deleteEntry,
	updateEntry,
	getEntriesForASpecificMonth,
};
