import {
	GET_TASK_DETAIlS_REDUCER,
	GET_REPOTER,
	GET_ALL_COMMENT,
	UPDATE_COMMENT,
	CHANGE_BUTTON_EDIT_COMMENT,
} from '../../util/constants/constants';

const initialState = {
	taskDetails: {},
	reporter: {},
	comments: [],
	commentEdit: {},
	isOnButtonEditComment: false,
};

const taskDetailReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_TASK_DETAIlS_REDUCER:
			return { ...state, taskDetails: { ...payload } };
		case GET_REPOTER:
			return { ...state, reporter: payload };
		case GET_ALL_COMMENT:
			return { ...state, comments: payload };
		case UPDATE_COMMENT:
			return { ...state, commentEdit: payload, isOnButtonEditComment: true };
		case CHANGE_BUTTON_EDIT_COMMENT:
			return { ...state, isOnButtonEditComment: payload };
		default:
			return state;
	}
};

export default taskDetailReducer;
