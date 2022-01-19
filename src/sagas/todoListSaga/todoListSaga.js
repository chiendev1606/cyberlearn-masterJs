import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { STATUS, todoListAPI } from '../../api/api';
import {
	ADD_TODO_API,
	CATCH_ERROR,
	CHANGE_LOADING,
	COMPLETE_TODO_API,
	GET_TODO,
	GET_TODO_API,
	REJECT_TODO_API,
} from './constants';

function* getALLTask() {
	try {
		const { data, status } = yield call(() => todoListAPI.getAllTask());
		yield put({
			type: CHANGE_LOADING,
		});
		yield delay(1000);
		if (status === STATUS.SUCCESS) {
			yield put({
				type: GET_TODO,
				data: data,
			});
			yield put({
				type: CHANGE_LOADING,
			});
		}
	} catch (error) {
		console.log(error);
	}
}

export function* watchActionGetAllTask() {
	yield takeLatest(GET_TODO_API, getALLTask);
}

function* addTask(action) {
	try {
		const { status } = yield call(() => todoListAPI.addTask(action.taskName));
		if (status === STATUS.SUCCESS) {
			yield put({
				type: GET_TODO_API,
			});
		}
	} catch (error) {
		console.log(error);
		yield put({
			type: CATCH_ERROR,
			error: 'TaskName is already exist !!!',
		});
	}
}
export function* watchActionAddTask() {
	yield takeLatest(ADD_TODO_API, addTask);
}

function* completeTask(action) {
	try {
		const { status } = yield call(() => todoListAPI.doneTask(action.taskName));
		if (status === STATUS.SUCCESS) {
			yield put({
				type: GET_TODO_API,
			});
		}
	} catch (error) {
		console.log(error);
	}
}

export function* watchActionCompleteTask() {
	yield takeLatest(COMPLETE_TODO_API, completeTask);
}

function* rejectTask(action) {
	try {
		const { status } = yield call(() => todoListAPI.rejectTask(action.taskName));
		if (status === STATUS.SUCCESS) {
			yield put({
				type: GET_TODO_API,
			});
		}
	} catch (error) {
		console.log(error);
	}
}
export function* watchActionRejectTask() {
	yield takeLatest(REJECT_TODO_API, rejectTask);
}
