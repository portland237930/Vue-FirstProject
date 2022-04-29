"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
var _default = [{
  path: "/addcartsuccess/:skuNum",
  name: "addcartsuccess",
  // 路由懒加载
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/pages/AddCartSuccess"));
    });
  },
  meta: {
    ShowFooter: true
  }
}, {
  path: "/detail/:skuId",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/pages/Detail"));
    });
  },
  // 配置路由元信息
  meta: {
    ShowFooter: true
  }
}, {
  path: "/home",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../pages/Home/HomePage.vue"));
    });
  },
  // 配置路由元信息
  meta: {
    ShowFooter: true
  }
}, {
  path: "/register",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../pages/Register'));
    });
  },
  // 配置路由元信息
  meta: {
    ShowFooter: false
  }
}, {
  path: "/login",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../pages/Login"));
    });
  },
  // 配置路由元信息
  meta: {
    ShowFooter: false
  }
}, {
  // ?占位符保证params参数可传可不传
  path: "/search/:keyword?",
  // 以对象方法发送query和params参数必须拥有name属性
  name: "search",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../pages/Search/SearchPage.vue'));
    });
  },
  // 配置路由元信息
  meta: {
    ShowFooter: true
  },
  // 路由传参(只能传递params)
  // props: true
  // 路由传参(对象写法)
  // props: { a: 1, b: 2 }
  // 路由传参(函数写法)
  props: function props($route) {
    return {
      keyword: $route.params.keyword,
      k: $route.query.k
    };
  }
}, {
  path: "/",
  redirect: "/home"
}, {
  path: "/shopcart",
  name: "shopcart",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/ShopCart'));
    });
  },
  meta: {
    ShowFooter: true
  }
}, {
  path: "/trade",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/Trade'));
    });
  },
  meta: {
    ShowFooter: true
  },
  beforeEnter: function beforeEnter(to, from, next) {
    if (from.path == "/shopcart") {
      next();
    } else {
      next(false);
    }
  }
}, {
  path: '/pay',
  // name: 'pay',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/pages/Pay"));
    });
  },
  beforeEnter: function beforeEnter(to, from, next) {
    // reject the navigation
    if (from.path == "/trade") {
      next();
    } else {
      next(false);
    }
  },
  meta: {
    ShowFooter: true
  }
}, {
  path: '/paysuccess',
  // name: 'paysucess',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/PaySuccess'));
    });
  },
  meta: {
    ShowFooter: true
  }
}, {
  path: '/center',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/Center'));
    });
  },
  children: [{
    path: "myorder",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/pages/Center/MyOrder'));
      });
    }
  }, {
    path: "grouporder",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/pages/Center/GroupOrder'));
      });
    }
  }, {
    path: "/center",
    redirect: "/center/myorder"
  }],
  meta: {
    ShowFooter: true
  }
}];
exports["default"] = _default;