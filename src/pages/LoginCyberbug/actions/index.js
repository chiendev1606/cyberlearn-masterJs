import { CHANGE_HISTORY, SIGN_IN, CATCH_ERROR, CHANGE_LOADING } from '../../../util/constants/constants';

export const dispatchSignInReducer = user => ({
	type: SIGN_IN,
	user: user,
});

export const dispatchHistoryReducer = history => ({
	type: CHANGE_HISTORY,
	payload: history,
});

export const dispatchErrorSignIn = error => ({
	type: CATCH_ERROR,
	payload: error,
});

export const dispatchChangeLoadingReducer = () => ({
	type: CHANGE_LOADING,
});
