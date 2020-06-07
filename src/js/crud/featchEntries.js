import axios from '../shared/axios.js';

function fetEntries(idToken, callback) {
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

export default fetEntries;
