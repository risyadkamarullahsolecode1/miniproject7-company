import apiClient from "../axiosconfig";

const register = async (userData) => {
  const response = await apiClient.post("/Auth/Add-register", userData);  
  return response.data;
};

const login = async (userData) => {
  const response = await apiClient.post("/Auth/login", userData);
  if (response.data.user) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = async () => { 
   await apiClient.post(`Auth/logout`);  
   localStorage.removeItem('user');  
};

const refreshToken = async () => { 
  const response = await api.post("/Auth/refresh-token");
  return response.data;
};


const AuthService = {
  register,
  login,
  logout,
  refreshToken
};

export default AuthService;
