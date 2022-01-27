import { CHANGE_HISTORY } from '../../util/constants/constants';

const initialState = {
	history: {},
};

const historyReducer = (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_HISTORY:
			return {
				...state,
				history: action.payload,
			};

		default:
			return state;
	}
};

export default historyReducer;
