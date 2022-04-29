<template>
  <div id="app">
    <Header-Index/>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <Footer-Index v-show="$route.meta.ShowFooter"/>
  </div>
</template>

<script>
import HeaderIndex from "./components/Header/HeaderIndex"
import FooterIndex from "./components/Footer/FooterIndex"
export default {
  name: 'App',
  components: {
    HeaderIndex,
    FooterIndex
  },
  mounted() {
    // 在解析模板的时候添加category的action
    this.$store.dispatch('categoryList')
    // // 派发action获得用户登录信息
    this.$store.dispatch("UserInfo");
  }
}
</script>

<style>
</style>
