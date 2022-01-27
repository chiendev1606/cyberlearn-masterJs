import {
	CREATE_PROJECT_AUTHORIZATION_SAGA,
	DELETE_PROJECT_API_SAGA,
	EDIT_PROJECT_SAGA,
	GET_CATEGORY_PROJECT_API_SAGA,
	GET_PROJECT_API_SAGA,
	SIGN_IN_SAGA,
	SEARCH_USER_API_SAGA,
	ADD_USER_API_SAGA,
} from '../../util/constants/constants';

export const dispatchActionSignInSaga = user => ({
	type: SIGN_IN_SAGA,
	user: {
		email: user.email,
		password: user.password,
	},
});

export const dispatchActionCreateProjectSaga = newProject => ({
	type: CREATE_PROJECT_AUTHORIZATION_SAGA,
	payload: newProject,
});

export const dispatchActionGetCategoryProject = () => ({
	type: GET_CATEGORY_PROJECT_API_SAGA,
});

export const dispatchActionGetProjectsSaga = () => ({
	type: GET_PROJECT_API_SAGA,
});

export const dispatchActionEditProjectSaga = payload => ({
	type: EDIT_PROJECT_SAGA,
	payload: payload,
});

export const dispatchActionDeleteProjectSaga = payload => ({
	type: DELETE_PROJECT_API_SAGA,
	payload: payload,
});

export const dispatchActionSearchUserSaga = data => ({
	type: SEARCH_USER_API_SAGA,
	payload: data,
});

export const dipatchActionAddUserProjectSaga = data => ({
	type: ADD_USER_API_SAGA,
	payload: data,
});
