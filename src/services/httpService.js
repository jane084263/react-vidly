import axios from "axios";
import config from "./config.json";
import logger from "./logService";
// Add a response interceptor;
import { toast } from "react-toastify";
axios.defaults.baseURL = config.endPoint;
axios.defaults.timeout = 10000;

axios.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    logger.log(error);
    console.log("error", error);
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status <= 500;
    if (expectedError) {
      toast.error(error.response.data);
    } else {
      toast.error("unUnexpectedErrorHappened");
    }
    return Promise.reject(error);
  }
);
function setJWT(jwt) {
  axios.defaults.headers["x-auth-token"] = jwt;
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put,
  axios,
  setJWT,
};
