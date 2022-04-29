<template>
<!-- 轮播图模块 -->
  <div>
	<div class="swiper-container" ref="floor1Swiper">
	<div class="swiper-wrapper">
	<div
	class="swiper-slide"
	v-for="carousle in list"
	:key="carousle.id"
	>
	<img :src="carousle.imgUrl" />
	</div>
	</div>
	<!-- 如果需要分页器 -->
	<div class="swiper-pagination"></div>

	<!-- 如果需要导航按钮 -->
	<div class="swiper-button-prev"></div>
	<div class="swiper-button-next"></div>
	</div>
  </div>
</template>

<script>
import Swiper from "swiper"
export default {
	name:"Carousle",
	props:["list"],
	// 监听数据改变时创建Swiper实例
	watch: {
    list: {
		// 无论数据是否改变都先监听一次
      immediate: true,
      handler() {
		//   下次DOM渲染且循环结束时执行
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.floor1Swiper, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination'
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            },

            // 如果需要滚动条
            scrollbar: {
              el: '.swiper-scrollbar'
            }
          })
        })
      }
    }
  }
}
</script>

<style>

</style>