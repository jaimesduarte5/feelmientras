import axios from "axios";
import CryptoJS from "crypto-js";
import { decrypt, encrypt } from "../helpers/authHelper";
import { BACKEND_URL } from "./backendURL";

const axiosInstance = axios.create({
  baseURL: `${BACKEND_URL}/api/`,

  transformRequest: [
    function (data, headers) {
      // ("lo que se envia", data);
      let encrypted = encrypt(JSON.stringify(data));
      data = { data: encrypted };
      let hash = CryptoJS.SHA512(encrypted).toString();
      headers.refreshAuthorization =
        headers.refreshAuthorization + "&#&" + hash;
      return JSON.stringify(data);
    },
    ...axios.defaults.transformRequest,
  ],
  transformResponse: [
    function (data) {
      let decryptedData = decrypt(data.replace(/['"]+/g, ""));
      data = decryptedData;
      //("lo que llega.....", decryptedData);
      return data;
    },
    ...axios.defaults.transformResponse,
  ],
});

axiosInstance.interceptors.request.use((config) => {
  const user = decrypt(sessionStorage.getItem("userFeel"));

  config.headers["Content-Type"] = "application/json; charset=ISO-8859-1";
  config.headers.responseEncoding = "utf8";
  config.headers.authorization = "Bearer " + user.token;
  config.headers.refreshAuthorization = "Bearer " + user.refreshToken;
  config.headers["Access-Control-Allow-Origin"] = "*";
  config.data = { ...config.data, requestedBy: user.email };

  return config;
});

export { axiosInstance };
