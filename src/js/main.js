//STYLES
import '../scss/dashboard.scss';
import '../../node_modules/@fortawesome/fontawesome-free/js/all.js';

//AUTH
import firebase from './auth/firebase';
import { setAuthedUser } from './store/actionCreators/user';
import addLogoutHandler from './auth/addLogoutHandler';

//REDUX
import { store } from './store/index';
import { fetchEntriesOfCurrentMonth } from './store/actionCreators/entry';

//NavBar
import updateNavbarUserName from './ui/Navbar/updateNavbarUserName';
import updateNavbarAvatar from './ui/Navbar/updateNavbarAvatar';

//Table
import createTableEntries from './ui/Table/createTableEntries';
import handlersTableButtons from './ui/Table/handlersTableButtons';

//Add Entry Button
import handleAddEntryButtonClick from './ui/addEntryButton/handleAddEntryButtonClick';

//MonthToggler
import handleMonthToggle from './ui/MonthToggler/handleMonthToggle';
import setTogglerMonth from './ui/MonthToggler/setTogglerMonth';

//Visualizations
import setVisualizations from './ui/visualizations/setVisualizations';

//modal
import addCloseHandlerToModel from './ui/Model/addCloseHandlerToModel';
import handleAddEntryModelSubmit from './ui/Model/handleEntryModelSubmit';

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

	//table
	createTableEntries(currentState);
	handlersTableButtons();

	//only needed when entrie changed
	setVisualizations();

	//only needed when the toggler month changed
	setTogglerMonth();
});

function doOnlyOnceAtTheBegining() {
	/**** only one time is enough *****/

	//Navbar
	updateNavbarUserName();
	updateNavbarAvatar();

	//Table
	fetchEntriesOfCurrentMonth();

	//add entry button
	handleAddEntryButtonClick();

	//Model
	addCloseHandlerToModel();
	handleAddEntryModelSubmit();

	//MonthToggler
	handleMonthToggle();

	//Auth
	addLogoutHandler();
}
