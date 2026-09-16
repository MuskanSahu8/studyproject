import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://studyproject-8lvj.onrender.com/api",
  withCredentials: true,
});

export default apiClient;