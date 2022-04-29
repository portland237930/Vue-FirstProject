// home模块仓库
// 引入数据请求
import { reqCategoryList, reqBannerList, reqFloorList } from "@/api"
const state = {
    // 创建用于存储三级分类导航数据的列表
    categoryList: [],
    bannerlist: [],
    floorlist: []
}
const mutations = {
    // 将三级列表导航的数据存入state中
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerlist) {
        state.bannerlist = bannerlist
    },
    GETFLOORLIST(state, floorlist) {
        state.floorlist = floorlist
    }
}
const actions = {
    // 使用async解析二次封装后的ajax请求
    async categoryList({ commit }) {
        let result = await reqCategoryList()
            // 若成功获取到请求数据, 则提交数据至mutations
        if (result.code == 200) {
            console.log("获取请求成功")
            commit("CATEGORYLIST", result)
        }
    },
    // 使用async解析二次封装后的mock模拟数据
    async getbannerlist({ commit }) {
        let result = await reqBannerList()
            // 若成功获取到请求数据, 则提交数据至mutations
        if (result.code == 200) {
            commit("GETBANNERLIST", result)
        }
    },
    // 使用async解析二次封装后的mock模拟数据
    async getFloorList({ commit }) {
        let result = await reqFloorList()
        if (result.code == 200) {
            commit("GETFLOORLIST", result)
        }
    }

}
const getters = {

}
export default {
    state,
    mutations,
    actions,
    getters
}