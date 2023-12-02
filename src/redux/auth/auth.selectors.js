export const selectUserData = state => state.auth.userData;
export const selectAuthenticated = state => state.auth.authenticated;
export const selectIsLoading = state => state.auth.isLoading;
export const selectError = state => state.auth.error;