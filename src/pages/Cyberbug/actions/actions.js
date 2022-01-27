import {
	EDIT_PROJECT,
	GET_CATEGORY_PROJECT_API,
	GET_PROJECT_API,
	SEARCH_USER_API,
} from '../../../util/constants/constants';

export const dispatchCategoryProjectReducer = data => ({ type: GET_CATEGORY_PROJECT_API, payload: data });
export const dispatchActionGetProjectsReducer = data => ({ type: GET_PROJECT_API, payload: data });
export const dispatchActionChangeDrawerState = type => ({ type: type });
export const dispatchProjectEditReducer = data => ({ type: EDIT_PROJECT, payload: data });
export const dispatchUsersProjectReducer = data => ({ type: SEARCH_USER_API, payload: data });
