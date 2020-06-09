import firebase from './auth/firebase.js';
import store from './store/index.js';
import '../scss/main.scss';

import { fetchEntriesOfCurrentMonth } from './store/actionCreators/entry.js';
import { createTableEntries } from './uiUpdates.js';

firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		fetchEntriesOfCurrentMonth();
	} else {
		window.location = 'index.html';
	}
});

store.subscribe(() => {
	const currentState = store.getState();
	const entries = currentState.entry.entries;
	createTableEntries(entries);
});
