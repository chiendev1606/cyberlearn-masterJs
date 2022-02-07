import Axios from 'axios';
import { ACCESS_TOKEN } from '../util/constants/constants';

const URL = 'http://casestudy.cyberlearn.vn';
const headers = { Authorization: 'bearer ' + localStorage.getItem(ACCESS_TOKEN) };

export const JiraAPI = {
	singIn: user =>
		Axios({
			url: `${URL}/api/Users/signin`,
			method: 'post',
			data: {
				email: user.email,
				passWord: user.password,
			},
		}),
	getProjectCategory: () => Axios({ url: `${URL}/api/ProjectCategory`, method: 'get' }),
	createProject: data =>
		Axios({
			url: `${URL}/api/Project/createProjectAuthorize`,
			method: 'post',
			data: data,
			headers,
		}),
	getProjects: () =>
		Axios({
			url: `${URL}/api/Project/getAllProject`,
			method: 'get',
			headers,
		}),
	editProject: updateProject =>
		Axios({
			url: `${URL}/api/Project/updateProject?projectId=${updateProject.id}`,
			method: 'put',
			data: updateProject,
			headers,
		}),
	deleteProject: id =>
		Axios({
			url: `${URL}/api/Project/deleteProject?projectId=${id}`,
			method: 'delete',
			headers,
		}),
	searchUser: text =>
		Axios({
			url: `${URL}/api/Users/getUser?keyword=${text}`,
			method: 'get',
			headers,
		}),
	addUserProject: data =>
		Axios({
			url: `${URL}/api/Project/assignUserProject`,
			method: 'post',
			data: data,
			headers,
		}),
	removeUserFromProject: data =>
		Axios({ url: `${URL}/api/Project/removeUserFromProject`, method: 'post', data: data, headers }),
	getProjectDetails: id =>
		Axios({
			url: `${URL}/api/Project/getProjectDetail?id=${id}`,
			method: 'get',
			headers,
		}),
	getPriorities: () =>
		Axios({
			url: `${URL}/api/Priority/getAll`,
			method: 'get',
		}),
	getTaskType: () => Axios({ url: `${URL}/api/TaskType/getAll`, method: 'get' }),
	getUser: (data = '') => Axios({ url: `${URL}/api/Users/getUser`, method: 'get', data, headers }),
	getStatus: () => Axios({ url: `${URL}/api/Status/getAll`, method: 'get' }),
	createTask: data => Axios({ url: `${URL}/api/Project/createTask`, method: 'post', data: data, headers }),
	getTaskDetail: data =>
		Axios({ url: `${URL}/api/Project/getTaskDetail?taskId=${data}`, method: 'get', headers }),
	changeStatusTaskDetail: data =>
		Axios({ url: `${URL}/api/Project/updateStatus`, method: 'put', data, headers }),
	assignUserTask: data => Axios({ url: `${URL}/api/Project/assignUserTask`, method: 'post', data, headers }),
	updateTask: data => Axios({ url: `${URL}/api/Project/updateTask`, method: 'post', data, headers }),
	getAllComments: id => Axios({ url: `${URL}/api/Comment/getAll?taskId=${id}`, method: 'get' }),
	signUp: data => Axios({ url: `${URL}/api/Users/signup`, method: 'post', data }),
	editUser: data => Axios({ url: `${URL}/api/Users/editUser`, method: 'put', data }),
	deleteUser: data => Axios({ url: `${URL}/api/Users/deleteUser?id=${data}`, method: 'delete', headers }),
	insertComment: data => Axios({ url: `${URL}/api/Comment/insertComment`, method: 'post', data, headers }),
	updateComment: data =>
		Axios({
			url: `${URL}/api/Comment/updateComment?id=${data.id}&contentComment=${data.contentComment}`,
			method: 'put',
			headers,
		}),
};
