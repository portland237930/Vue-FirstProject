"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vuex = _interopRequireDefault(require("vuex"));

var _vue = _interopRequireDefault(require("vue"));

var _home = _interopRequireDefault(require("./home"));

var _search = _interopRequireDefault(require("./search"));

var _details = _interopRequireDefault(require("./details"));

var _shopcart = _interopRequireDefault(require("./shopcart"));

var _user = _interopRequireDefault(require("./user"));

var _trade = _interopRequireDefault(require("./trade"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 导入模块仓库
_vue["default"].use(_vuex["default"]); // 创建Vuex.Store实例对象并默认暴露


var _default = new _vuex["default"].Store({
  // 模块化管理
  modules: {
    home: _home["default"],
    search: _search["default"],
    details: _details["default"],
    shopcart: _shopcart["default"],
    user: _user["default"],
    trade: _trade["default"]
  }
});

exports["default"] = _default;