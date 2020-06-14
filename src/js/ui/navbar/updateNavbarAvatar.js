import { store } from '../../store/index.js';

export default () => {
	const { photoURL } = store.getState().user.authedUser;
	const navBarUsername = document.querySelector('.navbar-end .username');

	if (photoURL) {
		const avatar = document.createElement('img');
		avatar.classList.add('user-avatar');
		avatar.src = photoURL;
		navBarUsername.prepend(avatar);
	}
	return;
};
