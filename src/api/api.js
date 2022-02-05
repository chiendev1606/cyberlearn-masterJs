import axios, { Axios } from 'axios';

const URL = 'http://svcy.myclass.vn/api/';
export const STATUS = {
	SUCCESS: 200,
};

export const todoListAPI = {
	getAllTask: () =>
		axios({
			url: `${URL}ToDoList/GetAllTask`,
			method: 'get',
		}),
	addTask: taskName =>
		axios({
			url: `${URL}ToDoList/AddTask`,
			method: 'post',
			data: {
				taskName: taskName,
			},
		}),
	deleteTask: taskName =>
		axios({
			url: `${URL}ToDoList/deleteTask?taskName=${taskName}`,
			method: 'delete',
		}),
	doneTask: taskName =>
		axios({
			url: `${URL}ToDoList/doneTask?taskName=${taskName}`,
			method: 'put',
		}),
	rejectTask: taskName =>
		axios({
			url: `${URL}ToDoList/rejectTask?taskName=${taskName}`,
			method: 'put',
		}),
};
