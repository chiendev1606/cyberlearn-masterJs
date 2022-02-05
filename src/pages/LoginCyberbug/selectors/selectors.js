export const historySelector = state => state.historyReducer.history;
export const errorSelector = state => state.jiraReducer.errors;
export const loadingSelector = state => state.loadingReducer.isLoading;
