import { reqGetGoodsInfo, reqAddOrUpdateCatShop } from "@/api"
import { getUUID } from "@/utils/uuid_token"
const state = {
    // 商品详情页数据
    goodsinfo: {},
    uuid_token: getUUID()
}
const mutations = {
    // 处理数据后派送至state中
    GETGOODSINFO(state, goodsinfo) {
        state.goodsinfo = goodsinfo
    }
}
const actions = {
    // 封装商品详情数据
    async GetGoodsInfo({ commit }, params = {}) {
        let result = await reqGetGoodsInfo(params)
            // console.log("@@@", result)
        if (result.code == 200) {
            // console.log("@");
            commit("GETGOODSINFO", result.data)
        }
    },
    // 封装添加购物车
    async AddCartShop({ commit }, { skuId, skuNum }) {
        // 发送添加或修改购物车请求
        let result = await reqAddOrUpdateCatShop(skuId, skuNum)
            // 判断请求是否发送成功
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error("failed"))
        }
    }
}
const getters = {
    categoryView(state) {
        // 简化商品详情页信息
        return state.goodsinfo.categoryView || {}
    },
    skuInfo(state) {
        // 简化商品详情页放大镜信息
        return state.goodsinfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        // 简化商品详情页商品信息
        return state.goodsinfo.spuSaleAttrList || {}
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}