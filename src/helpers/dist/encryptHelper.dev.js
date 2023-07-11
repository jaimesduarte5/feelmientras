"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decryptURL = exports.encryptURL = void 0;

// Función para cifrar una cadena
var encryptURL = function encryptURL(str) {
  var encrypted = btoa(str);
  return encrypted;
}; // Función para descifrar una cadena


exports.encryptURL = encryptURL;

var decryptURL = function decryptURL(str) {
  var decrypted = atob(str);
  return decrypted;
};

exports.decryptURL = decryptURL;