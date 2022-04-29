<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <!-- 购物车标题 -->
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <!-- 购物车列表 -->
        <ul class="cart-list" v-for="(cart,index) in cartInfoList" :key="cart.skuId">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked"
              @click="updateChecked(cart,$event.target.checked)"
            />
          </li>
          <!-- 购物车商品图片 -->
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cart.skuPrice}}</span>
          </li>
          <!-- 购物车选择数量 -->
          <li class="cart-list-con5">
            <!-- 传入三个参数第一个代表表示点击的是哪个控件,第二个代表差值,第三个代表点击的是列表的哪个元素 -->
            <a href="javascript:void(0)" class="mins" @click="handlerProductGoods('mins',-1,cart)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="handlerProductGoods('change',$event.target.value*1,cart)"
            />
            <a href="javascript:void(0)" class="plus" @click="handlerProductGoods('plus',1,cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.skuNum*cart.skuPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="DeleteCart(cart)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked&&cartInfoList.length>0"
          @change="updateAllShopCartChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="DeleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{TotalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { throttle } from 'lodash'
export default {
  name: 'ShopCart',
  mounted() {
    // 派发action获得购物车接口
    this.getData()
  },
  computed: {
    // 获得购物车信息
    ...mapGetters(['cartlist']),
    // 简化购物车信息
    cartInfoList() {
      return this.cartlist.cartInfoList || []
    },
    TotalPrice() {
      let sum = 0
      this.cartInfoList.forEach(item => {
        sum += item.skuNum * item.skuPrice
      })
      return sum
    },
    isAllChecked() {
      return this.cartInfoList.every(item => item.isChecked == 1)
    }
  },
  methods: {
    // 处理商品产品数量(type表示触发的控件,disNum表示差值,cart表示触发列表中哪一个组件),并对函数进行节流
    handlerProductGoods: throttle(async function(type, disNum, cart) {
      // 判断点击控件
      switch (type) {
        case 'plus':
          disNum = 1
          break
        case 'mins':
          // 如果非负数就将差值设为0,反则为-1
          disNum = cart.skuNum > 0 ? -1 : 0
          break
        case 'change':
          // 如果输入非法或者差值小于1则等于0
          if (isNaN(disNum) || disNum < 0) {
            disNum = 0
          } else {
            disNum = parseInt(disNum) - cart.skuNum
          }
          break
      }
      try {
        // 发送修改购物车信息请求
        await this.$store.dispatch('AddCartShop', {
          skuId: cart.skuId,
          skuNum: disNum
        })
        this.getData()
      } catch (error) {
        alert('修改失败')
      }
    }, 500),
    // 等待请求结束后重新发送得到购物车信息请求
    getData() {
      this.$store.dispatch('getShopCart')
    },
    async DeleteCart(cart) {
      try {
        await this.$store.dispatch('DeleteCart', cart.skuId)
        this.getData()
      } catch (error) {
        alert('删除失败')
      }
    },
    // 更新购物车商品勾选状态
    async updateChecked(cart, isChecked) {
      // 根据是否被选中返回1或0
      let checked = isChecked ? 1 : 0
      // console.log(checked);
      try {
        // 等待更新选中购物车请求结束后重新发送获得购物车数据请求
        await this.$store.dispatch('checkCart', {
          skuID: cart.skuId,
          isChecked: checked
        })
        this.getData()
      } catch (error) {
        alert('更新失败')
      }
    },
    async DeleteAllChecked() {
      try {
        // 等待删除所有勾选的商品后重新发送获取购物车数据请求
        await this.$store.dispatch('DeleteAllCheckedShopCart')
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    async updateAllShopCartChecked(event) {
      try {
        let ischecked = event.target.checked ? 1 : 0
        await this.$store.dispatch('UpdateAllCheckedShopCart', ischecked)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>