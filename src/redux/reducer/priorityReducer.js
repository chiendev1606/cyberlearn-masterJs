import { GET_PRIORITIES_API } from '../../util/constants/constants';

const initialState = {
	priorities: [],
};

const priorityReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_PRIORITIES_API:
			return { ...state, priorities: payload };

		default:
			return state;
	}
};

export default priorityReducer;
