import axios from "axios";

const axiosCommon = async () => {
  axios.interceptors.response.use(
    (response) => {
      if ([401, 403].indexOf(response.data.status) !== -1) {
        throw new Error("Unauthorized");
      }
      return response;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
};

export default axiosCommon;
