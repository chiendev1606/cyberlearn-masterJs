import { CHANGE_VISIBLE_MODAL_EDIT_USER, EDIT_USER } from '../../util/constants/constants';

const initialState = { handleCancel: () => {}, showModal: () => {}, userEdit: {} };

const modalEditUserReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case CHANGE_VISIBLE_MODAL_EDIT_USER:
			return { ...state, handleCancel: payload.handleCancel, showModal: payload.showModal };
		case EDIT_USER:
			return { ...state, userEdit: payload };
		default:
			return state;
	}
};
export default modalEditUserReducer;
