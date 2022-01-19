import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Header } from './components/global/Header/Header';
import home from './components/home/home';
import TodoList from './pages/TodoList/TodoList';

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Route exact path="/" component={home} />
			<Route exact path="/home" component={home} />
			<Route exact path="/hoc" component={home} />
			<Route exact path="/todoList" component={TodoList} />
		</BrowserRouter>
	);
}

export default App;
