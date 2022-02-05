import { CHANGE_MODAL_PROJECTDETAIL_REDUCER } from '../../util/constants/constants';

const initialState = {
	showModal: () => {},
	handleClose: () => {},
};

const modalProjectDetailReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case CHANGE_MODAL_PROJECTDETAIL_REDUCER:
			return { ...state, showModal: payload.showModal, handleCancel: payload.handleClose };

		default:
			return state;
	}
};
export default modalProjectDetailReducer;
