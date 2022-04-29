// search模块仓库
import { reqGetSearchInfo } from "@/api"
const state = {
    searchList: {}
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        console.log("请求成功");
        state.searchList = searchList
    }
}
const actions = {
        async getSearchList({ commit }, params = {}) {
            let result = await reqGetSearchInfo(params)
                // console.log("@请求成功");
            console.log(result)
            if (result.code == 200)
                commit("GETSEARCHLIST", result.data)
        }
    }
    // 简化数据(计算属性)
const getters = {
    attrsList(state) {
        // 为防止断网时收不到数据的情况等于一个空数组以防报错
        return state.searchList.attrsList || []
    },
    goodsList(state) {
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}