import firebase from './firebase/firebase';
import '../scss/main.scss';

//Dome Elements

firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		// User is signed in.
		console.log('onAuthStateChanged', user);
	} else {
		window.location = 'index.html';
	}
});
