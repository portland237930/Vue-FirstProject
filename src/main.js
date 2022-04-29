import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
import VueRouter from "vue-router"
import router from "@/router"
// 注册三级联动导航作为全局组件
import TypeNav from "@/components/TypeNav/TypeNav"
// 注册轮播图为全局组件
import Carousle from "@/components/Carousle/Carousle"
// 注册分页器为全局组件
import Pagination from "@/components/Pagination"
// 引入elementUi组件
import { Button, MessageBox, Form, Input } from 'element-ui';
// 引入Vuex全局管理仓库
import store from "@/store"
// 引入所接口
import * as API from "@/api"
// 引入Mock模拟的数据
import "@/mock/mockServe"
import "swiper/css/swiper.css"
// 注册全局组件
Vue.component(Pagination.name, Pagination)
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousle.name, Carousle)
Vue.component(Form.name, Form)
Vue.component(Input.name, Input)
    // 注册elementUi组件
Vue.component(Button.name, Button);
// 使用原型注册elementUi组件
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入路由懒加载
import VueLazyload from 'vue-lazyload'
// 懒加载时的图片
import waits from "@/assets/1.gif"
Vue.use(VueLazyload, {
        loading: waits
    })
    // 使用路由插件
Vue.use(VueRouter);
import "@/plugins/validate"
new Vue({
    // 挂载路由
    router,
    store,
    render: h => h(App),
    beforeCreate() {
        // 注册全局事件
        Vue.prototype.$bus = this
            // 将所有接口注册为全局接口
        Vue.prototype.$API = API
    }
}).$mount('#app')