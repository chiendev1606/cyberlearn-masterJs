import { CATCH_ERROR, CHANGE_LOADING, GET_TODO } from '../../sagas/todoListSaga/constants';

const initialState = {
	todoList: [],
	isLoading: false,
	error: '',
};

const todoListReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_TODO:
			return {
				...state,
				todoList: [...action.data],
			};
		case CHANGE_LOADING:
			return { ...state, isLoading: !state.isLoading };
		case CATCH_ERROR:
			return { ...state, error: action.error };

		default:
			return state;
	}
};

export default todoListReducer;
