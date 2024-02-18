<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import CustomNavbar from './components/CustomNavbar.vue'
import { getHomeBannerAPI, getHomeCategoryAPI, getHotCategoryAPI } from '@/services/home'
import { ref } from 'vue'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import type { XtxGuessInstance } from '@/types/component'
import PageSkelecton from './components/PageSkelecton.vue'
//获取首页轮播图
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  // console.log(res)
  bannerList.value = res.result
}
//获取前台分类页
const categoryList = ref<CategoryItem[]>([])
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  // console.log(res)
  categoryList.value = res.result
}
//获取热门数据
const hotList = ref<HotItem[]>([])
const getHotCategoryData = async () => {
  const res = await getHotCategoryAPI()
  console.log(res)
  hotList.value = res.result
}
//是否加载
const isLoading = ref(false)

onLoad(async () => {
  isLoading.value = true
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHotCategoryData()])
  isLoading.value = false
})
//获取猜你喜欢组件实例
const guessRef = ref<XtxGuessInstance>()
//滚动触底
const onScrolltolower = () => {
  // console.log('触底')
  guessRef.value?.getMore()
}
// 自定义下拉刷新被触发
const isTriggered = ref(false)
const onRefresherrefresh = async () => {
  isTriggered.value = true
  // console.log('刷新触发')
  //顺次执行
  // await getHomeBannerData()
  // await getHomeCategoryData()
  // await getHotCategoryData()
  guessRef.value?.resetData()
  await Promise.all([
    getHomeBannerData(),
    getHomeCategoryData(),
    getHotCategoryData(),
    guessRef.value?.getMore(),
  ])
  isTriggered.value = false
}
</script>

<template>
  <!-- 自定义导航栏 -->
  <CustomNavbar />
  <scroll-view
    refresher-enabled
    @refresherrefresh="onRefresherrefresh"
    :refresher-triggered="isTriggered"
    @scrolltolower="onScrolltolower"
    class="scroll-view"
    scroll-y
  >
    <PageSkelecton v-if="isLoading" />
    <template v-else>
      <!-- 自动引入轮播图 -->
      <XtxSwiper :list="bannerList" />
      <!-- 首页分类 -->
      <CategoryPanel :list="categoryList" />
      <!-- 热门推荐 -->
      <HotPanel :list="hotList" />
      <!-- 猜你喜欢 -->
      <XtxGuess ref="guessRef" />
    </template>
  </scroll-view>
  <!-- <view class="index">index1</view> -->
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;

  .scroll-view {
    flex: 1;
  }
}
</style>
