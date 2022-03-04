import {
	CREATE_PROJECT_AUTHORIZATION_SAGA,
	DELETE_PROJECT_API_SAGA,
	EDIT_PROJECT_SAGA,
	GET_CATEGORY_PROJECT_API_SAGA,
	GET_PROJECT_API_SAGA,
	SIGN_IN_SAGA,
	SEARCH_USER_API_SAGA,
	ADD_USER_API_SAGA,
	REMOVE_USER_PROJECT_SAGA,
	GET_PROJECT_DETAILS_SAGA,
	GET_PRIORITIES_API_SAGA,
	GET_TASK_TYPE_API_SAGA,
	GET_USER_SAGA,
	GET_STATUS_SAGA,
	CREATE_TASK_SAGA,
	GET_TASK_DETAIlS_SAGA,
	CHANGE_STATUS_TASK_DETAIL_SAGA,
	ASSIGN_USER_TASK_SAGA,
	UPDATE_TASK_SAGA,
	GET_ALL_COMMENT_SAGA,
	SIGN_UP_SAGA,
	EDIT_USER_SAGA,
	DELETE_USER_SAGA,
	POST_COMMENT_SAGA,
	UPDATE_COMMENT_SAGA,
	DELETE_COMMENT_SAGA,
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

export const dispatchRemoveUserProjectSaga = data => ({
	type: REMOVE_USER_PROJECT_SAGA,
	payload: data,
});
export const dispatchGetProjectDetailsSaga = id => ({
	type: GET_PROJECT_DETAILS_SAGA,
	payload: id,
});

export const dispatchGetPrioritiesSaga = () => ({ type: GET_PRIORITIES_API_SAGA });
export const dispatchGetTaskTypeSaga = () => ({ type: GET_TASK_TYPE_API_SAGA });

export const dispatchActionGetUserSaga = () => ({ type: GET_USER_SAGA });

export const dispatchActionGetStatusSaga = () => ({ type: GET_STATUS_SAGA });

export const dispatchActionCreateTaskSaga = data => ({ type: CREATE_TASK_SAGA, payload: data });

export const dispatchActionGetTaskDetailsSaga = data => ({ type: GET_TASK_DETAIlS_SAGA, payload: data });

export const dispatchActionChangeStatusSaga = data => ({
	type: CHANGE_STATUS_TASK_DETAIL_SAGA,
	payload: data,
});

export const dispatchActionAssignUserTaskSaga = data => ({
	type: ASSIGN_USER_TASK_SAGA,
	payload: data,
});

export const dispatchActionUpdateTaskSaga = data => ({
	type: UPDATE_TASK_SAGA,
	payload: data,
});

export const dispatchActionGetAllComment = id => ({
	type: GET_ALL_COMMENT_SAGA,
	payload: id,
});
export const dispatchActionSignUpSaga = data => ({
	type: SIGN_UP_SAGA,
	payload: data,
});

export const dispatchActionEditUserSaga = data => ({
	type: EDIT_USER_SAGA,
	payload: data,
});

export const dispatchActionDeleteUser = data => ({
	type: DELETE_USER_SAGA,
	payload: data,
});

export const dispatchActionPostCommentSaga = data => ({
	type: POST_COMMENT_SAGA,
	payload: data,
});

export const dispatchActionUpdateCommentSaga = data => ({
	type: UPDATE_COMMENT_SAGA,
	payload: data,
});
export const dispatchActionDeleteComment = data => ({
	type: DELETE_COMMENT_SAGA,
	payload: data,
});
