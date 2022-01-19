import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/global/Loading/Loading';
import {
	ADD_TODO_API,
	COMPLETE_TODO_API,
	GET_TODO_API,
	REJECT_TODO_API,
} from '../../sagas/todoListSaga/constants';
import './TodoList.css';
import { todoListSelector, isLoadingSelector, errorSelector } from './TodoListSelectors';

const TodoList = () => {
	const [inputText, setInputText] = useState('');
	const [valid, setValid] = useState(false);
	const [error, setError] = useState('');
	const isLoading = useSelector(isLoadingSelector);
	const todoList = useSelector(todoListSelector);
	const errorSystem = useSelector(errorSelector);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: GET_TODO_API });
	}, [dispatch]);

	useEffect(() => {
		inputText.trim() === '' ? setValid(false) : setValid(true);
	}, [inputText]);

	const handleInputChange = e => {
		setInputText(e.target.value);
		if (inputText.trim() === '') {
			setError('TaskName can not be blank');
			return;
		}
		setError('');
	};

	const handleAddTodo = () => {
		dispatch({ type: ADD_TODO_API, taskName: inputText });
		setInputText('');
	};

	const handleCompleteTask = TaskName => {
		dispatch({ type: COMPLETE_TODO_API, taskName: TaskName });
	};

	const handleRejectTask = TaskName => {
		dispatch({ type: REJECT_TODO_API, taskName: TaskName });
	};

	return (
		<>
			{isLoading && <Loading />}
			<div className="card">
				<div className="card__header">
					<img src={require('../../assets/bg.png')} alt="bg" />
				</div>
				{/* <h2>hello!</h2> */}
				<div className="card__body">
					<div className="card__content">
						<div className="card__title">
							<h2>My Tasks</h2>
							<p>September 9,2020</p>
						</div>
						<div className="card__add">
							<input
								id="newTask"
								type="text"
								value={inputText}
								onChange={handleInputChange}
								placeholder="Enter an activity..."
							/>
							<button id="addItem" disabled={!valid} onClick={handleAddTodo}>
								<i className="fa fa-plus" />
							</button>
						</div>
						<p className="text-danger">{`${error}${errorSystem}`}</p>
						<div className="card__todo">
							{/* Uncompleted tasks */}
							<ul className="todo" id="todo">
								{todoList
									.filter(({ status }) => !status)
									.map(({ taskName }, idx) => (
										<li key={idx}>
											<span>{taskName}</span>
											<div className="buttons">
												<button className="remove">
													<i className="fa fa-trash-alt" />
												</button>
												<button
													className="complete"
													onClick={() => {
														handleCompleteTask(taskName);
													}}>
													<i className="far fa-check-circle" />
													<i className="fas fa-check-circle" />
												</button>
											</div>
										</li>
									))}
							</ul>
							{/* Completed tasks */}
							<ul className="todo" id="completed">
								{todoList
									.filter(({ status }) => status)
									.map(({ taskName }, idx) => (
										<li key={idx}>
											<span>{taskName}</span>
											<div className="buttons">
												<button className="remove">
													<i className="fa fa-trash-alt" />
												</button>
												<button className="complete" onClick={() => handleRejectTask(taskName)}>
													<i className="far fa-check-circle" />
													<i className="fas fa-check-circle" />
												</button>
											</div>
										</li>
									))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default TodoList;
