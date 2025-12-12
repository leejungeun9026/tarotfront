import axios from "axios";

// axios 인스턴스 api + 인터셉터
export const api = axios.create({
  baseURL: "http://localhost:8085/api/v1",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);