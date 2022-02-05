import { GET_PROJECT_DETAILS } from '../../util/constants/constants';

const initialState = {
	projectDetails: {},
};

const projectDetailsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_PROJECT_DETAILS:
			return { ...state, projectDetails: payload };

		default:
			return state;
	}
};

export default projectDetailsReducer;
