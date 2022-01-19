import { all } from 'redux-saga/effects';
import {
	watchActionAddTask,
	watchActionCompleteTask,
	watchActionGetAllTask,
	watchActionRejectTask,
} from './todoListSaga/todoListSaga';

export default function* rootSaga() {
	yield all([
		watchActionGetAllTask(),
		watchActionAddTask(),
		watchActionCompleteTask(),
		watchActionRejectTask(),
	]);
}
