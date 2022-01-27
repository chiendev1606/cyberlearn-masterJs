import { useEffect } from 'react';
import { Route, useHistory } from 'react-router';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from './components/global/Header/Header';
import home from './components/home/home';
import UserLogin from './pages/JiraClone/Login/UserLogin';
import { dispatchHistoryReducer } from './pages/JiraClone/actions';
import { loadingSelector } from './pages/JiraClone/selectors/selectors';
import Loading from './components/global/Loading/Loading';
import CyberBugTemplate from './Template/CyberBugTemplate';
import Cyberbug from './pages/Cyberbug/Cyberbug';
import CyberProject from './pages/Cyberbug/Components/CyberProject';
import ProjectManagement from './pages/Cyberbug/Components/ProjectManagement';

function App() {
	const history = useHistory();
	const dispatch = useDispatch();
	const isLoading = useSelector(loadingSelector);

	useEffect(() => {
		dispatch(dispatchHistoryReducer(history));
	}, [dispatch, history]);

	return (
		<>
			{isLoading && <Loading />}
			<Header />
			<Route exact path="/" component={UserLogin} />
			<CyberBugTemplate path="/cyberbug" Component={Cyberbug} />
			<CyberBugTemplate path="/projectSettings" Component={CyberProject} />
			<CyberBugTemplate path="/projectManagement" Component={ProjectManagement} />
			<Route exact path="/home" component={home} />
		</>
	);
}

export default App;
