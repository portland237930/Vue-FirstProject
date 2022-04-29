import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogOut } from "@/api"
import { setToken, getToken, removeToken } from "@/utils/token"
const state = {
    // 验证码
    code: '',
    // 用户登录获得的令牌
    token: getToken(),
    // 用户登录信息
    userInfo: {}
}
const mutations = {
    // 将请求得到的验证码放入state中
    GETCODE(state, code) {
        state.code = code
    },
    // 将请求得到的令牌放入state中
    USERLOGIN(state, token) {
        state.token = token
    },
    // 将请求得到的用户登录信息放入state中
    USERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    // 退出登录后将仓库中的用户信息和令牌清空
    LOGOUT(state) {
        state.token = ""
        state.userInfo = ""
        removeToken()
    }
}
const actions = {
    // 获取验证码请求
    async GetCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit("GETCODE", result.data)
        } else {
            return Promise.reject(new Error("failed"))
        }
    },
    //注册请求
    async UserRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        console.log("@register", result)
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error("failed"))
        }
    },
    // 登录请求
    async UserLogin({ commit }, user) {
        let result = await reqUserLogin(user)
            // console.log("@User", result);
        if (result.code == 200) {
            commit("USERLOGIN", result.data.token);
            // 存储token
            setToken(result.data.token)
            return "ok"
        } else {
            return Promise.reject(new Error("failed"))
        }
    },
    // 获取登录信息请求
    async UserInfo({ commit }) {
        let result = await reqUserInfo()
        console.log(result.data)
        if (result.code == 200) {
            commit("USERINFO", result.data)
            return "ok"
        } else {
            return Promise.reject(new Error("failed"))
        }
    },
    // 获取退出登录请求
    async LogOut({ commit }) {
        let result = await reqLogOut()
        if (result.code == 200) {
            commit("LOGOUT")
            return "ok"
        } else {
            return Promise.reject(new Error("failed"))
        }
    }

}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}