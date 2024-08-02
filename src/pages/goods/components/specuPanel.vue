<script setup lang="ts">
const props = defineProps<{ close: Function }>()
const close = () => {
  props.close()
}
</script>

<template>
  <view class="address-panel">
    <!-- 关闭按钮 -->
    <text @tap="close" class="close icon-close"></text>
    <!-- 标题 -->
    <view class="title">请选择商品规格</view>
    <!-- 内容 -->
    <view class="footer">
      <view class="button primary"> 确定 </view>
      <view v-if="false" class="button primary">确定</view>
    </view>
  </view>
</template>
<style lang="scss">
.address-panel {
  padding: 0 30rpx;
  border-radius: 10rpx 10rpx 0 0;
  position: relative;
  background-color: #fff;
}

.title {
  line-height: 1;
  padding: 40rpx 0;
  text-align: center;
  font-size: 32rpx;
  font-weight: normal;
  border-bottom: 1rpx solid #ddd;
  color: #444;
}

.close {
  position: absolute;
  right: 24rpx;
  top: 24rpx;
}

.footer {
  display: flex;
  justify-content: space-between;
  padding: 20rpx 0 40rpx;
  font-size: 28rpx;
  color: #444;

  .button {
    flex: 1;
    height: 72rpx;
    text-align: center;
    line-height: 72rpx;
    margin: 0 20rpx;
    color: #fff;
    border-radius: 72rpx;
  }

  .primary {
    color: #fff;
    background-color: #27ba9b;
  }

  .secondary {
    background-color: #ffa868;
  }
}
</style>
