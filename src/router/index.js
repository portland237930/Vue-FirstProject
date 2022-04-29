import VueRouter from "vue-router"
import routes from "./routes"
import store from "@/store"
// 重写push|replace方法,使编程式导航不会报错
// 保存Push|replace方法
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
    // 重写push|replace方法,location表示要跳转的路由,resolve表示成功的回调,reject表示失败的回调
VueRouter.prototype.push = function(location, resolve, reject) {
    // 如果存在回调信息就调用push方法,如果不存在就返回回调信息
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}
VueRouter.prototype.replace = function(location, resolve, reject) {
        if (resolve && reject) {
            originReplace.call(this, location, resolve, reject)
        } else {
            originReplace.call(this, location, () => {}, () => {})
        }
    }
    // 配置路由信息
let router = new VueRouter({
    // 引入路由跳转
    routes,
    // 使路由跳转时自动跳转到顶部
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})
router.beforeEach(async(to, from, next) => {
    // 获得token
    let token = store.state.user.token
        // 获得用户名
    let username = store.state.user.userInfo.name
        // next()
    console.log(token);
    console.log(username)
        // 如果令牌存在
    if (token) {
        // 如果存在令牌路由不能跳转至登录界面
        if (to.path == "/login") {
            next("/home")
        } else {
            // 如果存在用户名就允许放行，否则重新发起请求
            if (username) {
                next()
            } else {
                // 重新发起请求获得用户信息
                try {
                    await store.dispatch('UserInfo')
                    next()
                    console.log(username)
                } catch (error) {
                    // 如果token失效就退出登录并跳转至用户登录界面
                    await store.dispatch('LogOut')
                    next("/login")
                }
            }
        }
    } else {
        // 获得路由跳转至的路径
        let topath = to.path
            // 如果进入未登录无法进入交易、支付、订单页面
        if (topath.indexOf('/trade') !== -1 || topath.indexOf('/pay') !== -1 || topath.indexOf('/center') !== -1) {
            // 将原有的路由路径存储至query中
            next(`/login?redirect=${topath}`)
        } else {
            // 其他页面放行
            next()

        }

    }
})
export default router