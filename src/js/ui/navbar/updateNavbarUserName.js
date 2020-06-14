import { store } from '../../store/index.js';

export default () => {
	const { displayName } = store.getState().user.authedUser;
	const navBarUsername = document.querySelector('.navbar-end .username');
	const nameSpan = document.createElement('span');

	nameSpan.textContent = displayName;
	navBarUsername.appendChild(nameSpan);
};
