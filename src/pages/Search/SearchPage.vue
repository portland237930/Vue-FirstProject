<template>
  <!-- 导航栏模块 -->
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread面包屑标签栏-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类标签 -->
            <li class="with-x" v-if="searchparams.categoryName">
              {{ searchparams.categoryName }}
              <i @click="removeCategory">×</i>
            </li>
            <!-- 关键字标签 -->
            <li class="with-x" v-if="searchparams.keyword">
              {{ searchparams.keyword }}
              <i @click="removekeyword">×</i>
            </li>
            <!-- 品牌标签 -->
            <li class="with-x" v-if="searchparams.trademark">
              {{ searchparams.trademark.split(":")[1] }}
              <i @click="removetrademark">×</i>
            </li>
            <!-- 平台操作标签 -->
            <li
              class="with-x"
              v-for="(prop, index) in searchparams.props"
              :key="index"
            >
              {{ prop.split(":")[1] }}
              <i @click="removeattrs(index)">×</i>
            </li>
          </ul>
        </div>

        <!--平台分类栏-->
        <SearchSelector @TradeMarkInfo="TradeMarkInfo" @attrInfo="attrInfo" />

        <!--商品显示栏-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a
                    >综合<span
                      v-show="isOne"
                      class="iconfont"
                      :class="{ 'icon-paixu': isDesc, 'icon-paixu1': isAsc }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a
                    >价格<span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{ 'icon-paixu': isDesc, 'icon-paixu1': isAsc }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <<router-link :to="`/detail/${goods.id}`">
                      <img v-lazy="goods.defaultImg" style="width:100%"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">
                      已有
                      <span>2000</span>人评价
                    </i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination
            :pageNo="searchparams.pageNo"
            :pageSize="searchparams.pageSize"
            :total="total"
            :continue="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      searchparams: {
        // 一级分类ID
        category1Id: "",
        // 二级分类ID
        category2Id: "",
        // 三级分类ID
        category1Id: "",
        // 分类名称
        categoryName: "",
        // 关键字
        keyword: "",
        // 排序方式
        order: "1:desc",
        // 分页器当前页数
        pageNo: 1,
        // 单页显示商品数量
        pageSize: 10,
        // 平台属性的操作
        props: [],
        // 品牌名称
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector,
  },
  beforeMount() {
    // 合并参数
    Object.assign(this.searchparams, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters(["goodsList"]),
    // 判断是否为综合排序
    isOne() {
      return this.searchparams.order.indexOf("1") != -1;
    },
    // 判断是否为价格排序
    isTwo() {
      return this.searchparams.order.indexOf("2") != -1;
    },
    // 判断是否为升序
    isAsc() {
      return this.searchparams.order.indexOf("asc") != -1;
    },
    // 判断是否为降序
    isDesc() {
      return this.searchparams.order.indexOf("desc") != -1;
    },
    ...mapState({
      // 将vuex仓库中的total属性映射到组件中
      total: (state) => state.search.searchList.total,
    }),
  },
  methods: {
    // 将获取Seach列表请求封装成函数方便重复调用
    getData() {
      // 将searchparams作为参数发送至服务器
      this.$store.dispatch("getSearchList", this.searchparams);
    },
    // 删除分类名
    removeCategory() {
      // 清除分类栏时清除所有ID和名称(undefined时空数据不会发给服务器)
      this.searchparams.category1Id = undefined;
      this.searchparams.category2Id = undefined;
      this.searchparams.category3Id = undefined;
      this.searchparams.categoryName = undefined;
      // 重新发送请求
      this.getData();
      // 判断是否含有params参数并重新跳转路由
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    // 删除关键字
    removekeyword() {
      // 清除关键字
      this.searchparams.keyword = undefined;
      // 重新发送请求
      this.getData();
      // 发送全局事件
      this.$bus.$emit("clear");
      // 判断是否有query参数并重新跳转路由
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    // 品牌信息自定义事件回调
    TradeMarkInfo(trademark) {
      // 合并参数并格式化
      this.searchparams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      // 重新发送请求
      this.getData();
    },
    // 删除品牌
    removetrademark() {
      // 清除品牌信息
      this.searchparams.trademark = undefined;
      // 重新发送请求
      this.getData();
    },
    // 平台操作自定义事件回调
    attrInfo(attrs, attrValue) {
      // 合并属性值
      let props = `${attrs.attrId}:${attrValue}:${attrs.attrName}`;
      // 数组去重
      if (this.searchparams.props.indexOf(props) == -1) {
        // 将属性值添加至列表中
        this.searchparams.props.push(props);
      }
      // 重新发送请求
      this.getData();
    },
    // 刪除平台操作标签
    removeattrs(index) {
      // 删除标签对应的参数
      this.searchparams.props.splice(index, 1);
      // 重新发送请求
      this.getData();
    },
    // 改变排序方式
    changeOrder(flag) {
      // 获得原始Order数据并进行分割
      let OriginOrder = this.searchparams.order;
      let OriginFlag = OriginOrder.split(":")[0];
      let OriginSort = OriginOrder.split(":")[1];
      // 创建新Order字符串
      let newOrder = "";
      // 判断点击额是否为当前选中的排序方式
      if (flag == OriginFlag) {
        // 将升降序排序方式取反
        newOrder = `${flag}:${OriginSort == "desc" ? "asc" : "desc"}`;
      } else {
        // 切换至点击的排序方式并设置为降序
        newOrder = `${flag}:${"desc"}`;
      }
      // 将order值进行替换
      this.searchparams.order = newOrder;
      // 重新发起请求
      this.getData();
    },
    // 操作分页器
    getPageNo(pageNo) {
      // 整理参数
      this.searchparams.pageNo = pageNo;
      // 重新发送请求
      this.getData();
    },
  },
  watch: {
    // 监视路由变化
    $route(newValue, oldValue) {
      // 每次路由改变重新清空三级列表的ID
      this.searchparams.category1Id = "";
      this.searchparams.category2Id = "";
      this.searchparams.category3Id = "";
      // 每次路由改变后重新整理合并参数并发送请求
      Object.assign(this.searchparams, this.$route.query, this.$route.params);
      this.getData();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
