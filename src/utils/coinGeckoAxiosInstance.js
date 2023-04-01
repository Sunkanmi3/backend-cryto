import axios from "axios";

// const ROOT_URL = "http://134.209.64.28:8090/";

//  const auth2 = localStorage.getItem("token");
//  console.log(auth2, "auth202");

const ROOT_URL = "https://api.coingecko.com/api/v3/coins/";
const headers = {};

const coinGeckoAxiosInstance = axios.create({
  baseURL: ROOT_URL,
  headers,
});
coinGeckoAxiosInstance.interceptors.request.use(
  async (config) => {
    // const token = localStorage.getItem("jwt");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    // console.log(token, "88");

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default coinGeckoAxiosInstance;
