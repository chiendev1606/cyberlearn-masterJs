import { useEffect } from 'react';
import { Route, useHistory } from 'react-router';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from './components/global/Header/Header';
import home from './components/home/home';
import UserLogin from './pages/LoginCyberbug/Login/UserLogin';
import { dispatchHistoryReducer } from './pages/LoginCyberbug/actions';
import { loadingSelector } from './pages/LoginCyberbug/selectors/selectors';
import Loading from './components/global/Loading/Loading';
import CyberBugTemplate from './Template/CyberBugTemplate';
import Cyberbug from './pages/Cyberbug/Cyberbug';
import CyberProject from './pages/Cyberbug/Components/CyberProject';
import ProjectManagement from './pages/Cyberbug/Components/ProjectManagement';
import {
	dispatchActionGetStatusSaga,
	dispatchActionGetUserSaga,
	dispatchGetPrioritiesSaga,
	dispatchGetTaskTypeSaga,
} from './sagas/jiraSaga/actions';
import SignUpCyberbug from './pages/SignUpCyberbug/SignUpCyberbug';
import UserManagement from './pages/Cyberbug/Components/UserManagement';

function App() {
	const history = useHistory();
	const dispatch = useDispatch();
	const isLoading = useSelector(loadingSelector);

	useEffect(() => {
		dispatch(dispatchHistoryReducer(history));
		dispatch(dispatchGetPrioritiesSaga());
		dispatch(dispatchGetTaskTypeSaga());
		dispatch(dispatchActionGetUserSaga());
		dispatch(dispatchActionGetStatusSaga());
	}, [dispatch, history]);

	return (
		<>
			{isLoading && <Loading />}

			<Route exact path="/" component={UserLogin} />
			<Route exact path="/signup" component={SignUpCyberbug} />
			<CyberBugTemplate exact path="/cyberbug/:id" Component={Cyberbug} />
			<CyberBugTemplate path="/projectSettings" Component={CyberProject} />
			<CyberBugTemplate path="/projectManagement" Component={ProjectManagement} />
			<CyberBugTemplate path="/userManagement" Component={UserManagement} />
			<Route exact path="/home" component={home} />
		</>
	);
}

export default App;
