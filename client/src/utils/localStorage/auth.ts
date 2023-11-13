const localStorageUtility = {
  setAuthToken: (token: string) => localStorage.setItem("auth_token", token),
  clearAuthToken: () => localStorage.removeItem("auth_token"),
  getAuthToken: () => localStorage.getItem("auth_token"),
};

export default localStorageUtility;
