import { axiosInstance } from "./instance";
import axios from "axios";
import { decrypt } from "../helpers/authHelper";
import { BACKEND_URL } from "./backendURL";

//peticiones que se envia un body con informacion
export const reqWithData = async (url, data) => {
  try {
    const res = await axiosInstance.post(url, data).catch(function (error) {
      if (error.response) {
        return error.response;
      }
    });
    if (res && res?.status === 200) {
      return { data: res.data, status: res.status };
    }
    return { data: null, error: "Error Data" };
  } catch (error) {
    return Promise.resolve({ data: null, error: error });
  }
};

//peticiones que se envia un body con headers para cargar archivos en fb desde el back
export const upFileData = async (url, data) => {
  const user = decrypt(sessionStorage.getItem("userFeel"));
  //let baseURL = "https://feelsdev.teleperformance.co/api/";
  //let baseURL = "https://tpfeeltest.teleperformance.co/api/";
  let baseURL = `${BACKEND_URL}/api/`;
  //let baseURL = "https://feel.teleperformance.co/api/";

  try {
    const res = await axios({
      method: "post",
      url: baseURL + url,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: "Bearer " + user.token,
      },
    });

    if (res && res?.status === 200) {
      return { data: decrypt(res.data), status: res.status };
    }
    return { data: null, error: "Error Data" };
  } catch (error) {
    return Promise.resolve({ data: null, error: error });
  }

  // .then((resp) => {

  //   return { data: resp.data, status: resp.status };
  // })
  // .catch((err) => {});
};

//peticiones de solo consulta sin envio de informacion adicional
export const reqWithoutData = async (url) => {
  try {
    const res = await axiosInstance.post(url).catch(function (error) {
      if (error.response) {
        return error.response;
      }
    });
    if (res && res?.status === 200) {
      return { data: res.data, status: res.status };
    }
    return { data: null, error: "Error Data" };
  } catch (error) {
    return Promise.resolve({ data: null, error: error });
  }
};
