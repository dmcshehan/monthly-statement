import { store } from '../../store/index.js';

export default function updateNavbarAvatar() {
	const { photoURL } = store.getState().user.authedUser;
	const navBarUsername = document.querySelector('.navbar-end .username');

	let avatar;

	if (photoURL) {
		avatar = document.createElement('img');
		avatar.src = photoURL;
	} else {
		avatar = document.createElement('i');
		avatar.classList.add('far');
		avatar.classList.add('fa-user-circle');
	}

	avatar.classList.add('user-avatar');
	navBarUsername.prepend(avatar);
}
