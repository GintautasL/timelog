import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    const token = window.localStorage.getItem("token");
    if (token && config.withCredentials) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
