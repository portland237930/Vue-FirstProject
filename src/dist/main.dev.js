"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _router = _interopRequireDefault(require("@/router"));

var _TypeNav = _interopRequireDefault(require("@/components/TypeNav/TypeNav"));

var _Carousle = _interopRequireDefault(require("@/components/Carousle/Carousle"));

var _Pagination = _interopRequireDefault(require("@/components/Pagination"));

var _elementUi = require("element-ui");

var _store = _interopRequireDefault(require("@/store"));

var API = _interopRequireWildcard(require("@/api"));

require("@/mock/mockServe");

require("swiper/css/swiper.css");

var _vueLazyload = _interopRequireDefault(require("vue-lazyload"));

var _ = _interopRequireDefault(require("@/assets/1.gif"));

require("@/plugins/validate");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].config.productionTip = false;

// ??????????????????
_vue["default"].component(_Pagination["default"].name, _Pagination["default"]);

_vue["default"].component(_TypeNav["default"].name, _TypeNav["default"]);

_vue["default"].component(_Carousle["default"].name, _Carousle["default"]);

_vue["default"].component(_elementUi.Form.name, _elementUi.Form);

_vue["default"].component(_elementUi.Input.name, _elementUi.Input); // ??????elementUi??????


_vue["default"].component(_elementUi.Button.name, _elementUi.Button); // ??????????????????elementUi??????


_vue["default"].prototype.$msgbox = _elementUi.MessageBox;
_vue["default"].prototype.$alert = _elementUi.MessageBox.alert; // ?????????????????????

_vue["default"].use(_vueLazyload["default"], {
  loading: _["default"]
}); // ??????????????????


_vue["default"].use(_vueRouter["default"]);

new _vue["default"]({
  // ????????????
  router: _router["default"],
  store: _store["default"],
  render: function render(h) {
    return h(_App["default"]);
  },
  beforeCreate: function beforeCreate() {
    // ??????????????????
    _vue["default"].prototype.$bus = this; // ????????????????????????????????????

    _vue["default"].prototype.$API = API;
  }
}).$mount('#app');