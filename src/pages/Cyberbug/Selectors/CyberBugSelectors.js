import { createSelector } from 'reselect';

export const projectCategorySelector = state => state.projectReducer.projectCategory;
export const projectManagementSelector = state => state.projectManagementReducer.projects;
export const usersProjectSelector = state => state.projectManagementReducer.usersProject;
export const drawerCyberbugSelectors = state => state.drawerCyberbugReducer.isVisible;
export const projectEditSelector = state => state.projectManagementReducer.projectEdit;
export const projectDetailsSelector = state => state.projectDetailsReducer.projectDetails;
export const prioritiesSelector = state => state.priorityReducer.priorities;
export const taskTypeSelector = state => state.taskTypeReducer.taskTypes;
export const getUserSelector = state => state.usersProjectReducer.usersProject;
export const getStatusSelector = state => state.statusReducer.status;
export const ChangeModalVisibleSelector = state => state.modalProjectDetailReducer;
export const taskDetailSelector = state => state.taskDetailsReducer.taskDetails;
export const reporterSelector = state => state.taskDetailsReducer.reporter;
export const userSelector = state => state.jiraReducer.user;
export const searchTextSelector = state => state.searchTextReducer.searchText;
export const ChangeModalEditUserVisibleSelector = state => state.modalEditUserReducer.showModal;
export const CloseModalEditUserVisibleSelector = state => state.modalEditUserReducer.handleCancel;
export const userEditSelector = state => state.modalEditUserReducer.userEdit;

export const getUserByFilterSelector = createSelector(getUserSelector, searchTextSelector, (users, text) => {
	return users.filter(user => user.name.includes(text));
});
