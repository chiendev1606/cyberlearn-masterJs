import { call, delay, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { JiraAPI } from '../../api/jiraApi';
import {
	dispatchActionChangeDrawerState,
	dispatchActionGetAllCommentReducer,
	dispatchActionGetPrioritiesReducer,
	dispatchActionGetProjectsReducer,
	dispatchActionGetStatusReducer,
	dispatchActionGetTaskTypeReducer,
	dispatchActionGetUserReducer,
	dispatchCategoryProjectReducer,
	dispatchGetProjectDetailsReducer,
	dispatchGetTaskDetailsReducer,
	dispatchUsersProjectReducer,
} from '../../pages/Cyberbug/actions/actions';
import {
	ChangeModalVisibleSelector,
	CloseModalEditUserVisibleSelector,
} from '../../pages/Cyberbug/Selectors/CyberBugSelectors';
import {
	dispatchChangeLoadingReducer,
	dispatchErrorSignIn,
	dispatchSignInReducer,
} from '../../pages/LoginCyberbug/actions';
import {
	ACCESS_TOKEN,
	ADD_USER_API_SAGA,
	ASSIGN_USER_TASK_SAGA,
	CHANGE_STATUS_TASK_DETAIL_SAGA,
	CLOSE_DRAWER,
	CREATE_PROJECT_AUTHORIZATION_SAGA,
	CREATE_TASK_SAGA,
	DELETE_PROJECT_API_SAGA,
	DELETE_USER_SAGA,
	EDIT_PROJECT_SAGA,
	EDIT_USER_SAGA,
	GET_ALL_COMMENT_SAGA,
	GET_CATEGORY_PROJECT_API_SAGA,
	GET_PRIORITIES_API_SAGA,
	GET_PROJECT_API_SAGA,
	GET_PROJECT_DETAILS_SAGA,
	GET_STATUS_SAGA,
	GET_TASK_DETAIlS_SAGA,
	GET_TASK_TYPE_API_SAGA,
	GET_USER_SAGA,
	REMOVE_USER_PROJECT_SAGA,
	SEARCH_USER_API_SAGA,
	SIGN_IN_SAGA,
	SIGN_UP_SAGA,
	STATUS_API,
	UPDATE_TASK_SAGA,
	USER,
} from '../../util/constants/constants';
import history from '../../util/history';
import { Notification } from '../../util/notifications';
import {
	dispatchActionGetTaskDetailsSaga,
	dispatchActionGetUserSaga,
	dispatchGetProjectDetailsSaga,
} from './actions';

function* sigIn({ type, user }) {
	try {
		const { data, ...res } = yield call(() => JiraAPI.singIn(user));
		yield put(dispatchChangeLoadingReducer());
		yield delay(1000);

		if (res.status === STATUS_API.SUCCESS) {
			localStorage.setItem(USER, JSON.stringify(user));
			localStorage.setItem(ACCESS_TOKEN, data.content.accessToken);

			yield put(dispatchSignInReducer(data.content));

			yield put(dispatchErrorSignIn(''));
			history.push('/projectManagement');

			yield put(dispatchChangeLoadingReducer());
		}
	} catch (error) {
		yield put(dispatchErrorSignIn(error.response.data.message));
	}
}

export function* watchActionSignInJira() {
	yield takeLatest(SIGN_IN_SAGA, sigIn);
}

function* getProjectCategory(action) {
	try {
		const { data, status } = yield call(() => JiraAPI.getProjectCategory());
		if (status === STATUS_API.SUCCESS) {
			yield put(dispatchCategoryProjectReducer(data.content));
		}
	} catch (error) {
		console.log(error);
	}
}

export function* watchActionGetProjectAPI() {
	yield takeLatest(GET_CATEGORY_PROJECT_API_SAGA, getProjectCategory);
}

function* createProjectAuthorization({ type, payload }) {
	try {
		const { status } = yield call(() => JiraAPI.createProject(payload));
		history.push('/projectManagement');
		Notification('success', 'create Project successfully');
	} catch (error) {
		console.log(error);
		Notification('error', 'create Project fail');
	}
}

export function* watchActionCreateProject() {
	yield takeLatest(CREATE_PROJECT_AUTHORIZATION_SAGA, createProjectAuthorization);
}

function* getAllProjectsApi() {
	try {
		const { data, status } = yield call(() => JiraAPI.getProjects());
		if (status === STATUS_API.SUCCESS) {
			yield put(dispatchActionGetProjectsReducer(data.content));
		}
	} catch (error) {
		console.log(error);
	}
}

export function* watchActionGetAllProjects() {
	yield takeLatest(GET_PROJECT_API_SAGA, getAllProjectsApi);
}

function* editProjectApi(action) {
	try {
		const res = yield call(() => JiraAPI.editProject(action.payload));
		yield put(dispatchActionChangeDrawerState(CLOSE_DRAWER));
		if (res.status === STATUS_API.SUCCESS) {
			yield put({ type: GET_PROJECT_API_SAGA });
			Notification('success', 'Edit Project successfully');
		}
	} catch (error) {
		console.log(error);
		Notification('error', 'Edit Project Fail');
	}
}
export function* watchActionEditProjectSaga() {
	yield takeLatest(EDIT_PROJECT_SAGA, editProjectApi);
}

function* deleteProject(action) {
	try {
		const { status } = yield call(() => JiraAPI.deleteProject(action.payload));
		if (status === STATUS_API.SUCCESS) {
			yield put({ type: GET_PROJECT_API_SAGA });
			Notification('success', 'delete Project successfully');
		}
	} catch (error) {
		console.log(error);
		Notification('error', 'delete Project fail');
	}
}
export function* watchActionDeleteProjectSaga() {
	yield takeLatest(DELETE_PROJECT_API_SAGA, deleteProject);
}

function* searchUserApi(action) {
	try {
		const { status, data } = yield call(() => JiraAPI.searchUser(action.payload));
		if (status === STATUS_API.SUCCESS) {
			yield put(dispatchUsersProjectReducer(data.content));
		}
	} catch (error) {
		console.log(error);
	}
}

export function* watchActionSearchUserApi() {
	yield takeLatest(SEARCH_USER_API_SAGA, searchUserApi);
}

function* addUserProject(action) {
	try {
		const { status } = yield call(() => JiraAPI.addUserProject(action.payload));
		if (status === STATUS_API.SUCCESS) {
			yield put({ type: GET_PROJECT_API_SAGA });
			Notification('success', 'add member successfully');
		}
	} catch (error) {
		console.log(error);
		Notification('error', 'add member fail');
	}
}

export function* watchActionAddUserProject() {
	yield takeLatest(ADD_USER_API_SAGA, addUserProject);
}
function* removeUserProject(action) {
	try {
		const { status } = yield call(() => JiraAPI.removeUserFromProject(action.payload));
		if (status === STATUS_API.SUCCESS) {
			yield put({ type: GET_PROJECT_API_SAGA });
			Notification('success', 'Remove member successfully !!!');
		}
	} catch (error) {
		console.log(error);
		Notification('error', 'Remove member fail !!!');
	}
}
export function* watchActionRemoveUserProject() {
	yield takeLatest(REMOVE_USER_PROJECT_SAGA, removeUserProject);
}

function* getProjectDetails(action) {
	try {
		const { data, status } = yield call(() => JiraAPI.getProjectDetails(action.payload));
		if (status === STATUS_API.SUCCESS) {
			yield put(dispatchGetProjectDetailsReducer(data.content));
		}
	} catch (err) {
		console.log(err);
	}
}
export function* watchActionGetProjectDetails() {
	yield takeLatest(GET_PROJECT_DETAILS_SAGA, getProjectDetails);
}

function* getPriorities() {
	try {
		const { data, status } = yield call(() => JiraAPI.getPriorities());
		if (status === STATUS_API.SUCCESS) {
			yield put(dispatchActionGetPrioritiesReducer(data.content));
		}
	} catch (error) {
		console.log(error);
	}
}

export function* watchActionGetPriorities() {
	yield takeLatest(GET_PRIORITIES_API_SAGA, getPriorities);
}

function* getTaskType() {
	try {
		const { data, status } = yield call(() => JiraAPI.getTaskType());
		if (status === STATUS_API.SUCCESS) {
			yield put(dispatchActionGetTaskTypeReducer(data.content));
		}
	} catch (error) {
		console.log(error);
	}
}

export function* watchActionGetTaskType() {
	yield takeLatest(GET_TASK_TYPE_API_SAGA, getTaskType);
}

function* getUser() {
	try {
		const { data, status } = yield call(() => JiraAPI.getUser());
		if (status === STATUS_API.SUCCESS) {
			yield put(dispatchActionGetUserReducer(data.content));
		}
	} catch (error) {
		console.log(error);
	}
}

export function* watchActionGetUser() {
	yield takeLatest(GET_USER_SAGA, getUser);
}

function* getStatus() {
	try {
		const { data, status } = yield call(() => JiraAPI.getStatus());
		if (status === STATUS_API.SUCCESS) {
			yield put(dispatchActionGetStatusReducer(data.content));
		}
	} catch (error) {
		console.log(error);
	}
}

export function* watchActionGetStatus() {
	yield takeLatest(GET_STATUS_SAGA, getStatus);
}

function* createTask({ payload }) {
	try {
		const { status } = yield call(() => JiraAPI.createTask(payload.values));
		if (status === STATUS_API.SUCCESS) {
			yield put(dispatchGetProjectDetailsSaga(payload.values.projectId));
			Notification('success', ` Create Task in ProjectId ${payload.values.projectId} successfully !!!`);
			payload.handleReset();
		}
	} catch (error) {
		console.log(error);
		Notification('error', 'Create Task fail !!!');
	}
}

export function* watchActionCreateTask() {
	yield takeLatest(CREATE_TASK_SAGA, createTask);
}

function* getTaskDetail(action) {
	try {
		const { data, status } = yield call(() => JiraAPI.getTaskDetail(action.payload));
		if (status === STATUS_API.SUCCESS) {
			yield put(dispatchGetTaskDetailsReducer(data.content));
			const { showModal } = yield select(ChangeModalVisibleSelector);
			showModal();
		}
	} catch (error) {
		console.log(error);
	}
}

export function* watchActionGetTaskDetail() {
	yield takeLatest(GET_TASK_DETAIlS_SAGA, getTaskDetail);
}

function* changeStatusTaskDetail(action) {
	try {
		const { status } = yield call(() => JiraAPI.changeStatusTaskDetail(action.payload.updateStatus));
		if (status === STATUS_API.SUCCESS) {
			yield put(dispatchActionGetTaskDetailsSaga(action.payload.updateStatus.taskId));
			yield put(dispatchGetProjectDetailsSaga(action.payload.projectId));
		}
	} catch (error) {
		console.log(error);
	}
}

export function* watchActionChangeStatusTaskDetail() {
	yield takeLatest(CHANGE_STATUS_TASK_DETAIL_SAGA, changeStatusTaskDetail);
}

function* assignUserTask(action) {
	try {
		const res = yield call(() => JiraAPI.assignUserTask(action.payload.userAssign));
		if (res.status === STATUS_API.SUCCESS) {
			yield put(dispatchActionGetTaskDetailsSaga(action.payload.userAssign.taskId));
			yield put(dispatchGetProjectDetailsSaga(action.payload.projectId));
		}
	} catch (error) {
		console.log(error);
	}
}

export function* watchActionAssignUserTask() {
	yield takeEvery(ASSIGN_USER_TASK_SAGA, assignUserTask);
}

function* updateTask(action) {
	try {
		const { data, status } = yield call(() => JiraAPI.updateTask(action.payload));
		if (status === STATUS_API.SUCCESS) {
			yield put(dispatchActionGetTaskDetailsSaga(action.payload.taskId));
			yield put(dispatchGetProjectDetailsSaga(action.payload.projectId));
		}
	} catch (error) {
		console.log(error);
	}
}

export function* watchActionUpdateTask() {
	yield takeLatest(UPDATE_TASK_SAGA, updateTask);
}

function* getAllComments(action) {
	try {
		const { data, status } = yield call(() => JiraAPI.getAllComments(action.payload));
		if (status === STATUS_API.SUCCESS) {
			yield put(dispatchActionGetAllCommentReducer(data.content));
		}
	} catch (error) {
		console.log(error);
	}
}

export function* watchActionGetAllComments() {
	yield takeLatest(GET_ALL_COMMENT_SAGA, getAllComments);
}

function* signUp(action) {
	try {
		const { data, status } = yield call(() => JiraAPI.signUp(action.payload.values));
		if (status === STATUS_API.SUCCESS) {
			Notification('success', data.message);
			action.payload.handleReset();
			history.push('/');
		}
	} catch (error) {
		console.log(error);
	}
}

export function* watchActionSignUp() {
	yield takeLatest(SIGN_UP_SAGA, signUp);
}

function* editUser(action) {
	try {
		const { data, status } = yield call(() => JiraAPI.editUser(action.payload));
		if (status === STATUS_API.SUCCESS) {
			Notification('success', data.message);
			yield put(dispatchActionGetUserSaga());
			const closeModal = yield select(CloseModalEditUserVisibleSelector);
			closeModal();
		}
	} catch (error) {
		console.log(error);
		Notification('error', 'Failed !!!');
	}
}

export function* watchActionEditUser() {
	yield takeLatest(EDIT_USER_SAGA, editUser);
}

function* deleteUser(action) {
	try {
		const { data, status } = yield call(() => JiraAPI.deleteUser(Number(action.payload)));
		if (status === STATUS_API.SUCCESS) {
			Notification('success', 'Xóa user thành công !!');
			yield put(dispatchActionGetUserSaga());
		}
	} catch (error) {
		Notification('error', 'Xóa user thất bại !!');
		console.log(error);
	}
}

export function* watchActionDeleteUser() {
	yield takeLatest(DELETE_USER_SAGA, deleteUser);
}
