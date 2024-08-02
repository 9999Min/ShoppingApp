<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { getHotRecommendApi } from '@/services/hot'
import { ref } from 'vue'
import type { subTypeItem } from '@/types/hot'

// 热门推荐页 标题和url
const hotMap = [
  { type: '1', title: '特惠推荐', url: '/hot/preference' },
  { type: '2', title: '爆款推荐', url: '/hot/inVogue' },
  { type: '3', title: '一站买全', url: '/hot/oneStop' },
  { type: '4', title: '新鲜好物', url: '/hot/new' },
]
const query = defineProps<{ type: string }>()
const currUrlMap = hotMap.find((v) => v.type === query.type)
uni.setNavigationBarTitle({ title: currUrlMap!.title }) //非空断言

//获取热门推荐的数据
/**
 * bannerPicture 顶部图片
 * subTypes选项数据
 * activeIndex选中选项下标
 */
const activeIndex = ref(0)
const bannerPicture = ref('')
const subTypes = ref<Array<subTypeItem & { finish?: boolean }>>([])
const getHotData = async () => {
  const res = await getHotRecommendApi(currUrlMap!.url)
  bannerPicture.value = res.result.bannerPicture
  subTypes.value = res.result.subTypes
}

onLoad(() => {
  getHotData()
})
const onscrolltolower = async () => {
  //获取当前选中tab的id
  const currType = subTypes.value[activeIndex.value]
  //当前页码累加
  if (currType.goodsItems.pages > currType.goodsItems.page) {
    currType.goodsItems.page++
    //调用api获取分页数据
    const { result } = await getHotRecommendApi(currUrlMap!.url, {
      subType: currType.id,
      page: currType.goodsItems.page,
      pageSize: 10,
    })
    currType.goodsItems.items = [
      ...currType.goodsItems.items,
      ...result.subTypes[activeIndex.value].goodsItems.items,
    ]
  } else {
    currType.finish = true
    uni.showToast({ title: '没有更多数据了~', icon: 'none' })
  }
}
</script>

<template>
  <view class="viewport">
    <!-- 推荐封面图 -->
    <view class="cover">
      <image :src="bannerPicture"></image>
    </view>
    <!-- 推荐选项 -->
    <view class="tabs">
      <text
        class="text"
        :class="{ active: index === activeIndex }"
        v-for="(item, index) in subTypes"
        :key="item.id"
        @tap="activeIndex = index"
        >{{ item.title }}</text
      >
    </view>
    <!-- 推荐列表 -->
    <scroll-view
      v-for="(item, index) in subTypes"
      :key="item.id"
      v-show="activeIndex === index"
      scroll-y
      class="scroll-view"
      @scrolltolower="onscrolltolower"
    >
      <view class="goods">
        <navigator
          hover-class="none"
          class="navigator"
          v-for="good in subTypes[activeIndex].goodsItems.items"
          :key="good.id"
          :url="`/pages/goods/goods?id=${good.id}`"
        >
          <image class="thumb" :src="good.picture"></image>
          <view class="name ellipsis">{{ good.name }}</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ good.price }}</text>
          </view>
        </navigator>
      </view>
      <view class="loading-text">{{ item.finish ? '没有更多数据了~' : '正在加载中...' }}</view>
    </scroll-view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  background-color: #f4f4f4;
}
.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 180rpx 0 0;
  position: relative;
}
.cover {
  width: 750rpx;
  height: 225rpx;
  border-radius: 0 0 40rpx 40rpx;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
}
.scroll-view {
  flex: 1;
}
.tabs {
  display: flex;
  justify-content: space-evenly;
  height: 100rpx;
  line-height: 90rpx;
  margin: 0 20rpx;
  font-size: 28rpx;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 5rpx rgba(200, 200, 200, 0.3);
  color: #333;
  background-color: #fff;
  position: relative;
  z-index: 9;
  .text {
    margin: 0 20rpx;
    position: relative;
  }
  .active {
    &::after {
      content: '';
      width: 40rpx;
      height: 4rpx;
      transform: translate(-50%);
      background-color: #27ba9b;
      position: absolute;
      left: 50%;
      bottom: 24rpx;
    }
  }
}
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx 20rpx;
  .navigator {
    width: 345rpx;
    padding: 20rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }
  .thumb {
    width: 305rpx;
    height: 305rpx;
  }
  .name {
    height: 88rpx;
    font-size: 26rpx;
  }
  .price {
    line-height: 1;
    color: #cf4444;
    font-size: 30rpx;
  }
  .symbol {
    font-size: 70%;
  }
  .decimal {
    font-size: 70%;
  }
}

.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0 50rpx;
}
</style>
