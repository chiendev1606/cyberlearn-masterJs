import { GET_USER } from '../../util/constants/constants';

const initialState = {
	usersProject: [],
};

const usersProjectReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_USER:
			return { ...state, usersProject: payload };

		default:
			return state;
	}
};

export default usersProjectReducer;
