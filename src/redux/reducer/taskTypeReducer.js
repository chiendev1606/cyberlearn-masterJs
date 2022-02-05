import { GET_TASK_TYPE_API } from '../../util/constants/constants';

const initialState = { taskTypes: [] };

const taskTypeReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_TASK_TYPE_API:
			return { ...state, taskTypes: payload };

		default:
			return state;
	}
};

export default taskTypeReducer;
