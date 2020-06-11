import firebase from './auth/firebase.js';
import store from './store/index.js';
import '../scss/main.scss';
import '../../node_modules/@fortawesome/fontawesome-free/js/all.js';

import { fetchEntriesOfCurrentMonth } from './store/actionCreators/entry.js';
import { createTableEntries } from './uiUpdates.js';
import {
	addClickHandlersToTableActionButtons,
	addOnChangeHandlersToTableInputs,
	setFocusOnPrevioslyChangeInput,
} from './uiHandlers.js';

firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		fetchEntriesOfCurrentMonth();
	} else {
		window.location = 'index.html';
	}
});

store.subscribe(() => {
	const currentState = store.getState();

	//function pipe
	createTableEntries(currentState);
	addClickHandlersToTableActionButtons();
	addOnChangeHandlersToTableInputs();
	setFocusOnPrevioslyChangeInput(currentState);
});
