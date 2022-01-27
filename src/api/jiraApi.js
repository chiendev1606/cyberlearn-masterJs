import Axios from 'axios';
import { ACCESS_TOKEN } from '../util/constants/constants';

const URL = 'http://casestudy.cyberlearn.vn';
const headers = { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) };

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
			method: 'get',
			data: data,
			headers,
		}),
};
