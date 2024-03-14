<script lang="ts" setup>
import type { XtxGuessInstance } from '@/types/component'
import { useGuessList } from '@/composables/index'
import { onLoad } from '@dcloudio/uni-app'
import { getSearchListAPI } from '@/services/search'
import { ref } from 'vue'
import type { searchDataType } from '@/types/search'
//搜索信息列表
const searchList = ref<searchDataType>()
//返回首页
const gotoHome = () => {
  uni.switchTab({ url: '/pages/index/index' })
}
//猜你喜欢加载
const { guessRef, onScrolltolower } = useGuessList()
//获取页面参数
const query = defineProps<{
  keyword: string
}>()
//获取搜索列表
const getSearchListData = async () => {
  if (query.keyword) {
    const res = await getSearchListAPI({ keyword: query.keyword })
    searchList.value = res.result
  }
}
//加载页面
onLoad(() => {
  if (!query.keyword) {
    uni.switchTab({ url: '/pages/index/index' })
  }
  getSearchListData()
})
</script>

<template>
  <scroll-view @scrolltolower="onScrolltolower" class="viewport" scroll-y enable-back-to-top>
    <view class="searchList">
      <view class="message" v-if="searchList">
        <view class="text">列表空空如也,再去看看吧！</view>
        <button class="btn" @tap="gotoHome">返回首页</button>
      </view>
      <view v-else></view>
    </view>
    <!-- 猜你喜欢 -->
    <view class="guess">
      <XtxGuess ref="guessRef" />
    </view>
  </scroll-view>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  background-color: #f7f7f8;
}

.viewport {
  height: 100%;
  background-repeat: no-repeat;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/center_bg.png);
  background-size: 100% auto;
}

/* 猜你喜欢 */
.guess {
  background-color: #f7f7f8;
  margin-top: 20rpx;
}

.searchList {
  width: 100%;
  height: 500rpx;
  background-color: #f7f7f8;

  .message {
    display: flex;
    flex-direction: column;
    text-align: center;
    padding-top: 150rpx;

    .btn {
      background-color: #05b483;
      height: 100%;
      line-height: 64rpx;
      color: #fff;
      margin-top: 30rpx;
    }
  }
}
</style>
