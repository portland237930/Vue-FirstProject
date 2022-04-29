"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _api = require("@/api");

var state = {
  cartlist: []
};
var mutations = {
  GETSHOPCART: function GETSHOPCART(state, cartlist) {
    state.cartlist = cartlist;
  }
};
var actions = {
  // 获取购物车商品信息
  getShopCart: function getShopCart(_ref) {
    var commit, result;
    return regeneratorRuntime.async(function getShopCart$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit = _ref.commit;
            _context.next = 3;
            return regeneratorRuntime.awrap((0, _api.reqCartList)());

          case 3:
            result = _context.sent;

            if (result.code == 200) {
              commit("GETSHOPCART", result.data);
            }

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  // 删除购物车商品信息
  DeleteCart: function DeleteCart(_ref2, skuId) {
    var commit, result;
    return regeneratorRuntime.async(function DeleteCart$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commit = _ref2.commit;
            _context2.next = 3;
            return regeneratorRuntime.awrap((0, _api.reqDeleteCart)(skuId));

          case 3:
            result = _context2.sent;

            if (!(result.code == 200)) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", "ok");

          case 8:
            return _context2.abrupt("return", Promise.reject(new Error("failed")));

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  // 发送切换勾选状态请求
  checkCart: function checkCart(_ref3, _ref4) {
    var commit, skuID, isChecked, result;
    return regeneratorRuntime.async(function checkCart$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            commit = _ref3.commit;
            skuID = _ref4.skuID, isChecked = _ref4.isChecked;
            console.log("@checkCart", skuID, isChecked);
            _context3.next = 5;
            return regeneratorRuntime.awrap((0, _api.reqGetCartCheckedByID)(skuID, isChecked));

          case 5:
            result = _context3.sent;

            if (!(result.code == 200)) {
              _context3.next = 10;
              break;
            }

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
  // 发送删除选中商品请求
  DeleteAllCheckedShopCart: function DeleteAllCheckedShopCart(_ref5) {
    var dispatch = _ref5.dispatch,
        state = _ref5.state;
    // 创建一个空数组用于接受返回删除结果的Promise
    var promiseAll = []; // 遍历购物车列表如果isChecked的值为1则派发删除购物车信息请求

    state.cartlist[0].cartInfoList.forEach(function (item) {
      var promise = item.isChecked == 1 ? dispatch("DeleteCart", item.skuId) : ""; // 将删除购物车数据返回的Promise存入数组中

      promiseAll.push(promise);
    }); // 如果全部成功则数组返回true反则false

    return Promise.all(promiseAll);
  },
  UpdateAllCheckedShopCart: function UpdateAllCheckedShopCart(_ref6, isChecked) {
    var dispatch = _ref6.dispatch,
        state = _ref6.state;
    var promiseALL = [];
    console.log(isChecked);
    state.cartlist[0].cartInfoList.forEach(function (item) {
      console.log(item);
      var promise = dispatch("checkCart", {
        skuID: item.skuId,
        isChecked: isChecked
      });
      console.log(promise);
      promiseALL.push(promise);
    });
    return Promise.all(promiseALL);
  }
};
var getters = {
  // 简化购物车结构信息
  cartlist: function cartlist(state) {
    return state.cartlist[0] || {};
  }
};
var _default = {
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
};
exports["default"] = _default;