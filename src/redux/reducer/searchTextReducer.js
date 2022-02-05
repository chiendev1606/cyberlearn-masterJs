import { CHANGE_SEARCH_TEXT } from '../../util/constants/constants';

const initialState = { searchText: '' };

const searchTextReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case CHANGE_SEARCH_TEXT:
			return { ...state, searchText: payload };

		default:
			return state;
	}
};

export default searchTextReducer;
