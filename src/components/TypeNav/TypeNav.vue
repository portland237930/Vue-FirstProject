<template>
<!--三级联动导航  -->
	<div class="type-nav">
	<div class="container">
		<!-- 通过事件委托使导航离开h2标签时才失去背景颜色 -->
		<div @mouseleave="leaveShow" @mouseenter="enterShow">
			<h2 class="all">全部商品分类</h2>
		<transition name="sort">
		<div class="sort"  v-show="ShowNav">
			<!-- 通过事件委派给所有子元素添加点击事件 -->
			<div class="all-sort-list2" @click="goSearch" >
				<div class="item" v-for="(c1,index) in CategoryList" :key="c1.categoryId" :class="{cur:currentIndex==index}">
					<h3 @mouseenter="enterIndex(index)">
						<!-- 通过绑定自定义属性区分导航级数和是否为a标签 -->
						<a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
					</h3>
					<!-- 通过js实现二三级分类导航 -->
					<div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
						<div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
							<dl class="fore">
								<dt>
									<a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
								</dt>
								<dd>
									<em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
										<a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
									</em>
								</dd>
							</dl>
						</div>
					</div>
				</div>
			</div>
		</div>
		</transition>
		</div>
		<nav class="nav">
			<a href="###">服装城</a>
			<a href="###">美妆馆</a>
			<a href="###">尚品汇超市</a>
			<a href="###">全球购</a>
			<a href="###">闪购</a>
			<a href="###">团购</a>
			<a href="###">有趣</a>
			<a href="###">秒杀</a>
		</nav>

	</div>
</div>
</template>

<script>
import {mapState} from "vuex"
import {throttle} from "lodash"
export default {
	name:"TypeNav",
	data() {
		return {
			// 初始值为-1保证所有一级导航不亮
			currentIndex:-1,
			ShowNav:true
		}
	},
	mounted(){
		if(this.$route.path!='/home'){
			this.ShowNav=false
		}
	},
	computed:{
		...mapState({
			// 读取home模块中的State里的CategoryList数据
			CategoryList:(state)=>{
				// console.log(state.home.categoryList)
				return state.home.categoryList.data
			}
		})
	},
	methods:{
		// 使用throttle进行节流
		enterIndex:throttle(function(index){
			// 进入时更改当前索引
			// console.log("进入",index)
			this.currentIndex=index
		},50),
		enterShow(){
			this.ShowNav=true
		},
		leaveShow(){
			// 离开时当前下标值恢复默认值
			this.currentIndex=-1
			if(this.$route.path!='/home'){
				this.ShowNav=false
		}
		},
		goSearch(event){
			// 获取当前元素
			let element=event.target
			// 解构赋值获取自定义属性
			let {categoryname,category1id,category2id,category3id}=element.dataset
			// 如果点击的是a标签
			if(categoryname){
				// 整理跳转路由的参数
				let location={name:"search"}
				// 获取categoryName参数
				let query={categoryName:categoryname}
				// 判断导航级数并将categoryId参数添加至query中
				if(category1id){
					query.category1Id=category1id
				}
				else if(category2id){
					query.category2Id=category2id
				}
				else{
					query.category3Id=category3id
				}
				// 判断是否带有params参数
				if(this.$route.params){
				// 合并参数
				location.query=query
				location.params=this.$route.params
				// 路由跳转
				this.$router.push(location)
				}

			}
	}
	}
}
</script>

<style scoped lang="less">
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 27px;
                            font-size: 14px;
							font-weight: 400;
							overflow: hidden;
                            padding: 0 20px;
                            margin: 0;
                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }
						// 通过css样式实现显示和隐藏二三级导航
                        // &:hover {
                        //     .item-list {
                        //         display: block;
                        //     }
                        // }
					}
					.cur{
						background-color: skyblue;
					}
                }
			}
			// 过渡动画开始
			.sort-enter{
				height: 0px;
			}
			// 过度动画结束
			.sort-enter-to{
				height: 461px;
			}
			// 定义动画时间和速率
			.sort-enter-active{
				transition: all 0.2s linear;
			}
		}
		
    }
</style>