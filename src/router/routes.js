// 引入一级路由组件
// import Home from "../pages/Home/HomePage.vue"
// import Register from "../pages/Register"
// import Search from "../pages/Search/SearchPage.vue"
// import Login from "../pages/Login"
// import Detail from "@/pages/Detail"
// import AddCartSuccess from "@/pages/AddCartSuccess"
// import ShopCart from "@/pages/ShopCart"
// import Trade from "@/pages/Trade"
// import Pay from '@/pages/Pay';
// import PaySuccess from "@/pages/PaySuccess"
// import Center from "@/pages/Center"
// 引入二级路由组件
// import MyOrder from "@/pages/Center/MyOrder"
// import GroupOrder from "@/pages/Center/GroupOrder"
// 路由跳转配置
export default [{
        path: "/addcartsuccess/:skuNum",
        name: "addcartsuccess",
        // 路由懒加载
        component: () =>
            import ("@/pages/AddCartSuccess"),
        meta: {
            ShowFooter: true
        }
    },
    {
        path: "/detail/:skuId",
        component: () =>
            import ("@/pages/Detail"),
        // 配置路由元信息
        meta: {
            ShowFooter: true
        }
    },
    {
        path: "/home",
        component: () =>
            import ("../pages/Home/HomePage.vue"),
        // 配置路由元信息
        meta: {
            ShowFooter: true
        }
    },
    {
        path: "/register",
        component: () =>
            import ('../pages/Register'),
        // 配置路由元信息
        meta: {
            ShowFooter: false
        }
    },
    {
        path: "/login",
        component: () =>
            import ("../pages/Login"),
        // 配置路由元信息
        meta: {
            ShowFooter: false
        }

    },
    {
        // ?占位符保证params参数可传可不传
        path: "/search/:keyword?",
        // 以对象方法发送query和params参数必须拥有name属性
        name: "search",
        component: () =>
            import ('../pages/Search/SearchPage.vue'),
        // 配置路由元信息
        meta: {
            ShowFooter: true
        },
        // 路由传参(只能传递params)
        // props: true
        // 路由传参(对象写法)
        // props: { a: 1, b: 2 }
        // 路由传参(函数写法)
        props: ($route) => ({ keyword: $route.params.keyword, k: $route.query.k })
    },
    {
        path: "/",
        redirect: "/home"
    },
    {
        path: "/shopcart",
        name: "shopcart",
        component: () =>
            import ('@/pages/ShopCart'),
        meta: {
            ShowFooter: true
        }
    },
    {
        path: "/trade",
        component: () =>
            import ('@/pages/Trade'),
        meta: {
            ShowFooter: true
        },
        beforeEnter: (to, from, next) => {
            if (from.path == "/shopcart") {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/pay',
        // name: 'pay',
        component: () =>
            import ("@/pages/Pay"),
        beforeEnter: (to, from, next) => {
            // reject the navigation
            if (from.path == "/trade") {
                next()
            } else {
                next(false)
            }
        },
        meta: {
            ShowFooter: true
        }
    },
    {
        path: '/paysuccess',
        // name: 'paysucess',
        component: () =>
            import ('@/pages/PaySuccess'),
        meta: {
            ShowFooter: true
        }
    },
    {
        path: '/center',
        component: () =>
            import ('@/pages/Center'),
        children: [{
            path: "myorder",
            component: () =>
                import ('@/pages/Center/MyOrder')
        }, {
            path: "grouporder",
            component: () =>
                import ('@/pages/Center/GroupOrder')
        }, {
            path: "/center",
            redirect: "/center/myorder",
        }],
        meta: {
            ShowFooter: true
        }
    }

]