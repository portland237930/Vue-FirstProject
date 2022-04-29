// api接口发送请求
import axios from "axios";
// 获得滑动条
import nprogress from "nprogress"
import "nprogress/nprogress.css"
// 获得仓库
import store from "@/store"
//1、对axios二次封装
const requests = axios.create({
        //基础路径，requests发出的请求在端口号后面会跟改baseURl
        baseURL: '/api',
        timeout: 5000,
    })
    //2、配置请求拦截器
requests.interceptors.request.use(config => {
        // 如果store中存在游客身份就将他存储于响应头中
        if (store.state.details.uuid_token) {
            config.headers.userTempId = store.state.details.uuid_token
        }
        // 如果store中存在token就存入响应头中
        if (store.state.user.token) {
            config.headers.token = store.state.user.token
        }
        // 添加进度条
        nprogress.start()
            //config内主要是对请求头Header配置
            //比如添加token
        return config;
    })
    //3、配置相应拦截器
requests.interceptors.response.use((res) => {
        // 结束进度条
        nprogress.done()
            //成功的回调函数
        return res.data;
    }, (error) => {
        //失败的回调函数
        console.log("响应失败" + error)
        return Promise.reject(new Error('fail'))
    })
    //4、对外暴露
export default requests;