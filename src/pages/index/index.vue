<!-- eslint-disable prettier/prettier -->
<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue';
import HotPanel from './components/HotPanel.vue';
import { getBannerApi, getCategoryApi, getHostApi } from '@/services/home';
import { ref } from 'vue';
import type { swiperItem } from '@/types/global';
import type { categoryItem, hotItem } from '@/types/home';
import XtxGuess from '@/components/XtxGuess.vue';
import type { XtxGuessInstance } from '@/types/components';
import IndexSkeleton from './components/IndexSkeleton.vue';
import { useGuess } from '@/composables';

//调用主页展示数据
//1.定义方法和变量
const swiperList = ref<Array<swiperItem>>([])
const getBannerData = async() =>{
  const res = await getBannerApi(1)
  swiperList.value= res.result
}
const categoryList = ref<Array<categoryItem>>([])
const getCategoryData = async () => {
  const res = await getCategoryApi()
  categoryList.value = res.result
}
const hotList = ref<Array<hotItem>>([])
const getHotList = async () => {
  const res = await getHostApi()
  hotList.value = res.result
}

const isLoading = ref(false)
//2.在页面加载时调用获取数据
onLoad(async() => {
  isLoading.value = true
  await Promise.all([getBannerData(),getCategoryData(),getHotList()])
  isLoading.value = false
})
/**
//ref模板获取组件实例
const guessRef = ref<XtxGuessInstance>()
//定义滚动触底的回调事件
const onscrolltolower = () => {
  guessRef.value?.scrollGetMore()
}
使用猜你喜欢组合式函数
*/
const { guessRef ,onscrolltolower } = useGuess()


//下拉刷新数据
const isTriggered = ref(false)
const onrefresh = async () => {
  isTriggered.value = true
  //这样写，多个请求依次执行，效率低
  // await getBannerData()
  // await getCategoryData()
  // await getHostList()
  //加载数据之前，调用子组件的方法重置数据
  guessRef.value?.resetData()
  await Promise.all([getBannerData(),getCategoryData(),getHotList(),guessRef.value?.scrollGetMore()])
  isTriggered.value = false
}
</script>

<template>
  <!-- 自定义导航栏 -->
  <CustomNavbar />
  <!-- 导航栏固定在顶部，其余组件放置在滚动容器里面，给滚动容器添加触底事件 -->
  <scroll-view
    refresher-enabled
    @refresherrefresh="onrefresh"
    :refresher-triggered="isTriggered"
    scroll-y
    class="scroll"
    @scrolltolower="onscrolltolower"
  >
    <IndexSkeleton v-if="isLoading" />
    <template v-else>
      <!-- 自定义轮播图 -->
      <XtxSwiper :list="swiperList" />
      <!-- 分类面板 -->
      <CategoryPanel :list="categoryList" />
      <!-- 热门推荐面板 -->
      <HotPanel :list="hotList" />
      <!-- 猜你喜欢面板 是一个独立的组件，可以在组件挂载时请求数据，不用在父组件中请求数据再传递props -->
      <!-- <XtxGuess :list="guessList" /> -->
      <XtxGuess ref="guessRef" />
    </template>
  </scroll-view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
  .scroll {
    flex: 1;
  }
}
</style>
