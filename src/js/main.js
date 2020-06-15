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
import updateNavbarUserName from './ui/navbar/updateNavbarUserName';
import updateNavbarAvatar from './ui/navbar/updateNavbarAvatar';

//Add Entry Button
import handleAddEntryButtonClick from './ui/addEntryButton/handleAddEntryButtonClick';

//MonthToggler
import handleMonthToggle from './ui/monthToggler/handleMonthToggle';

//modal
import addCloseHandlerToModel from './ui/modal/addCloseHandlerToModel';
import handleAddEntryModelSubmit from './ui/modal/handleEntryModelSubmit';
import resetEntryModalValues from './ui/modal/resetEntryModalValues';

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
