//AUTH
import firebase from './auth/firebase.js';

//REDUX
import store from './store/index.js';

//STYLES
import '../scss/main.scss';
import '../../node_modules/@fortawesome/fontawesome-free/js/all.js';

import { fetchEntriesOfCurrentMonth } from './store/actionCreators/entry.js';
import { setAuthedUser } from './store/actionCreators/user.js';

//-------------------- UI --------------------//
//Table
import createTableEntries from './ui/table/createTableEntries.js';
import addClickHandlersToTableActionButtons from './ui/table/addClickHandlersToTableActionButtons.js';
import addOnChangeHandlersToTableInputs from './ui/table/addOnChangeHandlersToTableInputs.js';
import setFocusOnPrevioslyChangeInput from './ui/table/setFocusOnPrevioslyChangeInput.js';

//NavBar
import updateNavbarUserName from './ui/navbar/updateNavbarUserName.js';

//Add Entry Button
import handleAddEntryButtonClick from './ui/addEntryButton/handleAddEntryButtonClick.js';

//Model
import addCloseHandlerToModel from './ui/addEntryModel/addCloseHandlerToModel.js';
import setAddEntryModelValues from './ui/addEntryModel/setAddEntryModelValues.js';
import addSubmitHandlerToAddEntryForm from './ui/addEntryModel/addSubmitHandlerToAddEntryForm.js';
import addEventHandlersToModelFormInputs from './ui/addEntryModel/addEventHandlersToModelFormInputs.js';

//Auth
import addLogoutHandler from './auth/addLogoutHandler.js';

firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		setAuthedUser(user);
		doOnlyOnceAtTheBegining();
	} else {
		window.location = 'index.html';
	}
});

store.subscribe(() => {
	const currentState = store.getState();

	createTableEntries(currentState);
	addClickHandlersToTableActionButtons();
	addOnChangeHandlersToTableInputs();
	setFocusOnPrevioslyChangeInput(currentState);

	//resetting values of add entry model (Experiemtal)
	setAddEntryModelValues();
});

function doOnlyOnceAtTheBegining() {
	/**** only one time is enough *****/
	//Table
	fetchEntriesOfCurrentMonth();

	//Model
	handleAddEntryButtonClick();
	addCloseHandlerToModel();
	addEventHandlersToModelFormInputs();
	addSubmitHandlerToAddEntryForm();

	//Auth
	addLogoutHandler();

	//Navbar
	updateNavbarUserName();
}
