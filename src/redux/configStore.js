import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/rootSaga';
import todoListReducer from './reducer/todoListReducer';

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({ todoListReducer });
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
