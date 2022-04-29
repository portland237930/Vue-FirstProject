"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _api = require("@/api");

var state = {
  useraddress: {},
  orderinfo: {}
};
var mutations = {
  USERADDRESS: function USERADDRESS(state, useraddress) {
    state.useraddress = useraddress;
  },
  ORDERINFO: function ORDERINFO(state, orderinfo) {
    state.orderinfo = orderinfo;
  }
};
var actions = {
  // 获取用户地址信息请求
  UserAddress: function UserAddress(_ref) {
    var commit, result;
    return regeneratorRuntime.async(function UserAddress$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit = _ref.commit;
            _context.next = 3;
            return regeneratorRuntime.awrap((0, _api.reqAddressInfo)());

          case 3:
            result = _context.sent;
            console.log("@address", result);

            if (result.code == 200) {
              commit("USERADDRESS", result.data);
            }

          case 6:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  // 获取订单信息请求
  OrderInfo: function OrderInfo(_ref2) {
    var commit, result;
    return regeneratorRuntime.async(function OrderInfo$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commit = _ref2.commit;
            _context2.next = 3;
            return regeneratorRuntime.awrap((0, _api.reqOrderInfo)());

          case 3:
            result = _context2.sent;
            console.log("@Order", result);

            if (result.code == 200) {
              commit("ORDERINFO", result.data);
            }

          case 6:
          case "end":
            return _context2.stop();
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