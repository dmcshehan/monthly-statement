import store from '../../store/index.js';

export default function updateNavbarUserName() {
	const { displayName, photoURL } = store.getState().user.authedUser;
	const navBarUsername = document.querySelector('.navbar-end .username');
	const nameSpan = document.createElement('span');

	nameSpan.textContent = displayName;

	const avatar = document.createElement('img');
	avatar.src = photoURL;
	avatar.classList.add('user-avatar');

	navBarUsername.appendChild(nameSpan);
	navBarUsername.prepend(avatar);
}
