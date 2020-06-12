import store from '../../store/index.js';

export default function updateNavbarUserName() {
	const navBarUsername = document.querySelector('.navbar-end .username');
	navBarUsername.textContent = store.getState().user.authedUser.displayName;
}
