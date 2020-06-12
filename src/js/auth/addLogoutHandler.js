import firebase from './firebase.js';
import { logout } from '../store/actionCreators/user.js';
export default function addLogoutHandler() {
	document.querySelector('#logout').addEventListener('click', function loguserOut() {
		firebase
			.auth()
			.signOut()
			.then(function () {
				logout();
			})
			.catch(function (error) {
				// An error happened
			});
	});
}
