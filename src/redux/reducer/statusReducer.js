import { GET_STATUS } from '../../util/constants/constants';

const initialState = { status: [] };

const statusReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_STATUS:
			return { ...state, status: payload };

		default:
			return state;
	}
};

export default statusReducer;
