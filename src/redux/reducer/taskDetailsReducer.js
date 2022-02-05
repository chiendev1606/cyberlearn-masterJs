import { GET_TASK_DETAIlS_REDUCER, GET_REPOTER, GET_ALL_COMMENT } from '../../util/constants/constants';

const initialState = { taskDetails: {}, reporter: {}, comments: [] };

const taskDetailReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_TASK_DETAIlS_REDUCER:
			return { ...state, taskDetails: { ...payload } };
		case GET_REPOTER:
			return { ...state, reporter: payload };
		case GET_ALL_COMMENT:
			return { ...state, comments: payload };
		default:
			return state;
	}
};

export default taskDetailReducer;
