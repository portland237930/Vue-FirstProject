"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeToken = exports.getToken = exports.setToken = void 0;

// 设置令牌
var setToken = function setToken(token) {
  localStorage.setItem("TOKEN", token);
}; // 获得令牌


exports.setToken = setToken;

var getToken = function getToken() {
  return localStorage.getItem("TOKEN");
}; // 移除令牌


exports.getToken = getToken;

var removeToken = function removeToken() {
  localStorage.removeItem("TOKEN");
};

exports.removeToken = removeToken;