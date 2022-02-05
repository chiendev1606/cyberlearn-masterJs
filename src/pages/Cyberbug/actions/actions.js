import {
	EDIT_PROJECT,
	GET_CATEGORY_PROJECT_API,
	GET_PRIORITIES_API,
	GET_PROJECT_API,
	GET_PROJECT_DETAILS,
	SEARCH_USER_API,
	GET_TASK_TYPE_API,
	GET_USER,
	GET_STATUS,
	CREATE_TASK,
	CHANGE_MODAL_PROJECTDETAIL_REDUCER,
	GET_TASK_DETAIlS_REDUCER,
	CHANGE_STATUS_TASK_DETAIL,
	GET_REPOTER,
	GET_ALL_COMMENT,
	CHANGE_SEARCH_TEXT,
	CHANGE_VISIBLE_MODAL_EDIT_USER,
	EDIT_USER,
} from '../../../util/constants/constants';

export const dispatchCategoryProjectReducer = data => ({ type: GET_CATEGORY_PROJECT_API, payload: data });
export const dispatchActionGetProjectsReducer = data => ({ type: GET_PROJECT_API, payload: data });
export const dispatchActionChangeDrawerState = type => ({ type: type });
export const dispatchProjectEditReducer = data => ({ type: EDIT_PROJECT, payload: data });
export const dispatchUsersProjectReducer = data => ({ type: SEARCH_USER_API, payload: data });
export const dispatchGetProjectDetailsReducer = data => ({ type: GET_PROJECT_DETAILS, payload: data });
export const dispatchActionGetPrioritiesReducer = data => ({
	type: GET_PRIORITIES_API,
	payload: data,
});
export const dispatchActionGetTaskTypeReducer = data => ({
	type: GET_TASK_TYPE_API,
	payload: data,
});

export const dispatchActionGetUserReducer = data => ({
	type: GET_USER,
	payload: data,
});

export const dispatchActionGetStatusReducer = data => ({ type: GET_STATUS, payload: data });
export const dispatchActionCreateTaskReducer = data => ({ type: CREATE_TASK, payload: data });

export const dispatchActionChangeVisibleModal = data => ({
	type: CHANGE_MODAL_PROJECTDETAIL_REDUCER,
	payload: data,
});
export const dispatchGetTaskDetailsReducer = data => ({ type: GET_TASK_DETAIlS_REDUCER, payload: data });
export const dispatchActionChangeStatus = data => ({ type: CHANGE_STATUS_TASK_DETAIL, payload: data });
export const dispatchActionReporterReducer = data => ({ type: GET_REPOTER, payload: data });
export const dispatchActionGetAllCommentReducer = data => ({ type: GET_ALL_COMMENT, payload: data });
export const dispatchActionChangeSearchText = data => ({
	type: CHANGE_SEARCH_TEXT,
	payload: data,
});

export const dispatchActionChangeVisibleModalReducer = data => ({
	type: CHANGE_VISIBLE_MODAL_EDIT_USER,
	payload: data,
});

export const dispatchActionUserEdit = data => ({
	type: EDIT_USER,
	payload: data,
});
