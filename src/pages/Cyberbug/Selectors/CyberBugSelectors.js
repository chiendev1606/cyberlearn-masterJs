export const projectCategorySelector = state => state.projectReducer.projectCategory;
export const projectManagementSelector = state => state.projectManagementReducer.projects;
export const usersProjectSelector = state => state.projectManagementReducer.usersProject;
export const drawerCyberbugSelectors = state => state.drawerCyberbugReducer.isVisible;
export const projectEditSelector = state => state.projectManagementReducer.projectEdit;
