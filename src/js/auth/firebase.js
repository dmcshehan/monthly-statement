import * as firebase from 'firebase/app';
import 'firebase/auth';

var firebaseConfig = {
	apiKey: 'AIzaSyDrK4k4xJSdGu9M_mVcW0fKEvtvsTGtMUA',
	authDomain: 'monthly-statement.firebaseapp.com',
	databaseURL: 'https://monthly-statement.firebaseio.com',
	projectId: 'monthly-statement',
	storageBucket: 'monthly-statement.appspot.com',
	messagingSenderId: '446201116485',
	appId: '1:446201116485:web:bae8dd51f5cc86f448b02c',
	measurementId: 'G-VCZRGV9LEY',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
