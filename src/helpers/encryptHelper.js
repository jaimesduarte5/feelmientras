// Función para cifrar una cadena

export const encryptURL = (str) => {
  const encrypted = btoa(str);

  return encrypted;
};

// Función para descifrar una cadena
export const decryptURL = (str) => {
  const decrypted = atob(str);
  return decrypted;
};
