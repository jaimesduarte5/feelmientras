import CryptoJS from "crypto-js";

const k = "cc7dd73944260f26e36ce6c592806c2b6df7bec93a3a5984739d35250c533321";

export const decrypt = (data) => {
  const decrypted = JSON.parse(
    CryptoJS.AES.decrypt(data, k).toString(CryptoJS.enc.Utf8)
  );
  return decrypted;
};

export const encrypt = (data) => {
  const encrypted = CryptoJS.AES.encrypt(data, k).toString();
  return encrypted;
};

export default function usrInf() {
  try {
    const user = JSON.parse(
      CryptoJS.AES.decrypt(sessionStorage.getItem("userFeel"), k).toString(
        CryptoJS.enc.Utf8
      )
    );
    return user;
  } catch (error) {
    return "unauthorized";
  }
}
