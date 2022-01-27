import { CLOSE_DRAWER, OPEN_DRAWER } from '../../util/constants/constants';

const initialState = {
	isVisible: false,
};

const drawerCyberbugReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case OPEN_DRAWER:
			return { ...state, isVisible: true };
		case CLOSE_DRAWER:
			return { ...state, isVisible: false };
		default:
			return state;
	}
};

export default drawerCyberbugReducer;
