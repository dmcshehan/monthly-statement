import store from '../index.js';
import axios from '../../shared/axios.js';

import getIdTokenOfCurrentUser from '../../auth/getIdTokenOfCurrentUser.js';
import { FETCH_CURRENT_MONTH_ENTRIES_SUCCESS } from '../actiontypes/entry.js';

const { dispatch } = store;

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

export { fetchEntriesOfCurrentMonth };
