import { SET_AUTHEDUSER, LOGOUT } from '../actiontypes/user.js';
import produce from 'immer';

const initialState = {
	authedUser: null,
};

function userReducer(state = initialState, action) {
	return produce(state, (draftState) => {
		const { type, payload } = action;
		switch (type) {
			case SET_AUTHEDUSER:
				draftState.authedUser = payload.user;
				break;
			case LOGOUT:
				draftState.authedUser = null;
				break;
		}
	});
}

export default userReducer;
