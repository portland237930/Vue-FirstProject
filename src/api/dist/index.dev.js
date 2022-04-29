"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reqMyOrder = exports.reqPayStatus = exports.reqPayment = exports.reqSubmitOrder = exports.reqOrderInfo = exports.reqAddressInfo = exports.reqLogOut = exports.reqUserInfo = exports.reqUserLogin = exports.reqUserRegister = exports.reqGetCode = exports.reqGetCartCheckedByID = exports.reqDeleteCart = exports.reqCartList = exports.reqAddOrUpdateCatShop = exports.reqGetGoodsInfo = exports.reqGetSearchInfo = exports.reqFloorList = exports.reqBannerList = exports.reqCategoryList = void 0;

var _request = _interopRequireDefault(require("./request"));

var _requestmock = _interopRequireDefault(require("./requestmock"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// api集中管理
// 三级联动api接口配置,对外暴露使整个文件能使用该接口返回的请求参数
var reqCategoryList = function reqCategoryList() {
  return (0, _request["default"])({
    // 进行基础配置无需使用/api前缀
    url: "/product/getBaseCategoryList",
    method: "GET"
  });
}; // 主页轮播图mock接口配置


exports.reqCategoryList = reqCategoryList;

var reqBannerList = function reqBannerList() {
  return (0, _requestmock["default"])({
    url: "/banner",
    method: "GET"
  });
}; // 底部数据接口配置


exports.reqBannerList = reqBannerList;

var reqFloorList = function reqFloorList() {
  return (0, _requestmock["default"])({
    url: "/floor",
    methods: "GET"
  });
}; // 搜索数据接口配置


exports.reqFloorList = reqFloorList;

var reqGetSearchInfo = function reqGetSearchInfo(params) {
  return (0, _request["default"])({
    url: "/list",
    method: "post",
    data: params
  });
}; // 商品详情页接口配置


exports.reqGetSearchInfo = reqGetSearchInfo;

var reqGetGoodsInfo = function reqGetGoodsInfo(skuId) {
  return (0, _request["default"])({
    url: "/item/".concat(skuId),
    method: "get"
  });
}; // 添加或修改购物车信息接口


exports.reqGetGoodsInfo = reqGetGoodsInfo;

var reqAddOrUpdateCatShop = function reqAddOrUpdateCatShop(skuId, skuNum) {
  return (0, _request["default"])({
    url: "/cart/addToCart/".concat(skuId, "/").concat(skuNum),
    method: "post"
  });
}; // 获取购物车列表信息接口


exports.reqAddOrUpdateCatShop = reqAddOrUpdateCatShop;

var reqCartList = function reqCartList() {
  return (0, _request["default"])({
    url: '/cart/cartList',
    method: "get"
  });
}; // 删除购物车信息接口


exports.reqCartList = reqCartList;

var reqDeleteCart = function reqDeleteCart(skuId) {
  return (0, _request["default"])({
    url: "/cart/deleteCart/".concat(skuId),
    method: "DELETE"
  });
}; // 勾选购物车列表接口


exports.reqDeleteCart = reqDeleteCart;

var reqGetCartCheckedByID = function reqGetCartCheckedByID(skuID, isChecked) {
  return (0, _request["default"])({
    url: "/cart/checkCart/".concat(skuID, "/").concat(isChecked),
    method: "get"
  });
}; // 获取验证码接口


exports.reqGetCartCheckedByID = reqGetCartCheckedByID;

var reqGetCode = function reqGetCode(phone) {
  return (0, _request["default"])({
    url: "/user/passport/sendCode/".concat(phone),
    method: 'get'
  });
}; // 用户注册接口


exports.reqGetCode = reqGetCode;

var reqUserRegister = function reqUserRegister(data) {
  return (0, _request["default"])({
    url: "/user/passport/register",
    data: data,
    method: 'post'
  });
}; // 用户登录接口


exports.reqUserRegister = reqUserRegister;

var reqUserLogin = function reqUserLogin(data) {
  return (0, _request["default"])({
    url: '/user/passport/login',
    data: data,
    method: 'post'
  });
};

exports.reqUserLogin = reqUserLogin;

var reqUserInfo = function reqUserInfo() {
  return (0, _request["default"])({
    url: '/user/passport/auth/getUserInfo'
  });
}; // 退出登录接口


exports.reqUserInfo = reqUserInfo;

var reqLogOut = function reqLogOut() {
  return (0, _request["default"])({
    url: '/user/passport/logout',
    method: "get"
  });
}; // 获取用户地址信息接口


exports.reqLogOut = reqLogOut;

var reqAddressInfo = function reqAddressInfo() {
  return (0, _request["default"])({
    url: '/user/userAddress/auth/findUserAddressList',
    method: "get"
  });
}; // 获取订单信息接口


exports.reqAddressInfo = reqAddressInfo;

var reqOrderInfo = function reqOrderInfo() {
  return (0, _request["default"])({
    url: '/order/auth/trade',
    method: 'get'
  });
}; // 用户提交订单接口


exports.reqOrderInfo = reqOrderInfo;

var reqSubmitOrder = function reqSubmitOrder(tradeNo, data) {
  return (0, _request["default"])({
    url: "/order/auth/submitOrder?tradeNo=".concat(tradeNo),
    data: data,
    method: 'post'
  });
}; // 支付信息接口


exports.reqSubmitOrder = reqSubmitOrder;

var reqPayment = function reqPayment(orderId) {
  return (0, _request["default"])({
    url: "/payment/weixin/createNative/".concat(orderId),
    method: 'get'
  });
}; // 支付状态接口


exports.reqPayment = reqPayment;

var reqPayStatus = function reqPayStatus(orderId) {
  return (0, _request["default"])({
    url: "/payment/weixin/queryPayStatus/".concat(orderId),
    method: 'get'
  });
}; // 获取我的订单接口


exports.reqPayStatus = reqPayStatus;

var reqMyOrder = function reqMyOrder(page, limit) {
  return (0, _request["default"])({
    url: "/order/auth/".concat(page, "/").concat(limit),
    method: "get"
  });
};

exports.reqMyOrder = reqMyOrder;