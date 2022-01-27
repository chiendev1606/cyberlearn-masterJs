import { all } from 'redux-saga/effects';
import {
	watchActionCreateProject,
	watchActionGetProjectAPI,
	watchActionSignInJira,
	watchActionGetAllProjects,
	watchActionEditProjectSaga,
	watchActionDeleteProjectSaga,
	watchActionSearchUserApi,
	watchActionAddUserProject,
} from './jiraSaga/JiraSaga';

export default function* rootSaga() {
	yield all([
		watchActionSignInJira(),
		watchActionGetProjectAPI(),
		watchActionCreateProject(),
		watchActionGetAllProjects(),
		watchActionEditProjectSaga(),
		watchActionDeleteProjectSaga(),
		watchActionSearchUserApi(),
		watchActionAddUserProject(),
	]);
}
