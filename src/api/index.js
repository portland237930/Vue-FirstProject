// api集中管理
import requests from "./request"
import requestsmock from "./requestmock"
// 三级联动api接口配置,对外暴露使整个文件能使用该接口返回的请求参数
export const reqCategoryList = () => requests({
        // 进行基础配置无需使用/api前缀
        url: "/product/getBaseCategoryList",
        method: "GET"
    })
    // 主页轮播图mock接口配置
export const reqBannerList = () => requestsmock({
        url: "/banner",
        method: "GET"
    })
    // 底部数据接口配置
export const reqFloorList = () => requestsmock({
        url: "/floor",
        methods: "GET"
    })
    // 搜索数据接口配置
export const reqGetSearchInfo = (params) => requests({
        url: "/list",
        method: "post",
        data: params
    })
    // 商品详情页接口配置
export const reqGetGoodsInfo = (skuId) => requests({
        url: `/item/${skuId }`,
        method: "get"
    })
    // 添加或修改购物车信息接口
export const reqAddOrUpdateCatShop = (skuId, skuNum) => requests({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method: "post"
    })
    // 获取购物车列表信息接口
export const reqCartList = () => requests({
        url: '/cart/cartList',
        method: "get"
    })
    // 删除购物车信息接口
export const reqDeleteCart = (skuId) => requests({
        url: `/cart/deleteCart/${skuId}`,
        method: "DELETE"
    })
    // 勾选购物车列表接口
export const reqGetCartCheckedByID = (skuID, isChecked) => requests({
        url: `/cart/checkCart/${skuID}/${isChecked}`,
        method: "get"

    })
    // 获取验证码接口
export const reqGetCode = (phone) => requests({
        url: `/user/passport/sendCode/${phone}`,
        method: 'get'
    })
    // 用户注册接口
export const reqUserRegister = (data) => requests({
        url: `/user/passport/register`,
        data,
        method: 'post'
    })
    // 用户登录接口
export const reqUserLogin = (data) => requests({
    url: '/user/passport/login',
    data,
    method: 'post'
})
export const reqUserInfo = () => requests({
        url: '/user/passport/auth/getUserInfo'
    })
    // 退出登录接口
export const reqLogOut = () => requests({
        url: '/user/passport/logout',
        method: "get"
    })
    // 获取用户地址信息接口
export const reqAddressInfo = () => requests({
        url: '/user/userAddress/auth/findUserAddressList',
        method: "get"
    })
    // 获取订单信息接口
export const reqOrderInfo = () => requests({
        url: '/order/auth/trade',
        method: 'get'
    })
    // 用户提交订单接口
export const reqSubmitOrder = (tradeNo, data) => requests({
        url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
        data,
        method: 'post'
    })
    // 支付信息接口
export const reqPayment = (orderId) => requests({
        url: `/payment/weixin/createNative/${orderId}`,
        method: 'get'
    })
    // 支付状态接口
export const reqPayStatus = (orderId) => requests({
        url: `/payment/weixin/queryPayStatus/${orderId}`,
        method: 'get'
    })
    // 获取我的订单接口
export const reqMyOrder = (page, limit) => requests({
    url: `/order/auth/${page}/${limit}`,
    method: "get"
})