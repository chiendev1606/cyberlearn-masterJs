import { CATCH_ERROR, SIGN_IN } from '../../util/constants/constants';

const initialState = {
	user: {},
	errors: '',
	isLogin: false,
};

const jiraReducer = (state = initialState, action) => {
	switch (action.type) {
		case SIGN_IN:
			return { ...state, user: action.user, isLogin: true };
		case CATCH_ERROR:
			return { ...state, errors: action.payload };
		default:
			return state;
	}
};

export default jiraReducer;
