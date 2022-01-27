import { GET_PROJECT_API, EDIT_PROJECT, SEARCH_USER_API } from '../../util/constants/constants';

const initialState = {
	projects: [],
	projectEdit: {},
	usersProject: [],
};

const projectManagementReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_PROJECT_API:
			return { ...state, projects: action.payload };
		case EDIT_PROJECT:
			return { ...state, projectEdit: action.payload };
		case SEARCH_USER_API:
			return {
				...state,
				usersProject: action.payload
					? action.payload.map(user => ({ label: user.name, value: user.userId.toString() }))
					: [],
			};
		default:
			return state;
	}
};

export default projectManagementReducer;
