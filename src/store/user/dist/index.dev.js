"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _api = require("@/api");

var _token = require("@/utils/token");

var state = {
  // 验证码
  code: '',
  // 用户登录获得的令牌
  token: (0, _token.getToken)(),
  // 用户登录信息
  userInfo: {}
};
var mutations = {
  // 将请求得到的验证码放入state中
  GETCODE: function GETCODE(state, code) {
    state.code = code;
  },
  // 将请求得到的令牌放入state中
  USERLOGIN: function USERLOGIN(state, token) {
    state.token = token;
  },
  // 将请求得到的用户登录信息放入state中
  USERINFO: function USERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  // 退出登录后将仓库中的用户信息和令牌清空
  LOGOUT: function LOGOUT(state) {
    state.token = "";
    state.userInfo = "";
    (0, _token.removeToken)();
  }
};
var actions = {
  // 获取验证码请求
  GetCode: function GetCode(_ref, phone) {
    var commit, result;
    return regeneratorRuntime.async(function GetCode$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit = _ref.commit;
            _context.next = 3;
            return regeneratorRuntime.awrap((0, _api.reqGetCode)(phone));

          case 3:
            result = _context.sent;

            if (!(result.code == 200)) {
              _context.next = 8;
              break;
            }

            commit("GETCODE", result.data);
            _context.next = 9;
            break;

          case 8:
            return _context.abrupt("return", Promise.reject(new Error("failed")));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  //注册请求
  UserRegister: function UserRegister(_ref2, user) {
    var commit, result;
    return regeneratorRuntime.async(function UserRegister$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commit = _ref2.commit;
            _context2.next = 3;
            return regeneratorRuntime.awrap((0, _api.reqUserRegister)(user));

          case 3:
            result = _context2.sent;
            console.log("@register", result);

            if (!(result.code == 200)) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", "ok");

          case 9:
            return _context2.abrupt("return", Promise.reject(new Error("failed")));

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  // 登录请求
  UserLogin: function UserLogin(_ref3, user) {
    var commit, result;
    return regeneratorRuntime.async(function UserLogin$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            commit = _ref3.commit;
            _context3.next = 3;
            return regeneratorRuntime.awrap((0, _api.reqUserLogin)(user));

          case 3:
            result = _context3.sent;

            if (!(result.code == 200)) {
              _context3.next = 10;
              break;
            }

            commit("USERLOGIN", result.data.token); // 存储token

            (0, _token.setToken)(result.data.token);
            return _context3.abrupt("return", "ok");

          case 10:
            return _context3.abrupt("return", Promise.reject(new Error("failed")));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  // 获取登录信息请求
  UserInfo: function UserInfo(_ref4) {
    var commit, result;
    return regeneratorRuntime.async(function UserInfo$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            commit = _ref4.commit;
            _context4.next = 3;
            return regeneratorRuntime.awrap((0, _api.reqUserInfo)());

          case 3:
            result = _context4.sent;
            console.log(result.data);

            if (!(result.code == 200)) {
              _context4.next = 10;
              break;
            }

            commit("USERINFO", result.data);
            return _context4.abrupt("return", "ok");

          case 10:
            return _context4.abrupt("return", Promise.reject(new Error("failed")));

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  // 获取退出登录请求
  LogOut: function LogOut(_ref5) {
    var commit, result;
    return regeneratorRuntime.async(function LogOut$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            commit = _ref5.commit;
            _context5.next = 3;
            return regeneratorRuntime.awrap((0, _api.reqLogOut)());

          case 3:
            result = _context5.sent;

            if (!(result.code == 200)) {
              _context5.next = 9;
              break;
            }

            commit("LOGOUT");
            return _context5.abrupt("return", "ok");

          case 9:
            return _context5.abrupt("return", Promise.reject(new Error("failed")));

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    });
  }
};
var getters = {};
var _default = {
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
};
exports["default"] = _default;