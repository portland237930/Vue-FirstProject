import Vuex from "vuex"
import Vue from "vue"
// 导入模块仓库
import home from "./home"
import search from "./search"
import details from "./details"
import shopcart from "./shopcart"
import user from "./user"
import trade from "./trade"
Vue.use(Vuex)
    // 创建Vuex.Store实例对象并默认暴露
export default new Vuex.Store({
    // 模块化管理
    modules: {
        home,
        search,
        details,
        shopcart,
        user,
        trade
    }
})