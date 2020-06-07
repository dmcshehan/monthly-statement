import firebase from './auth/firebase.js';
import '../scss/main.scss';

import fetchEntries from './crud/featchEntries.js';

firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		const currentUser = firebase.auth().currentUser;

		currentUser
			.getIdToken(/* forceRefresh */ true)
			.then(function (idToken) {
				fetchEntries(idToken, (entries) => {
					console.log(entries);
				});
			})
			.catch(function (error) {
				// Handle error
			});
	} else {
		window.location = 'index.html';
	}
});
