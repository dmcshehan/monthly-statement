//STYLES
import '../scss/dashboard.scss';
import '../../node_modules/@fortawesome/fontawesome-free/js/all.js';

//AUTH
import firebase from './auth/firebase';
import { setAuthedUser } from './store/actionCreators/user';
import addLogoutHandler from './auth/addLogoutHandler';

//REDUX
import { store } from './store/index';
import { getEntries } from './store/actionCreators/entry';

//NavBar
import updateNavbarUserName from './ui/Navbar/updateNavbarUserName';
import updateNavbarAvatar from './ui/Navbar/updateNavbarAvatar';

//Add Entry Button
import handleAddEntryButtonClick from './ui/addEntryButton/handleAddEntryButtonClick';

//MonthToggler
import handleMonthToggle from './ui/MonthToggler/handleMonthToggle';

//modal
import addCloseHandlerToModel from './ui/Model/addCloseHandlerToModel';
import handleAddEntryModelSubmit from './ui/Model/handleEntryModelSubmit';
import resetEntryModalValues from './ui/Model/resetEntryModalValues';

firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		setAuthedUser(user); //synchronous
		doOnlyOnceAtTheBegining();
	} else {
		window.location = 'index.html';
	}
});

store.subscribe(() => {
	const currentState = store.getState();
});

function doOnlyOnceAtTheBegining() {
	console.log('Fired Functions for the first time');
	//Table
	getEntries();

	//Navbar
	updateNavbarUserName();
	updateNavbarAvatar();

	//Add Entry button
	handleAddEntryButtonClick();

	//Model
	addCloseHandlerToModel();
	handleAddEntryModelSubmit();
	resetEntryModalValues();

	//MonthToggler
	handleMonthToggle();

	//Auth
	addLogoutHandler();
}
