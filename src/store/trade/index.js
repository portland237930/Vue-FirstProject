import { reqAddressInfo, reqOrderInfo } from "@/api"
const state = {
    useraddress: {},
    orderinfo: {},
}
const mutations = {
    USERADDRESS(state, useraddress) {
        state.useraddress = useraddress
    },
    ORDERINFO(state, orderinfo) {
        state.orderinfo = orderinfo
    }
}
const actions = {
    // 获取用户地址信息请求
    async UserAddress({ commit }) {
        let result = await reqAddressInfo()
        console.log("@address", result);
        if (result.code == 200) {
            commit("USERADDRESS", result.data)
        }
    },
    // 获取订单信息请求
    async OrderInfo({ commit }) {
        let result = await reqOrderInfo()
        console.log("@Order", result);
        if (result.code == 200) {
            commit("ORDERINFO", result.data)
        }

    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters,
}