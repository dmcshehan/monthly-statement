import firebase from '../auth/firebase.js';

export default function getIdTokenOfCurrentUser(callback) {
	const currentUser = firebase.auth().currentUser;

	currentUser
		.getIdToken(true)
		.then(function (idToken) {
			callback(idToken);
		})
		.catch(function (error) {
			console.error('[getTokenOfCurrentUser]', error);
		});
}
