import axios from "axios";
import {
  KEY_ACCESS_TOKEN,
  getItem,
  removeItem,
  setItem,
} from "../utils/localStorageClient";

export const axiosClient = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_BASE_URL}`,
  withCredentials: true,
});

axiosClient.interceptors.request.use((request) => {
  const accessToken = getItem(KEY_ACCESS_TOKEN);
  request.headers["Authorization"] = `Bearer ${accessToken}`;
  return request;
});

axiosClient.interceptors.response.use(async (response) => {
  console.log(response);
  const data = response.data;
  if (data.status == "ok") {
    return data;
  }
  const originalRequest = response.config;
  const statusCode = data.statusCode;
  const message = data.message;
  console.log(statusCode);

  if (statusCode == 401) {
    const response = await axios
      .create({ withCredentials: true })
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`);
    if (response.data.status == "ok") {
      setItem(KEY_ACCESS_TOKEN, response.data.result.accessToken);
      originalRequest.headers[
        "Authorization"
      ] = `Bearer ${response.data.result.accessToken}`;
      return (await axios(originalRequest)).data;
    } else {
      removeItem(KEY_ACCESS_TOKEN);
      window.location.replace("/admin/adminLogin", "_self");
      return Promise.reject(message);
    }
  }

  return Promise.reject(message);
});
