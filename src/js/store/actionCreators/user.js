import { store } from '../index.js';

import { SET_AUTHEDUSER, LOGOUT } from '../actiontypes/user.js';

const { dispatch } = store;

function setAuthedUser(user) {
	dispatch({
		type: SET_AUTHEDUSER,
		payload: {
			user,
		},
	});
}
function logout() {
	dispatch({
		type: LOGOUT,
	});
}

export { setAuthedUser, logout };
