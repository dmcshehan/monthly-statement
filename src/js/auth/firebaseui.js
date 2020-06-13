import firebase from './firebase';
import * as firebaseui from 'firebaseui';
import '../../scss/home.scss';


import '../../../node_modules/firebaseui/dist/firebaseui.css';

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

const uiConfig = {
	callbacks: {
		signInSuccessWithAuthResult: function (authResult, redirectUrl) {
			// User successfully signed in.
			// Return type determines whether we continue the redirect automatically
			// or whether we leave that to developer to handle.
			return true;
		},
		uiShown: function () {
			// The widget is rendered.
			// Hide the loader.
			document.getElementById('loader').style.display = 'none';
		},
	},
	// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
	signInFlow: 'popup',
	signInSuccessUrl: 'dashboard.html',
	signInOptions: [
		// can be added scopes for each object
		{
			provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
		},
		{
			provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		},
	],
	// Terms of service url.
	tosUrl: 'http://localhost:8083/',
	// Privacy policy url.
	privacyPolicyUrl: 'http://localhost:8083/',
};

ui.start('#firebaseui-auth-container', uiConfig);
