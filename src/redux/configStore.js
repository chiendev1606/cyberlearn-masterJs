import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/rootSaga';
import todoListReducer from './reducer/todoListReducer';
import jiraReducer from './reducer/jiraReducer';
import historyReducer from './reducer/historyReducer';
import loadingReducer from './reducer/loadingReducer';
import projectReducer from './reducer/projectReducer';
import projectManagementReducer from './reducer/projectManagementReducer';
import drawerCyberbugReducer from './reducer/drawerCyberbugReducer';
import projectDetailsReducer from './reducer/projectDetailsReducer';
import priorityReducer from './reducer/priorityReducer';
import taskTypeReducer from './reducer/taskTypeReducer';
import usersProjectReducer from './reducer/usersProjectReducer';
import statusReducer from './reducer/statusReducer';
import taskDetailsReducer from './reducer/taskDetailsReducer';
import modalProjectDetailReducer from './reducer/modalProjectDetailReducer';
import searchTextReducer from './reducer/searchTextReducer';
import modalEditUserReducer from './reducer/modalEditUserReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
	todoListReducer,
	jiraReducer,
	historyReducer,
	loadingReducer,
	projectReducer,
	projectManagementReducer,
	drawerCyberbugReducer,
	projectDetailsReducer,
	priorityReducer,
	taskTypeReducer,
	usersProjectReducer,
	statusReducer,
	taskDetailsReducer,
	modalProjectDetailReducer,
	searchTextReducer,
	modalEditUserReducer,
});
const enhancer = composeEnhancers(
	applyMiddleware(sagaMiddleware /*other middleware*/)
	/* other store enhancers if any */
);
const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
