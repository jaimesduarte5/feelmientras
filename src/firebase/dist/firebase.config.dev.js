"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storage = void 0;

var _app = require("firebase/app");

var _storage = require("firebase/storage");

// Import the functions you need from the SDKs you need
var firebaseConfig = {}; // Initialize Firebase

var app = (0, _app.initializeApp)(firebaseConfig);
var bucket = "";
var storage = (0, _storage.getStorage)(app, bucket);
exports.storage = storage;