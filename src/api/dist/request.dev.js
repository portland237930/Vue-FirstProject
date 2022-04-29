"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _nprogress = _interopRequireDefault(require("nprogress"));

require("nprogress/nprogress.css");

var _store = _interopRequireDefault(require("@/store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// api接口发送请求
// 获得滑动条
// 获得仓库
//1、对axios二次封装
var requests = _axios["default"].create({
  //基础路径，requests发出的请求在端口号后面会跟改baseURl
  baseURL: '/api',
  timeout: 5000
}); //2、配置请求拦截器


requests.interceptors.request.use(function (config) {
  // 如果store中存在游客身份就将他存储于响应头中
  if (_store["default"].state.details.uuid_token) {
    config.headers.userTempId = _store["default"].state.details.uuid_token;
  } // 如果store中存在token就存入响应头中


  if (_store["default"].state.user.token) {
    config.headers.token = _store["default"].state.user.token;
  } // 添加进度条


  _nprogress["default"].start(); //config内主要是对请求头Header配置
  //比如添加token


  return config;
}); //3、配置相应拦截器

requests.interceptors.response.use(function (res) {
  // 结束进度条
  _nprogress["default"].done(); //成功的回调函数


  return res.data;
}, function (error) {
  //失败的回调函数
  console.log("响应失败" + error);
  return Promise.reject(new Error('fail'));
}); //4、对外暴露

var _default = requests;
exports["default"] = _default;