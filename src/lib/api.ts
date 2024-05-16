import axios from "axios";

const api = axios.create({
  baseURL: "https://api.homologation.cliqdrive.com.br/",
});

// interceptor para colocar jwt no axios
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    
  }
    config.headers.Accept = "application/json;version=v1_web";
    config.headers["Content-Type"] = "application/json";

  return config;
});


api.interceptors.response.use((response)=> {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, (error) => {
  const location = window.location.pathname;
  if(error.response.status === 401 && location !== "/"){
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});


export default api