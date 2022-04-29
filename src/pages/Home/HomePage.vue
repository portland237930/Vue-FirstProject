<template>
  <div>
    <Type-Nav />
    <List-Container />
    <Re-Commend />
    <Goods-Rank />
    <Suggest-Like />
    <!-- 将Mock获得到的数据传给HomeFloor组件 -->
    <Home-Floor v-for="floor in floorlist" :key="floor.id" :floorlist="floor" />
    <Home-Brand />
  </div>
</template>

<script>
import ListContainer from "./ListContainer/ListContainer.vue";
import ReCommend from "./ReCommend/ReCommend";
import GoodsRank from "./GoodsRank/GoodRank";
import SuggestLike from "./SuggestLike/SuggestLike";
import HomeFloor from "./HomeFloor/HomeFloor";
import HomeBrand from "./HomeBrand/HomeBrand";
import { mapState } from "vuex";
export default {
  name: "HomePage",
  // 注册组件
  components: {
    ListContainer,
    ReCommend,
    GoodsRank,
    SuggestLike,
    HomeFloor,
    HomeBrand,
  },
  mounted() {
    // 派发action获得数据
    this.$store.dispatch("getFloorList");
  },
  computed: {
    // 使用映射获得state中的floorlist属性
    ...mapState({
      floorlist: (state) => state.home.floorlist.data,
    }),
  },
};
</script>

<style scoped lang="less"></style>
