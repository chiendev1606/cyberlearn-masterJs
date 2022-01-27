import { CHANGE_LOADING } from '../../util/constants/constants';

const initialState = {
	isLoading: false,
};

const loadingReducer = (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_LOADING:
			return { ...state, isLoading: !state.isLoading };

		default:
			return state;
	}
};

export default loadingReducer;
