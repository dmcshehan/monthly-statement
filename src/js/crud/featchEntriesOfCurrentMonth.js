import axios from '../shared/axios.js';

function featchEntriesForCurrentMonth(idToken, callback) {
	axios({
		method: 'get',
		url: '/',
		headers: {
			Authorization: 'Bearer ' + idToken,
		},
	})
		.then(function (response) {
			callback(response);
		})
		.catch(function (error) {
			console.log(error);
		});
}

export default featchEntriesForCurrentMonth;
