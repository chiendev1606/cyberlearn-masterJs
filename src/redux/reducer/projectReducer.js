import { GET_CATEGORY_PROJECT_API } from '../../util/constants/constants';

const initialState = {
	projectCategory: [],
};

const projectReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_CATEGORY_PROJECT_API:
			return { ...state, projectCategory: action.payload };

		default:
			return state;
	}
};

export default projectReducer;
