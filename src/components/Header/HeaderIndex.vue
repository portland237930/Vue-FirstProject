<template>
  <!-- 头部模块 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <!-- 如果未登录 -->
          <p v-if="!userName">
            <span>请</span>
            <routerLink to="/login">登录</routerLink>
            <routerLink to="/register" class="register">免费注册</routerLink>
          </p>
          <!-- 如果登录了 -->
          <p v-else>
            <span>{{userName}}</span>
            <span class="register" @click="LogOut">退出登录</span>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/trade">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <routerLink class="logo" to="/home">
          <img src="./images/logo.png" alt />
        </routerLink>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderIndex',
  data() {
    return {
      keyword: ''
    }
  },
  computed: {
    // 获得用户名称
		userName(){
			return this.$store.state.user.userInfo.name||""
		}
  },
  methods: {
    // 跳转搜索界面
    goSearch() {
      // 发送query参数和params参数,字符串方法
      // this.$router.push("/search/"+this.keyword+"?k="+this.keyword.toUpperCase())
      //  发送query参数和params参数,模板字符串方法
      // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
      // 发送query参数和params参数,对象方法(undefined用于解决传空字符串url错误的问题)
      let location = {
        name: 'search',
        params: { keyword: this.keyword || undefined },
        query: { k: this.keyword.toUpperCase() }
      }
      // 判断是否有query参数
      if (this.$route.query) {
        // 合并参数
        location.query = this.$route.query
      }
      // 路由跳转
      this.$router.push(location)
    },
    // 退出登录功能
    async LogOut(){
      try {
        // 等待退出登录请求成功
        await this.$store.dispatch("LogOut")
        // 重新跳转至登录界面
        this.$router.push("/login")
      } catch (error) {
        alert(error.message)
      }
    }
  },
  mounted() {
    // 通过全局事件总线删除keyword
    this.$bus.$on('clear', () => {
      this.keyword = ''
    })
  }
}
</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>