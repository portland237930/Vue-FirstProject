"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _routes = _interopRequireDefault(require("./routes"));

var _store = _interopRequireDefault(require("@/store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 重写push|replace方法,使编程式导航不会报错
// 保存Push|replace方法
var originPush = _vueRouter["default"].prototype.push;
var originReplace = _vueRouter["default"].prototype.replace; // 重写push|replace方法,location表示要跳转的路由,resolve表示成功的回调,reject表示失败的回调

_vueRouter["default"].prototype.push = function (location, resolve, reject) {
  // 如果存在回调信息就调用push方法,如果不存在就返回回调信息
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, function () {}, function () {});
  }
};

_vueRouter["default"].prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(this, location, function () {}, function () {});
  }
}; // 配置路由信息


var router = new _vueRouter["default"]({
  // 引入路由跳转
  routes: _routes["default"],
  // 使路由跳转时自动跳转到顶部
  scrollBehavior: function scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return {
      y: 0
    };
  }
});
router.beforeEach(function _callee(to, from, next) {
  var token, username, topath;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // 获得token
          token = _store["default"].state.user.token; // 获得用户名

          username = _store["default"].state.user.userInfo.name; // next()

          console.log(token);
          console.log(username); // 如果令牌存在

          if (!token) {
            _context.next = 27;
            break;
          }

          if (!(to.path == "/login")) {
            _context.next = 9;
            break;
          }

          next("/home");
          _context.next = 25;
          break;

        case 9:
          if (!username) {
            _context.next = 13;
            break;
          }

          next();
          _context.next = 25;
          break;

        case 13:
          _context.prev = 13;
          _context.next = 16;
          return regeneratorRuntime.awrap(_store["default"].dispatch('UserInfo'));

        case 16:
          next();
          console.log(username);
          _context.next = 25;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](13);
          _context.next = 24;
          return regeneratorRuntime.awrap(_store["default"].dispatch('LogOut'));

        case 24:
          next("/login");

        case 25:
          _context.next = 29;
          break;

        case 27:
          // 获得路由跳转至的路径
          topath = to.path; // 如果进入未登录无法进入交易、支付、订单页面

          if (topath.indexOf('/trade') !== -1 || topath.indexOf('/pay') !== -1 || topath.indexOf('/center') !== -1) {
            // 将原有的路由路径存储至query中
            next("/login?redirect=".concat(topath));
          } else {
            // 其他页面放行
            next();
          }

        case 29:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[13, 20]]);
});
var _default = router;
exports["default"] = _default;