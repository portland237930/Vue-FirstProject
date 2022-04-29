import {
    reqCartList,
    reqDeleteCart,
    reqGetCartCheckedByID
} from "@/api"
const state = {
    cartlist: []
}
const mutations = {
    GETSHOPCART(state, cartlist) {
        state.cartlist = cartlist
    }
}
const actions = {
    // 获取购物车商品信息
    async getShopCart({
        commit
    }) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit("GETSHOPCART", result.data)
        }
    },
    // 删除购物车商品信息
    async DeleteCart({
        commit
    }, skuId) {
        let result = await reqDeleteCart(skuId)
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error("failed"))
        }
    },
    // 发送切换勾选状态请求
    async checkCart({
        commit
    }, {
        skuID,
        isChecked
    }) {
        console.log("@checkCart", skuID, isChecked)
        let result = await reqGetCartCheckedByID(skuID, isChecked)
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error("failed"))
        }
    },
    // 发送删除选中商品请求
    DeleteAllCheckedShopCart({
        dispatch,
        state
    }) {
        // 创建一个空数组用于接受返回删除结果的Promise
        let promiseAll = []
            // 遍历购物车列表如果isChecked的值为1则派发删除购物车信息请求
        state.cartlist[0].cartInfoList.forEach(item => {
                let promise = item.isChecked == 1 ? dispatch("DeleteCart", item.skuId) : ""
                    // 将删除购物车数据返回的Promise存入数组中
                promiseAll.push(promise)
            })
            // 如果全部成功则数组返回true反则false
        return Promise.all(promiseAll)
    },
    UpdateAllCheckedShopCart({
        dispatch,
        state
    }, isChecked) {
        let promiseALL = []
        console.log(isChecked);
        state.cartlist[0].cartInfoList.forEach((item) => {
            console.log(item)
            let promise = dispatch("checkCart", {
                skuID: item.skuId,
                isChecked
            })
            console.log(promise)
            promiseALL.push(promise)
        })
        return Promise.all(promiseALL)
    }
}
const getters = {
    // 简化购物车结构信息
    cartlist(state) {
        return state.cartlist[0] || {}
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}