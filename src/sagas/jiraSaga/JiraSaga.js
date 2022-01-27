import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { JiraAPI } from '../../api/jiraApi';
import {
	dispatchActionChangeDrawerState,
	dispatchActionGetProjectsReducer,
	dispatchCategoryProjectReducer,
	dispatchUsersProjectReducer,
} from '../../pages/Cyberbug/actions/actions';
import {
	dispatchChangeLoadingReducer,
	dispatchErrorSignIn,
	dispatchSignInReducer,
} from '../../pages/JiraClone/actions';
import {
	ACCESS_TOKEN,
	ADD_USER_API_SAGA,
	CLOSE_DRAWER,
	CREATE_PROJECT_AUTHORIZATION_SAGA,
	DELETE_PROJECT_API_SAGA,
	EDIT_PROJECT_SAGA,
	GET_CATEGORY_PROJECT_API_SAGA,
	GET_PROJECT_API_SAGA,
	SEARCH_USER_API_SAGA,
	SIGN_IN_SAGA,
	STATUS_API,
	USER,
} from '../../util/constants/constants';
import history from '../../util/history';
import { Notification } from '../../util/notifications';

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
			history.push('/cyberbug');

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
